import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Intro } from './sections/intro'
import { Concept } from './sections/concept'
import { FreeSchoolSummary } from './sections/freeschool_summary'
import { PlayPark } from './sections/playpark'
import { Events } from './sections/events'
import { Overview } from './sections/overview'

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const aboutData = await payload.findGlobal({
    slug: 'about',
  })

  return (
    <>
      <Intro message={aboutData.intro_message} />
      <Concept />
      <FreeSchoolSummary description={aboutData.free_school_desc} />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <PlayPark description={aboutData.play_park_desc} />
        <Events />
      </div>
      <Overview data={aboutData.overview} />
    </>
  )
}
