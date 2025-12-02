import React from 'react'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="bg-pink py-32 text-center border-b-4 border-border mb-32 relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_4px,transparent_4px)] bg-size-[30px_30px]"></div>

      {/* Decorative Elements - More organic and playful */}
      <div className="absolute top-[5%] left-[5%] w-32 h-32 bg-lime rounded-full border-3 border-border shadow-hard animate-bounce-slow z-0"></div>
      <div className="absolute bottom-[15%] right-[8%] w-40 h-40 bg-blue rotate-12 border-3 border-border shadow-hard rounded-3xl z-0"></div>
      <div className="absolute top-[20%] right-[15%] w-16 h-16 bg-yellow rounded-full border-3 border-border shadow-hard z-0"></div>

      <div className="container relative z-10">
        <h1 className="text-[5rem] md:text-[8rem] font-black text-text mb-8 leading-[0.9] tracking-tighter drop-shadow-xl">
          <span className="block hover:scale-105 transition-transform duration-500 cursor-default">
            <span className="text-surface text-stroke-2 text-stroke-black">BE YOURSELF</span>
          </span>
          <span className="block text-surface drop-shadow-[6px_6px_0px_var(--color-text)] hover:scale-105 transition-transform duration-500 cursor-default">
            ANYWHERE
          </span>
        </h1>

        <div className="inline-block relative group mb-12">
          <div className="absolute inset-0 bg-text translate-x-2 translate-y-2 rounded-xl"></div>
          <p className="relative text-xl md:text-3xl font-bold bg-surface px-8 py-4 border-3 border-border rounded-xl group-hover:-translate-y-1 transition-transform">
            子どもも大人も、自分らしく居られる場所。
            <br />
            ここからはじまる一歩。
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
          <Link
            href="#about"
            className="inline-block px-12 py-5 bg-green text-surface border-3 border-border rounded-full font-black text-2xl uppercase tracking-widest shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none"
          >
            ABOUT US
          </Link>
          <Link
            href="#support"
            className="inline-block px-12 py-5 bg-yellow text-text border-3 border-border rounded-full font-black text-2xl uppercase tracking-widest shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none"
          >
            SUPPORT
          </Link>
        </div>
      </div>
    </section>
  )
}
