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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-text inline-block border-b-4 border-yellow pb-2">
            団体概要
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-3 border-border shadow-hard p-8 md:p-12 max-w-4xl mx-auto">
          <table className="w-full border-collapse">
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 last:border-0">
                  <th className="py-6 px-4 text-left bg-gray-50 w-1/3 font-black text-gray-700 align-top rounded-l-lg">
                    {item.label}
                  </th>
                  <td className="py-6 px-4 whitespace-pre-wrap font-medium text-gray-600 leading-relaxed rounded-r-lg">
                    {item.isRichText ? <RichText data={item.value} /> : item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
