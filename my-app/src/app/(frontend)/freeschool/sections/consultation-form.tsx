'use client'

import React from 'react'

export const ConsultationForm = () => {
  return (
    <section id="consultation" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#06C755] text-white font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
            LINE CONSULTATION
          </span>
          <h2 className="text-3xl md:text-5xl block font-black text-slate-800 mb-6">
            新規相談予約（公式LINE）
          </h2>
          <div className="bg-white border-3 border-[#06C755] rounded-xl p-6 md:p-8 text-left shadow-sm">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              フリースクール森の子がっこういっぽへの入会をご検討中の方は、公式LINEよりお問い合わせください。内容を確認後、折り返しご連絡いたします。
            </p>
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              なお、土曜日・日曜日・月曜日・祝日はお休みのため、いただいたお問い合わせへの返信ができません。休業日に送信いただいた場合は、翌営業日以降のご対応となります。あらかじめご了承ください。
            </p>
            <div className="text-center mt-8">
              <a
                href="https://line.me/R/ti/p/@070jwtvo"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-12 py-4 bg-[#06C755] text-white font-black text-xl rounded-xl border-3 border-border shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg hover:bg-[#05b04b]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.266 8.847 7.785 9.619.303.067.701.213.801.488.093.25.061.64.029.901-.035.311-.225 1.341-.274 1.603-.064.335.297.808.673.57 2.684-1.696 7.42-4.444 10.279-7.592 1.485-1.611 4.707-5.556 4.707-5.589zM8.334 13.918H5.96a.54.54 0 0 1-.539-.539V8.049c0-.297.241-.539.539-.539h2.374a.54.54 0 0 1 .539.539v4.252h1.835c.298 0 .539.241.539.539v1.078c0 .298-.241.539-.539.539zm4.249-.539c0 .298-.242.539-.539.539h-1.078a.54.54 0 0 1-.539-.539V8.049c0-.297.242-.539.539-.539h1.078c.297 0 .539.242.539.539v5.33zM15.584 8.049v5.33c0 .298-.241.539-.539.539h-1.078a.54.54 0 0 1-.539-.539V8.049c0-.297.242-.539.539-.539h1.078c.297 0 .539.242.539.539zm5.552 0v5.33c0 .298-.241.539-.539.539h-1.078a.54.54 0 0 1-.539-.539V9.52l-2.071 3.551a.54.54 0 0 1-.464.27h-.792a.54.54 0 0 1-.539-.539V8.049c0-.297.242-.539.539-.539h1.078c.297 0 .539.242.539.539v3.861l2.072-3.552a.54.54 0 0 1 .463-.269h.792c.298 0 .539.242.539.539z" />
                </svg>
                公式LINEからのお問い合わせ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
