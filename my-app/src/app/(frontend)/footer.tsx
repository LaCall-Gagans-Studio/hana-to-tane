import React from 'react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="relative mt-32 bg-blue text-surface pt-32 pb-16 overflow-hidden">
      {/* Wavy Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[60px] bg-surface"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-blue"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          {/* Logo & Address */}
          <div className="flex-1">
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              <span className="text-yellow drop-shadow-[4px_4px_0px_var(--color-purple)]">
                NPO HANA TO TANE
              </span>
            </h3>
            <p className="text-lg font-bold opacity-80 leading-relaxed">
              〒680-0000
              <br />
              鳥取県鳥取市中砂見936
              <br />
              トリノス神戸2F
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {['ABOUT', 'NEWS', 'FREE SCHOOL', 'PLAY PARK', 'SUPPORT', 'COLUMN'].map((item) => (
                <Link
                  key={item}
                  href={
                    item === 'FREE SCHOOL'
                      ? '/freeschool'
                      : item === 'PLAY PARK'
                        ? '/playpark'
                        : item === 'COLUMN'
                          ? '/column'
                          : `/#${item.toLowerCase().replace(' ', '')}`
                  }
                  className="text-lg font-black hover:text-lime transition-colors inline-block"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-surface rounded-2xl border-3 border-transparent hover:border-lime flex items-center justify-center hover:-translate-y-1 transition-all cursor-pointer group shadow-hard hover:shadow-hard-lg"
                >
                  <div className="w-8 h-8 bg-text rounded-full opacity-20 group-hover:bg-lime group-hover:opacity-100 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-sm font-bold tracking-widest">
          <p>&copy; {new Date().getFullYear()} Hana to Tane. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
