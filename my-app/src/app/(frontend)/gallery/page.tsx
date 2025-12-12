import React, { Suspense } from 'react'
import Link from 'next/link'
import { fetchGalleryItems } from './actions'
import { GalleryGrid } from './GalleryGrid'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const { docs, hasNextPage, nextPage } = await fetchGalleryItems(1)

  return (
    <div className="bg-surface min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b3e41d_2px,transparent_2px)] bg-size-[24px_24px] pointer-events-none"></div>

      <div className="bg-blue border-border relative pt-32 pb-24 overflow-hidden">
        {/* Decorative Elements - Refined */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink/20 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="inline-block text-6xl md:text-8xl font-black text-text mb-6 relative tracking-tighter">
            はなたねギャラリー
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow/50 -z-10 rounded-full"></span>
          </h1>
          <p className="text-xl font-bold text-surface drop-shadow-md max-w-2xl mx-auto">
            子供たちの笑顔や、四季折々の活動風景を集めました。
          </p>
        </div>

        {/* Wavy Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 translate-y-1">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[40px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-surface"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <GalleryGrid
          initialDocs={docs}
          initialHasNextPage={hasNextPage}
          initialNextPage={nextPage}
        />
      </div>
    </div>
  )
}
