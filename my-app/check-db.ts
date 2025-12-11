import { createPool } from '@vercel/postgres'
// Load environment variables locally if not using Vercel runtime
// We need to manually load .env if we are running this with node locally
import dotenv from 'dotenv'
dotenv.config()

async function testConnection() {
  console.log('Testing connection to:', process.env.POSTGRES_URL?.replace(/:[^:@]*@/, ':****@')) // Hide password

  try {
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL,
    })

    const client = await pool.connect()
    console.log('Successfully connected to the database!')

    const res = await client.query('SELECT NOW()')
    console.log('Current Database Time:', res.rows[0])

    client.release()
    await pool.end()
  } catch (err) {
    console.error('Connection failed!')
    console.error('Error name:', err.name)
    console.error('Error message:', err.message)
    if ('code' in err) console.error('Error code:', err.code)
    if ('cause' in err) console.error('Error cause:', err.cause)
    console.error(
      'Full connection string (masked):',
      process.env.POSTGRES_URL?.replace(/:[^:@]*@/, ':****@'),
    )
  }
}

testConnection()
