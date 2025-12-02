import React from 'react'
import { Hero } from './sections/hero'
import { About } from './sections/about'
import { Features } from './sections/features'
import { Schedule } from './sections/schedule'
import { Price } from './sections/price'
import { Flow } from './sections/flow'
import { Staff } from './sections/staff'
import { Message } from './sections/message'

export default function FreeSchoolPage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Schedule />
      <Price />
      <Flow />
      <Staff />
      <Message />
    </>
  )
}
