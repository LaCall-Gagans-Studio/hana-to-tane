'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, MessageCircle, School, X } from 'lucide-react'

export const FixedContactMenu = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Mobile FAB click handler
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      {/* --- DESKTOP VIEW (Visible on md+) --- */}
      <div className="hidden md:block fixed top-32 right-0 z-50">
        <motion.div
          className="flex items-start justify-end"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Expanded Content (Left side, reveals on hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white border-3 border-r-0 border-pink rounded-l-xl p-6 shadow-hard-lg mr-[-5px] flex flex-col gap-4 w-[320px]"
              >
                {/* Free School Button */}
                <Link
                  href="/freeschool#consultation"
                  className="flex items-center gap-3 p-4 bg-green text-white rounded-lg font-black hover:bg-green/90 transition-transform active:scale-95 shadow-sm"
                >
                  <School size={24} />
                  <span>無料で相談する（フリースクール）</span>
                </Link>

                {/* General Inquiry Button */}
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-4 bg-blue text-white rounded-lg font-black hover:bg-blue/90 transition-transform active:scale-95 shadow-sm"
                >
                  <Mail size={24} />
                  <span>お問い合わせ（一般）</span>
                </Link>

                {/* Phone Info */}
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 text-center">
                  <p className="text-sm font-bold text-gray-500 mb-1">
                    お気軽にお問い合わせください。
                  </p>
                  <a
                    href="tel:080-8733-9637"
                    className="block text-2xl font-black text-slate-800 hover:text-pink transition-colors"
                  >
                    080-8733-9637
                  </a>
                  <p className="text-xs font-bold text-gray-400 mt-1">
                    受付時間 9:00-18:00 [ 土・日・祝日除く ]
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Tag (Always visible) */}
          <motion.div
            className={`cursor-pointer bg-pink border-3 border-r-0 border-border rounded-l-xl p-3 flex flex-col items-center gap-1 shadow-hard relative z-10`}
            style={{ animationDuration: '3s' }}
          >
            <MessageCircle size={32} className="text-white" />
            <span className="text-lg font-black text-white px-1 [writing-mode:vertical-rl] tracking-widest h-auto">
              ご相談
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* --- MOBILE VIEW (Visible on sm/xs) --- */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-20 right-0 w-[280px] bg-white border-3 border-pink rounded-xl p-4 shadow-hard-lg flex flex-col gap-3"
            >
              <div className="text-right">
                <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <Link
                href="/freeschool#consultation"
                onClick={toggleMobileMenu}
                className="flex items-center gap-3 p-3 bg-green text-white rounded-lg font-bold text-sm shadow-sm"
              >
                <School size={20} />
                <span>無料で相談する（フリースクール）</span>
              </Link>

              <Link
                href="/contact"
                onClick={toggleMobileMenu}
                className="flex items-center gap-3 p-3 bg-blue text-white rounded-lg font-bold text-sm shadow-sm"
              >
                <Mail size={20} />
                <span>お問い合わせ（一般）</span>
              </Link>

              <div className="bg-gray-50 p-3 rounded-lg border-2 border-dashed border-gray-200 text-center">
                <a href="tel:080-8733-9637" className="block text-xl font-black text-slate-800">
                  080-8733-9637
                </a>
                <p className="text-[10px] font-bold text-gray-400">受付 9:00-18:00 [ 土日祝休 ]</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMobileMenu}
          className="bg-pink text-white w-16 h-16 rounded-full border-3 border-white shadow-hard flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          {isMobileOpen ? <X size={32} /> : <MessageCircle size={32} />}
        </button>
      </div>
    </>
  )
}
