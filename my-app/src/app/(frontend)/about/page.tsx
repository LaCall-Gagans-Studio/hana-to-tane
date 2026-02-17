import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Intro } from './sections/intro'
import { Concept } from './sections/concept'
import { FreeSchoolSummary } from './sections/freeschool_summary'
import { PlayPark } from './sections/playpark'
import { Events } from './sections/events'
import { Overview } from './sections/overview'
import { AboutStaff } from '../sections/staff'

export const revalidate = 60

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const aboutData = await payload.findGlobal({
    slug: 'about',
  })

  // Fetch Freeschool global data for the summary section
  const freeschoolData = await payload.findGlobal({
    slug: 'freeschool',
  })

  const members = await payload.find({
    collection: 'members',
    limit: 100,
    sort: 'createdAt',
  })

  return (
    <>
      <Intro message={aboutData.intro_message} representatives={members.docs} />
      <Concept data={aboutData.concept} />
      {/* Pass the summary data from Freeschool global */}
      <FreeSchoolSummary data={freeschoolData.summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <PlayPark />
        <Events />
      </div>
      <AboutStaff members={members.docs} />
      <Overview data={aboutData.overview} />
    </>
  )
}
