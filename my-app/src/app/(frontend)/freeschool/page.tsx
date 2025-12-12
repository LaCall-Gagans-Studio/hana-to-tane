import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from './sections/hero'
import { Features } from './sections/features'
import { Flow } from './sections/flow'
import { Price } from './sections/price'
import { About } from './sections/about'
import { AboutStaff } from '../sections/staff'
import { Message } from './sections/message'
import { Schedule } from './sections/schedule'
import { Merit } from './sections/merit'
import { Support } from './sections/support'

import { Reports } from './sections/reports'
import { ConsultationForm } from './sections/consultation-form'

export default async function FreeSchoolPage() {
  const payload = await getPayload({ config: configPromise })

  const freeschoolData = await payload.findGlobal({
    slug: 'freeschool',
  })

  const membersData = await payload.find({
    collection: 'members',
    limit: 100,
    sort: 'createdAt',
  })

  // Fetch Activity Reports
  const reportsData = await payload.find({
    collection: 'column',
    where: {
      category: {
        equals: 'free_school',
      },
    },
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <main className="bg-stone-50">
      <Hero data={freeschoolData.hero} schoolName={freeschoolData.summary?.schoolName} />
      <About data={freeschoolData.about} />
      <Merit data={freeschoolData.merits} />
      <Support data={freeschoolData.support} />
      <Features data={freeschoolData.features} />
      <Schedule data={freeschoolData.schedule} />
      <Price data={freeschoolData.price} />
      <Flow data={freeschoolData.flow} />
      <AboutStaff members={membersData.docs} />
      <Message data={freeschoolData.message} />

      {/* Reports Section with Wave Separator */}
      <div className="w-full leading-none rotate-180 text-green/10 bg-white">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <Reports posts={reportsData.docs} />

      {/* Consultation Form Section with Wave Separator */}
      <div className="w-full leading-none text-green/10 bg-yellow/10">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <ConsultationForm />
    </main>
  )
}
