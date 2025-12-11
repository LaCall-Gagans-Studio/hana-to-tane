import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from './sections/hero'
import { Features } from './sections/features'
import { Flow } from './sections/flow'
import { Price } from './sections/price'
import { About } from './sections/about'
import { FreeSchoolStaff } from './sections/staff'
import { Message } from './sections/message'
import { Schedule } from './sections/schedule'
import { Merit } from './sections/merit'
import { Support } from './sections/support'

export default async function FreeSchoolPage() {
  const payload = await getPayload({ config: configPromise })

  const freeschoolData = await payload.findGlobal({
    slug: 'freeschool',
  })

  // Fetch all members, sorted by creation or a specific order if available
  // We'll filter for visual consistency in the component if needed,
  // but usually we want all staff members.
  const membersData = await payload.find({
    collection: 'members',
    limit: 100,
    sort: 'createdAt',
  })

  return (
    <main>
      <Hero data={freeschoolData.hero} schoolName={freeschoolData.summary?.schoolName} />
      <About data={freeschoolData.about} />
      <Merit data={freeschoolData.merits} />
      <Support data={freeschoolData.support} />
      <Features data={freeschoolData.features} />
      <Schedule data={freeschoolData.schedule} />
      <Price data={freeschoolData.price} />
      <Flow data={freeschoolData.flow} />
      {/* Pass members docs to the Staff component */}
      <FreeSchoolStaff members={membersData.docs} />
      <Message data={freeschoolData.message} />
    </main>
  )
}
