import { createPool } from '@vercel/postgres'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const logFile = 'db-check-result.txt'
const log = (msg) => {
  console.log(msg)
  fs.appendFileSync(logFile, msg + '\n')
}

fs.writeFileSync(logFile, 'Starting DB Check with FIX attempt...\n')

async function testConnection() {
  const connectionString = process.env.POSTGRES_URL
  if (!connectionString) {
    log('ERROR: POSTGRES_URL is undefined.')
    return
  }

  // Try removing channel_binding
  const fixedConnectionString = connectionString.replace(/&channel_binding=require/, '')
  log(`Original URL Scheme: ${connectionString.split('://')[0]}`)

  // Log if we changed anything
  if (connectionString !== fixedConnectionString) {
    log('NOTE: Removed &channel_binding=require from URL.')
  } else {
    log('NOTE: URL did not contain &channel_binding=require.')
  }

  log(`Host (masked): ${fixedConnectionString.replace(/:[^:@]*@/, ':****@')}`)

  try {
    const pool = createPool({
      connectionString: fixedConnectionString,
    })

    const client = await pool.connect()
    log('Successfully connected to the database!')

    // Test 1: Simple Select
    const res = await client.query('SELECT NOW()')
    log(`Current Database Time: ${JSON.stringify(res.rows[0])}`)

    // Test 2: The failing introspection query
    log('Attempting Schema Introspection Query...')
    const introspectionQuery = `
      SELECT 
          n.nspname AS table_schema,
          c.relname AS table_name,
          CASE
              WHEN c.relkind = 'r' THEN 'table'
              WHEN c.relkind = 'v' THEN 'view'
              WHEN c.relkind = 'm' THEN 'materialized_view'
          END AS type,
          c.relrowsecurity AS rls_enabled
      FROM
          pg_catalog.pg_class c
      JOIN
          pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE
          c.relkind IN ('r', 'v', 'm')
          AND n.nspname = 'public';
    `

    const introRes = await client.query(introspectionQuery)
    log(`Introspection Success. Found ${introRes.rows.length} items.`)

    client.release()
    await pool.end()
  } catch (err) {
    log('Connection or Query failed!')
    log(`Error name: ${err.name}`)
    log(`Error message: ${err.message}`)
    if ('code' in err) log(`Error code: ${err.code}`)
    if ('cause' in err) log(`Error cause: ${JSON.stringify(err.cause)}`)
  }
}

testConnection()
