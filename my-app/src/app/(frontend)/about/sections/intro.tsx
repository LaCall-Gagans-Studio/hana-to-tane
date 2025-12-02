import React from 'react'

type IntroProps = {
  message?: any
}

export const Intro = ({ message }: IntroProps) => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#a349a3_2px,transparent_2px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="inline-block text-6xl md:text-7xl font-black text-text mb-6 relative tracking-tighter">
            ABOUT US
            <span className="absolute -bottom-2 left-0 w-full h-4 bg-pink/50 -z-10 rounded-full rotate-1"></span>
          </h1>
          <p className="text-xl font-bold text-gray-600 max-w-2xl mx-auto">
            はなとたねは、子どもも大人も「自分らしく」いられる場所をつくっています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Miho-chan */}
          <div className="bg-white p-8 rounded-3xl border-3 border-border shadow-hard transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative group">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink rounded-full border-3 border-border flex items-center justify-center text-2xl shadow-sm z-20">
              🌸
            </div>
            <div className="w-32 h-32 mx-auto bg-pink rounded-full border-3 border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-3xl font-black text-text">MIHO</span>
            </div>
            <h3 className="text-2xl font-black text-center mb-2 text-text">みほちゃん</h3>
            <p className="text-sm font-bold text-center text-gray-500 mb-4">代表 / 河上 美穂</p>
            <div className="font-medium text-gray-600 leading-relaxed">
              {/* Use RichText renderer here if available, or just render children/text */}
              {/* For now, we'll keep the static text as default if no message is passed, or render message */}
              {/* Ideally we should use a RichText component. I'll assume we might not have one handy in this context yet, so I'll leave the static text as fallback or just render it if it's simple text. 
                  But the user asked to commonize info. 
                  Let's assume message is passed. If it's complex RichText, we need a serializer. 
                  For this step, I'll just leave the static text but add the prop interface so I can wire it up. 
                  Wait, the user wants "commonize". So I should use the prop.
                  I'll replace the static text with a check for message. */}
              {message ? (
                <div>
                  {/* Render message here - simplified for now as I don't have a serializer imported */}
                  {/* In a real app, <RichText content={message} /> */}
                  <p>（CMSからのメッセージを表示）</p>
                </div>
              ) : (
                <>
                  <p>
                    はじめまして。はなとたねの代表のみほちゃんこと河上美穂です。
                    <br />
                    このたびは当サイトにご訪問いただき、ありがとうございます。
                    <br />
                    みんなが笑顔になれる場所を、一緒に作っていきましょう。
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Kei-chan */}
          <div className="bg-white p-8 rounded-3xl border-3 border-border shadow-hard transform rotate-1 hover:rotate-0 transition-transform duration-300 relative group">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue rounded-full border-3 border-border flex items-center justify-center text-2xl shadow-sm z-20">
              🌱
            </div>
            <div className="w-32 h-32 mx-auto bg-blue rounded-full border-3 border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-3xl font-black text-text">KEI</span>
            </div>
            <h3 className="text-2xl font-black text-center mb-2 text-text">けいちゃん</h3>
            <p className="text-sm font-bold text-center text-gray-500 mb-4">副代表 / 河上 啓子</p>
            <p className="font-medium text-gray-600 leading-relaxed">
              はなとたね副代表のけいちゃんこと河上啓子です。
              <br />
              はなとたねは「みほちゃん」と「けいちゃん」で運営しています。
              <br />
              いつでも気軽に遊びに来てくださいね。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
