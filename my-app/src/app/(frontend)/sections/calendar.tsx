'use client'

import React, { useState } from 'react'
import { Event } from '@/payload-types'
import Link from 'next/link'

type CalendarProps = {
  events: Event[]
}

const DAYS = ['日', '月', '火', '水', '木', '金', '土']

export const Calendar = ({ events }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    return { days, firstDay }
  }

  const { days, firstDay } = getDaysInMonth(currentDate)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayOfWeek = DAYS[targetDate.getDay()].toLowerCase()

    return events.filter((event) => {
      // Check specific date
      if (event.date) {
        const eventDate = new Date(event.date)
        if (isSameDay(eventDate, targetDate)) return true
      }
      // Check recurring days
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (event.recurringDays && event.recurringDays.includes(dayOfWeek as any)) {
        return true
      }
      return false
    })
  }

  const handleDateClick = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const events = getEventsForDay(day)
    // Add instanceDate for display purposes if needed, though getEventsForDay returns raw events.
    // Let's attach the targetDate as instanceDate to consistency with list view
    const eventsWithDate = events.map((e) => ({ ...e, instanceDate: targetDate }))

    setSelectedDate(targetDate)
    setSelectedEvents(eventsWithDate)
  }

  const closeModal = () => {
    setSelectedDate(null)
    setSelectedEvents([])
  }

  const currentMonthEvents = events
    .flatMap((event) => {
      const instances = []
      if (event.date) {
        const d = new Date(event.date)
        if (
          d.getMonth() === currentDate.getMonth() &&
          d.getFullYear() === currentDate.getFullYear()
        ) {
          instances.push({ ...event, instanceDate: d })
        }
      }
      if (event.recurringDays) {
        // Generate instances for this month
        for (let d = 1; d <= days; d++) {
          const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d)
          const dayOfWeek = DAYS[targetDate.getDay()].toLowerCase()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (event.recurringDays.includes(dayOfWeek as any)) {
            instances.push({ ...event, instanceDate: targetDate })
          }
        }
      }
      return instances
    })
    .sort((a, b) => a.instanceDate.getTime() - b.instanceDate.getTime())

  return (
    <section
      id="calendar"
      className="py-12 md:py-24 bg-blue border-y-4 border-border text-surface overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_2px,transparent_2px)] bg-size-[20px_20px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="inline-block text-3xl md:text-5xl font-black text-text bg-surface px-8 py-2 border-3 border-border shadow-hard">
            はなたねカレンダー
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calendar Side */}
          <div className="lg:col-span-2 bg-surface p-6 md:p-12 rounded-3xl border-3 border-border shadow-[12px_12px_0px_0px_var(--color-text)] text-center relative">
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
              <button
                onClick={prevMonth}
                className="text-2xl font-black text-text hover:text-lime transition-colors hover:scale-125 transform"
              >
                &lt;
              </button>
              <h3 className="text-text text-2xl md:text-4xl font-black tracking-tight drop-shadow-md uppercase">
                {currentDate.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })}
              </h3>
              <button
                onClick={nextMonth}
                className="text-2xl font-black text-text hover:text-lime transition-colors hover:scale-125 transform"
              >
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4 w-full">
              {/* Days Header */}
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={`font-black text-lg ${i === 0 ? 'text-pink' : i === 6 ? 'text-blue' : 'text-text'}`}
                >
                  {d}
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}

              {/* Calendar Grid */}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1
                const dayEvents = getEventsForDay(day)

                const isToday = isSameDay(
                  new Date(),
                  new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                )

                return (
                  <div
                    key={day}
                    className="aspect-square relative group cursor-pointer"
                    onClick={() => handleDateClick(day)}
                  >
                    <div
                      className={`w-full h-full border-2 border-border rounded-xl flex flex-col justify-start p-1 transition-all group-hover:-translate-y-1 group-hover:shadow-md overflow-hidden relative
                            ${isToday ? 'bg-lime' : 'bg-white group-hover:bg-yellow/10'}
                        `}
                    >
                      {/* Date Header */}
                      <span
                        className={`text-sm font-black leading-none mb-1 ml-1 ${isToday ? 'text-text' : 'text-gray-400 group-hover:text-text'}`}
                      >
                        {day}
                      </span>

                      {/* Desktop: Event List (Shows titles) */}
                      <div className="hidden md:flex flex-col gap-1 w-full overflow-hidden">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={idx}
                            title={event.title}
                            className={`text-[10px] px-1 py-0.5 rounded truncate font-bold leading-tight
                                ${
                                  event.isHighlight
                                    ? 'bg-yellow text-text border border-black'
                                    : event.type === 'free_school'
                                      ? 'bg-green/20 text-green-800'
                                      : 'bg-pink/20 text-pink-800'
                                }
                           `}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>

                      {/* Mobile: Dots (Fallback) */}
                      <div className="md:hidden flex flex-wrap gap-1 px-1 content-start">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              event.isHighlight
                                ? 'bg-yellow ring-1 ring-black'
                                : event.type === 'free_school'
                                  ? 'bg-green'
                                  : 'bg-pink'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime rounded-full border-2 border-border"></div>
                <span className="text-text font-bold">今日</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink rounded-full border-2 border-border"></div>
                <span className="text-text font-bold">イベント</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green rounded-full border-2 border-border"></div>
                <span className="text-text font-bold">フリースクール</span>
              </div>
            </div>
          </div>

          {/* Events List Side */}
          <div className="bg-white p-8 rounded-3xl border-3 border-border shadow-hard h-fit max-h-[600px] overflow-y-auto custom-scrollbar">
            <h3 className="text-2xl font-black text-text mb-6 border-b-2 border-border pb-2 sticky top-0 bg-white z-10">
              EVENTS
            </h3>

            <div className="space-y-4">
              {currentMonthEvents.filter((e) => e.isHighlight).length > 0 ? (
                currentMonthEvents
                  .filter((e) => e.isHighlight)
                  .map((event, idx) => (
                    <div key={`${event.id}-${idx}`} className="group">
                      <div
                        className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                          event.isHighlight
                            ? 'border-yellow bg-yellow/10'
                            : event.type === 'free_school'
                              ? 'border-border bg-green/10'
                              : 'border-border bg-pink/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="font-bold text-gray-500 text-sm">
                              {event.instanceDate.toLocaleDateString('ja-JP', {
                                month: 'short',
                                day: 'numeric',
                                weekday: 'short',
                              })}
                            </div>
                            {/* Highlight badge removed as per request */}
                            {event.type === 'free_school' && (
                              <span className="bg-green text-white text-xs font-bold px-2 py-1 rounded-full border border-border">
                                Free School
                              </span>
                            )}
                          </div>
                        </div>
                        <h4 className="text-lg font-black text-text mb-2 group-hover:text-blue transition-colors">
                          {event.link ? (
                            <Link href={event.link} target="_blank" className="hover:underline">
                              {event.title} ↗
                            </Link>
                          ) : (
                            event.title
                          )}
                        </h4>
                        {!event.isAllDay && event.date && (
                          <div className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            {event.endDate &&
                              ` - ${new Date(event.endDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  今月のピックアップイベントはありません
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Date Detail Modal */}
      {selectedDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl border-3 border-border shadow-hard-lg w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500 hover:bg-gray-200 transition-colors border-2 border-border"
            >
              ✕
            </button>

            <div className="text-center mb-6 border-b-2 border-dashed border-gray-200 pb-4">
              <h3 className="text-2xl md:text-3xl font-black text-text inline-block">
                {selectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}
              </h3>
              <p className="text-gray-500 font-bold mt-1">
                {selectedDate.toLocaleDateString('ja-JP', { weekday: 'long' })}
              </p>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar px-1">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-2 ${
                      event.type === 'free_school'
                        ? 'bg-green/10 border-green'
                        : event.isHighlight
                          ? 'bg-yellow/10 border-yellow'
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {event.type === 'free_school' && (
                        <span className="bg-green text-white text-xs font-bold px-2 py-1 rounded-full border border-border">
                          Free School
                        </span>
                      )}
                      {event.isHighlight && (
                        <span className="bg-yellow text-text text-xs font-black px-2 py-1 rounded-full border border-border">
                          PICK UP
                        </span>
                      )}
                      {!event.isAllDay && (
                        <span className="text-sm font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                          {event.date &&
                            new Date(event.date).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          {event.endDate
                            ? ` - ${new Date(event.endDate).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`
                            : ''}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-black text-text mb-2 leading-tight">
                      {event.link ? (
                        <Link
                          href={event.link}
                          target="_blank"
                          className="hover:underline flex items-center gap-1 group-hover:text-blue"
                        >
                          {event.title} <span className="text-sm">↗</span>
                        </Link>
                      ) : (
                        event.title
                      )}
                    </h4>

                    {event.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mt-2 whitespace-pre-wrap">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-400 mb-2">予定はありません</p>
                  <span className="text-4xl grayscale opacity-50">😴</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
