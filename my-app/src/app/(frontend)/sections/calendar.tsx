import React from 'react'

export const Calendar = () => {
  return (
    <section
      id="calendar"
      className="py-24 bg-blue border-y-4 border-border text-surface overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_2px,transparent_2px)] bg-size-[20px_20px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="inline-block text-5xl font-black text-text bg-surface px-8 py-2 border-3 border-border shadow-hard">
            MONTHLY CALENDAR
          </h2>
        </div>

        <div className="bg-surface p-8 md:p-12 rounded-3xl border-3 border-border shadow-[12px_12px_0px_0px_var(--color-text)] text-center max-w-4xl mx-auto relative">
          {/* Spiral Binding Effect */}
          <div className="absolute -top-6 left-0 w-full flex justify-evenly px-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-12 bg-gray-300 rounded-full border-2 border-border shadow-sm"
              ></div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-8 border-b-3 border-border pb-4 mt-4">
            <button className="text-2xl font-black text-text hover:text-lime transition-colors hover:scale-125 transform">
              &lt;
            </button>
            <h3 className="text-text text-4xl font-black tracking-tight drop-shadow-md">
              MAY 2024
            </h3>
            <button className="text-2xl font-black text-text hover:text-lime transition-colors hover:scale-125 transform">
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4 w-full">
            {/* Days Header */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
              <div
                key={d}
                className={`font-black text-lg ${i === 0 ? 'text-pink' : i === 6 ? 'text-blue' : 'text-text'}`}
              >
                {d}
              </div>
            ))}

            {/* Calendar Grid */}
            {Array.from({ length: 31 }).map((_, i) => {
              const isToday = i === 19
              const hasEvent = i === 14 || i === 24
              return (
                <div key={i} className="aspect-square relative group cursor-pointer">
                  <div
                    className={`w-full h-full border-2 border-border rounded-xl flex items-center justify-center text-xl font-bold transition-all group-hover:-translate-y-1 group-hover:shadow-md ${isToday ? 'bg-lime text-text' : 'bg-transparent text-text group-hover:bg-yellow'}`}
                  >
                    {i + 1}
                  </div>
                  {hasEvent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink rounded-full border-2 border-border animate-pulse"></div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-lime rounded-full border-2 border-border"></div>
              <span className="text-text font-bold">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink rounded-full border-2 border-border"></div>
              <span className="text-text font-bold">Event</span>
            </div>
          </div>

          <p className="text-text mt-8 font-bold text-lg bg-yellow inline-block px-4 py-1 rounded-lg border-2 border-border">
            今月のイベントやたねラボの開催日をチェック！
          </p>
        </div>
      </div>
    </section>
  )
}
