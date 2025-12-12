'use client'

import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { HeroFlower } from './hero-flower'

export const Hero = () => {
  return (
    <section className="bg-surface py-12 md:py-32 text-center border-b-4 border-border mb-16 md:mb-32 relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f1f100_4px,transparent_4px)] bg-size-[30px_30px] -z-10"></div>

      {/* Masonry Background Images (Left Side) */}
      <div className="absolute z-10 bg-transparent top-0 left-0 w-1/2 h-full overflow-hidden pointer-events-none opacity-30 hidden xl:block">
        <div className="grid grid-cols-2 gap-4 p-8 transform -rotate-6 scale-110 origin-top-left">
          <div className="space-y-4">
            <NextImage
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Activity 1"
              width={400}
              height={300}
              className="w-full rounded-2xl border-4 border-white shadow-lg rotate-2"
            />
            <NextImage
              src="https://images.unsplash.com/photo-1621460248083-6271cc4437a8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Activity 2"
              width={300}
              height={400}
              className="w-full rounded-2xl border-4 border-white shadow-lg -rotate-1"
            />
          </div>
          <div className="space-y-4 pt-12">
            <NextImage
              src="https://media.istockphoto.com/id/1666758667/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E8%B5%B0%E3%82%8B%E5%AD%90%E3%81%A9%E3%82%82%E3%81%A8%E8%A6%8B%E3%81%A6%E3%81%84%E3%82%8B%E5%A5%B3%E6%80%A7.webp?a=1&b=1&s=612x612&w=0&k=20&c=Hli97nWJ9z74fTkISBVzFROKaD2euR4bIL-onlKn45U="
              alt="Activity 3"
              width={400}
              height={400}
              className="w-full rounded-2xl border-4 border-white shadow-lg -rotate-2"
            />
            <NextImage
              src="https://media.istockphoto.com/id/890192694/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E7%B4%99%E9%A2%A8%E8%88%B9%E3%81%A7%E9%81%8A%E3%81%B6%E5%A5%B3%E3%81%AE%E5%AD%90.webp?a=1&b=1&s=612x612&w=0&k=20&c=szDSakZ154FarHSv4CO43kIfIVBBXHg-64yxNLdB2UE="
              alt="Activity 4"
              width={300}
              height={300}
              className="w-full rounded-2xl border-4 border-white shadow-lg rotate-1"
            />
            <NextImage
              src="https://media.istockphoto.com/id/1559538808/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E5%85%AC%E5%9C%92%E3%81%A7%E6%A5%BD%E3%81%97%E3%82%80%E3%82%A2%E3%82%B8%E3%82%A2%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A1%E3%81%AE%E9%9B%86%E5%90%88%E7%94%BB%E5%83%8F.jpg?s=612x612&w=0&k=20&c=Aa8DXXFJxZkAnBdg4yGeurSEh60uH3QNSwLidkpTONU="
              alt="Activity 5"
              width={300}
              height={300}
              className="w-full rounded-2xl border-4 border-white shadow-lg rotate-1"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-[5%] right-[5%] w-32 h-32 bg-pink rounded-full border-3 border-border shadow-hard animate-bounce-slow z-0 opacity-60"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          {/* Left Side: Hero Content */}
          <div className="flex-1 text-center xl:text-left relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] font-black text-text mb-8 leading-[0.9] tracking-wide drop-shadow-xl"
            >
              <span className="block hover:scale-105 transition-transform duration-500 cursor-default">
                <h1 className="text-2xl ml-2 text-surface mb-1">
                  NPO法人
                  <br />
                </h1>
                <span className="text-surface text-stroke-2 text-stroke-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  はなとたね
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-10 text-left"
            >
              <p className="text-lg md:text-2xl font-bold text-text leading-relaxed">
                <span className="bg-gradient-to-r from-transparent to-transparent bg-[length:0%_100%] bg-no-repeat animate-[highlight_1s_ease-out_0.5s_forwards] bg-surface px-1">
                  種が花になり、成長していくような、
                </span>
                <br />
                <span className="bg-gradient-to-r from-transparent to-transparent bg-[length:0%_100%] bg-no-repeat animate-[highlight_1s_ease-out_1.2s_forwards] bg-surface px-1 mt-2 inline-block">
                  みんなでそういう場所にしよう。
                </span>
              </p>
            </motion.div>

            {/* Main Large Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center xl:justify-start mt-4 mb-4"
            >
              <Link
                href="#about"
                className="group relative inline-block px-8 py-4 bg-[#cfed75] text-text border-3 border-border rounded-2xl font-black text-lg md:text-xl shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-0 active:shadow-hard"
              >
                <span className="relative z-10">はなとたねについて</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                href="#calendar"
                className="group relative inline-block px-8 py-4 bg-yellow text-text border-3 border-border rounded-2xl font-black text-lg md:text-xl shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-0 active:shadow-hard"
              >
                <span className="relative z-10">イベントを見る</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>

            {/* Small Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-wrap gap-3 justify-center xl:justify-start text-sm md:text-base font-bold text-text"
            >
              <Link
                href="/freeschool"
                className="px-4 py-2 bg-white border-2 border-border rounded-2xl hover:bg-blue hover:text-white transition-colors shadow-sm"
              >
                認定フリースクールいっぽ
              </Link>
              <Link
                href="/column"
                className="px-4 py-2 bg-white border-2 border-border rounded-2xl hover:bg-pink hover:text-white transition-colors shadow-sm"
              >
                はなたね図書館
              </Link>
              <Link
                href="#support"
                className="px-4 py-2 bg-white border-2 border-border rounded-2xl hover:bg-orange-400 hover:text-white transition-colors shadow-sm"
              >
                サポート
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Hero Flower Game */}
          <div className="flex-1 w-full max-w-2xl xl:max-w-none">
            <HeroFlower />
          </div>
        </div>
      </div>
    </section>
  )
}
