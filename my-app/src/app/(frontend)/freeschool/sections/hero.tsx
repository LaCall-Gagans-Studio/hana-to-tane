import React from 'react'

export const Hero = () => {
  return (
    <section className="relative py-32 bg-blue overflow-hidden">
      {/* Background Pattern - Graph Paper */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink/20 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-block bg-lime px-6 py-2 rounded-full border-3 border-border shadow-hard mb-8 transform -rotate-2">
          <span className="font-black text-text text-sm md:text-base">
            鳥取県・市教育委員会認定
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-text mb-8 tracking-tight leading-tight">
          森の子がっこう
          <br />
          <span className="text-white drop-shadow-[4px_4px_0px_var(--color-border)] text-6xl md:text-8xl inline-block transform rotate-1 mt-2">
            いっぽ
          </span>
        </h1>

        <div className="inline-block bg-white px-8 py-4 rounded-2xl border-3 border-border shadow-hard transform rotate-1 max-w-2xl">
          <p className="text-lg md:text-2xl font-bold text-gray-700">
            学校以外の<span className="text-blue">「居場所」</span>
            <span className="text-pink">「相談の場」</span>
            <span className="text-lime">「学びの場」</span>
          </p>
        </div>
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
    </section>
  )
}
