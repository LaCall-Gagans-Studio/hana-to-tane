import React from 'react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b-3 border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="group relative">
          <div className="text-3xl font-black tracking-tighter transform group-hover:scale-105 transition-transform duration-300">
            <span className="text-text drop-shadow-[2px_2px_0px_var(--color-yellow)]">はな</span>
            <span className="text-green inline-block transform -rotate-12 mx-0.5">と</span>
            <span className="text-text drop-shadow-[2px_2px_0px_var(--color-yellow)]">たね</span>
          </div>
        </Link>
        <nav>
          <ul className="flex gap-2 md:gap-6 items-center list-none m-0 p-0">
            {[
              { label: 'はなとたねとは？', href: '/about' },
              { label: 'ニュース', href: '/#news' },
              { label: 'イベントカレンダー', href: '/#calendar' },
              { label: 'フリースクールいっぽ', href: '/freeschool' },
            ].map((item) => (
              <li key={item.label} className="hidden md:block">
                <Link
                  href={item.href}
                  className="font-bold uppercase text-sm tracking-wide border-b-4 border-transparent hover:border-lime hover:-translate-y-1 transition-all duration-300 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#support"
                className="inline-block px-6 py-2 bg-yellow text-text font-black text-sm rounded-full border-2 border-border shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all rotate-2 hover:rotate-0"
              >
                JOIN US!
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
