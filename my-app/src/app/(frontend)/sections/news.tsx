import React from 'react'

export const News = () => {
  const newsItems = [
    { date: '2024.05.20', title: 'はなたね文化祭の開催が決定しました！', category: 'EVENT' },
    { date: '2024.05.15', title: 'フリースクールの見学会を実施します', category: 'INFO' },
    { date: '2024.05.01', title: '5月のたねラボの予定を更新しました', category: 'INFO' },
  ]

  // Placeholder images for the banner
  const bannerImages = ['bg-pink', 'bg-blue', 'bg-yellow', 'bg-lime', 'bg-purple']

  return (
    <section id="news" className="bg-surface relative overflow-hidden pb-12 md:pb-24">
      {/* Infinite Scroll Banner */}
      <div className="w-full overflow-hidden bg-white border-border mb-12 md:mb-24 py-4">
        <div className="flex animate-infinite-scroll w-[200%]">
          {/* First set of images */}
          <div className="flex w-1/2 justify-around gap-4 px-4">
            {bannerImages.map((color, i) => (
              <div
                key={i}
                className={`aspect-video w-full ${color} rounded-xl border-3 border-border shadow-hard flex items-center justify-center`}
              >
                <span className="font-black text-white text-xl opacity-50">IMAGE {i + 1}</span>
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex w-1/2 justify-around gap-4 px-4">
            {bannerImages.map((color, i) => (
              <div
                key={`dup-${i}`}
                className={`aspect-video w-full ${color} rounded-xl border-3 border-border shadow-hard flex items-center justify-center`}
              >
                <span className="font-black text-white text-xl opacity-50">IMAGE {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a349a3_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-5xl font-black text-text bg-yellow px-8 py-2 border-3 border-border shadow-hard transform hover:scale-105 transition-transform">
            NEWS & TOPICS
          </h2>
        </div>
        <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-surface border-3 border-border rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-hard-lg flex flex-col md:flex-row items-start md:items-center gap-4`}
            >
              {/* Ticket holes effect */}
              <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-r-3 border-border rounded-full"></div>
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border-l-3 border-border rounded-full"></div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-lg font-black text-text border-b-4 border-lime">
                  {item.date}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-black border-2 border-text shadow-sm ${item.category === 'EVENT' ? 'bg-pink text-text' : 'bg-blue text-text'}`}
                >
                  {item.category}
                </span>
              </div>
              <span className="font-bold text-lg flex-1 group-hover:text-purple transition-colors">
                {item.title}
              </span>
              <span className="hidden md:block text-2xl font-black text-lime group-hover:translate-x-2 transition-transform">
                &rarr;
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-blue text-text border-3 border-border rounded-full font-black text-xl uppercase tracking-widest shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-1 active:shadow-none"
          >
            VIEW ALL NEWS
          </a>
        </div>
      </div>
    </section>
  )
}
