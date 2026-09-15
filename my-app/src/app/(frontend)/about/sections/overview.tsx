import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type OverviewProps = {
  data?: {
    org_name?: string | null
    address?: string | null
    contact_info?: any
    business_content?: string | null
    representative?: string | null
    board_members?: string | null
    establishment_date?: string | null
    history?: { date: string; event: string; id?: string | null }[] | null
  } | null
}

export const Overview = ({ data }: OverviewProps) => {
  if (!data) return null

  const items = [
    { label: '団体名', value: data.org_name },
    { label: '所在地', value: data.address },
    { label: '連絡先', value: data.contact_info, isRichText: true },
    { label: '事業内容', value: data.business_content },
    { label: '代表者名', value: data.representative },
    { label: '役員名', value: data.board_members },
    { label: '設立年月', value: data.establishment_date },
  ]

  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-text inline-block border-b-4 border-yellow pb-2">
            団体概要
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-3 border-border shadow-hard p-6 md:p-12 max-w-4xl mx-auto">
          <table className="w-full border-collapse">
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 last:border-0">
                  <th className="py-4 px-2 md:py-6 md:px-4 text-left bg-gray-50 w-auto md:w-1/3 font-black text-gray-700 align-top rounded-l-lg text-sm md:text-base">
                    {item.label}
                  </th>
                  <td className="py-4 px-2 md:py-6 md:px-4 whitespace-pre-wrap font-medium text-gray-600 leading-relaxed rounded-r-lg text-sm md:text-base">
                    {item.isRichText ? <RichText data={item.value} /> : item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.history && data.history.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8 md:mt-12">
            <h3 className="text-xl md:text-2xl font-black text-text mb-6 text-center">沿革</h3>
            <div className="bg-white rounded-3xl border-3 border-border shadow-hard p-6 md:p-12">
              <ol className="relative border-l-3 border-yellow ml-3">
                {data.history.map((item, i) => (
                  <li key={item.id || i} className="mb-8 last:mb-0 ml-6">
                    <span className="absolute -left-[9px] w-4 h-4 bg-yellow rounded-full border-2 border-border"></span>
                    <p className="text-sm font-black text-gray-500 mb-1">{item.date}</p>
                    <p className="font-bold text-text leading-relaxed whitespace-pre-wrap">
                      {item.event}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
