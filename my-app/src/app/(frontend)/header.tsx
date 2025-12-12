'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Info, Newspaper, Calendar, GraduationCap, BookOpen, Images } from 'lucide-react'

// Navigation Items
const NAV_ITEMS = [
  { label: 'はなとたねとは？', href: '/about', icon: Info, color: 'text-pink' },
  { label: 'イベント', href: '/event', icon: Calendar, color: 'text-yellow' },
  {
    label: '認定フリースクールいっぽ',
    href: '/freeschool',
    icon: GraduationCap,
    color: 'text-green',
  },
  { label: '図書館', href: '/column', icon: BookOpen, color: 'text-purple' },
  { label: 'ギャラリー', href: '/gallery', icon: Images, color: 'text-blue' },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header
      // 修正: isMenuOpen時は強制的に背景透明にして、下の黄色いオーバーレイを見せる
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-transparent py-4' // メニューオープン時は常に透明＆パディング維持
          : scrolled
            ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm'
            : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative w-[50px] h-[50px] bg-white rounded-full border-2 border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
            <Image
              src="/logo.png"
              alt="はなとたね Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span
            // 修正: メニューオープン時は常に表示（スクロール状態に関係なく）
            className={`text-xl font-black text-text tracking-tight ${
              isMenuOpen || scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'
            } transition-opacity`}
          >
            はなとたね
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-black text-gray-700 hover:text-text hover:bg-white/50 px-4 py-2 rounded-full transition-all flex items-center gap-2"
              >
                <Icon size={20} className={item.color} />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact#form"
            className="ml-4 px-6 py-2 bg-blue text-white text-lg font-black rounded-full border-2 border-transparent hover:border-black hover:bg-yellow hover:text-text transition-all shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 p-2 text-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-yellow z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          // top-0から全画面を覆うように指定（既に inset-0 なのでOKだが、念のため確認）
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
              backgroundSize: '24px 24px',
            }}
          ></div>

          <nav className="relative z-50 flex flex-col gap-8 w-full max-w-sm px-8 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 text-2xl font-black text-text hover:scale-105 transition-transform group`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`p-2 bg-white rounded-full border-2 border-black shadow-sm group-hover:bg-opacity-80`}
                  >
                    <Icon size={24} className={item.color} />
                  </div>
                  <span className="border-b-4 border-transparent group-hover:border-black transition-colors">
                    {item.label}
                  </span>
                </Link>
              )
            })}

            <Link
              href="/contact#form"
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 w-full bg-blue text-white text-xl font-black text-center py-4 rounded-full border-3 border-black shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
