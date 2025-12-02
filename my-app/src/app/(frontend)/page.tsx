import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from './sections/hero'
import { News } from './sections/news'
import { Calendar } from './sections/calendar'
import { About } from './sections/about'
import { Support } from './sections/support'
import { Column } from './sections/column'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const aboutData = await payload.findGlobal({
    slug: 'about',
  })

  const members = await payload.find({
    collection: 'members',
    sort: 'createdAt',
    limit: 100,
  })

  const sponsors = await payload.find({
    collection: 'sponsors',
    sort: 'createdAt',
    limit: 100,
  })

  return (
    <>
      <Hero />
      <News />
      <Calendar />
      <About aboutData={aboutData} members={members.docs} sponsors={sponsors.docs} />
      <Support />
      <Column />
    </>
  )
}
