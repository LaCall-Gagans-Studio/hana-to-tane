import React from 'react'
import { ContactForm } from '@/components/ContactForm'
import { Heart, Users, Mail, CheckCircle, Briefcase, Star } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-800">
      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-4 bg-surface overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a349a3_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

          {/* Blobs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 animate-blob animation-delay-2000"></div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="inline-block text-4xl md:text-6xl font-black text-white bg-blue px-12 py-4 border-4 border-border shadow-hard mb-8 transform -rotate-1">
              CONTACT & SUPPORT
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-600 mb-12">
              ご支援・採用・お問い合わせ
            </p>

            {/* Page Navigation */}
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href="#support"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-pink text-white border-3 border-border rounded-xl font-black text-lg shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all"
              >
                <Heart fill="currentColor" /> 支援について
              </a>
              <a
                href="#recruit"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow text-slate-800 border-3 border-border rounded-xl font-black text-lg shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all"
              >
                <Users /> 採用について
              </a>
              <a
                href="#form"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 border-3 border-border rounded-xl font-black text-lg shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all"
              >
                <Mail /> お問い合わせ
              </a>
            </div>
          </div>
        </section>

        {/* --- SUPPORT SECTION --- */}
        <section id="support" className="py-20 px-4 bg-purple/5 relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d946ef_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-pink text-white font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
                SUPPORT
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-purple mb-6 drop-shadow-sm">
                寄付・賛助会員について
              </h1>
              <p className="text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
                NPO法人はなとたねは、皆様からの温かいご支援によって支えられています。
                子どもたちの「やってみたい」を実現し、安心して過ごせる居場所を守り続けるために、
                継続的なご支援をお願いいたします。
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  type: '子ども会員',
                  price: '500',
                  color: 'bg-lime',
                  icon: '🌱',
                  desc: 'おこづかいで応援！',
                },
                {
                  type: '個人会員',
                  price: '6,000',
                  color: 'bg-blue',
                  icon: '👤',
                  desc: '活動を支えるサポーター',
                },
                {
                  type: '団体会員',
                  price: '12,000',
                  color: 'bg-purple',
                  icon: '🏢',
                  desc: '企業・団体の皆様へ',
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className="bg-white border-3 border-border rounded-2xl p-6 shadow-hard flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform"
                >
                  <div
                    className={`w-20 h-20 ${plan.color} rounded-full border-3 border-border flex items-center justify-center text-4xl mb-4 shadow-sm`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{plan.type}</h3>
                  <p className="text-slate-500 font-bold mb-6">{plan.desc}</p>
                  <div className="mt-auto w-full pt-6 border-t-2 border-dashed border-gray-200">
                    <span className="text-sm font-bold text-gray-500">年会費</span>
                    <div className="text-3xl font-black text-slate-800">
                      {plan.price}
                      <span className="text-lg ml-1">円/口</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Transfer Info */}
              <div className="bg-white border-3 border-border rounded-xl p-8 relative shadow-hard">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-6 py-1 rounded-full font-bold border-2 border-gray-700 shadow-sm">
                  お振込先
                </div>
                <div className="mt-4 font-mono text-center space-y-2 text-slate-700 font-bold">
                  <p>ゆうちょ銀行</p>
                  <p>記号：XXXXX</p>
                  <p>番号：XXXXXXX</p>
                  <p>名義：トクヒ）ハナトタネ</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-pink/10 border-3 border-pink rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-black text-pink mb-4 flex items-center gap-2">
                  <Star fill="currentColor" /> 会員特典
                </h3>
                <ul className="space-y-3">
                  {[
                    '季刊誌「はなとたね通信」のお届け',
                    '主催イベントへの先行予約・割引',
                    '年次報告書の送付',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 font-bold text-slate-700">
                      <CheckCircle className="text-pink shrink-0" size={20} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- RECRUIT SECTION --- */}
        <section id="recruit" className="py-20 px-4 bg-yellow/5 relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ca8a04_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16 relative">
              <span className="inline-block px-4 py-1  bg-yellow text-slate-800 font-black text-sm rounded-full mb-6  shadow-sm border-2 border-border">
                RECRUIT
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 relative">
                スタッフ募集
              </h1>
              <div className="bg-white/80 p-8 rounded-2xl border-3 border-border shadow-hard mx-auto max-w-3xl transform">
                <p className="text-xl md:text-2xl font-black text-slate-700 leading-relaxed font-sans">
                  あなたの手が、
                  <br className="md:hidden" />
                  誰かの明日を変える。
                </p>
                <p className="mt-4 text-slate-600 font-medium">
                  はなとたねでは、子どもたち一人ひとりの個性に寄り添い、
                  <br />
                  共に成長できる仲間を募集しています。
                </p>
              </div>
            </div>

            {/* Ideal Candidate */}
            <div className="mb-16">
              <h1 className="text-center text-2xl font-black text-slate-700 mb-8">求める人物像</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '👂', text: '聴く力がある' },
                  { icon: '🔥', text: '情熱がある' },
                  { icon: '💡', text: '柔軟な発想' },
                  { icon: '🤝', text: 'チームワーク' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl border-3 border-border shadow-hard flex flex-col items-center justify-center gap-4 text-center hover:bg-yellow/10 transition-colors"
                  >
                    <span className="text-4xl">{item.icon}</span>
                    <span className="font-bold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Listings */}
            <div className="bg-white border-3 border-border rounded-2xl overflow-hidden shadow-hard max-w-3xl mx-auto">
              <div className="bg-slate-800 p-4 text-white font-black text-lg flex items-center gap-2">
                <Briefcase size={20} /> 募集要項：フリースクールスタッフ
              </div>
              <div className="p-6 md:p-8">
                <div className="grid gap-6">
                  {[
                    { label: '雇用形態', value: '正社員 / パート・アルバイト' },
                    { label: '給与', value: '正社員：月給 20万円〜\nパート：時給 1,000円〜' },
                    { label: '勤務時間', value: '9:00 〜 18:00 (シフト制)' },
                    { label: '勤務地', value: '鳥取県鳥取市 (旧神戸小学校)' },
                    {
                      label: '応募資格',
                      value:
                        '保育士、教員免許、社会福祉士等の資格をお持ちの方歓迎\n(資格がなくても熱意のある方は是非ご応募ください)',
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row border-b-2 border-dashed border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="w-full md:w-40 font-black text-slate-500 mb-2 md:mb-0">
                        {row.label}
                      </div>
                      <div className="flex-1 font-medium text-slate-800 whitespace-pre-wrap">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FORM SECTION --- */}
        <section id="form" className="py-20 px-4 bg-blue/5 relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-blue text-white font-black text-sm rounded-full mb-4 shadow-sm border-2 border-border">
                CONTACT
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">お問い合わせ</h1>
              <p className="text-slate-600 font-bold">
                ご不明な点やご相談など、お気軽にお問い合わせください。
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink rounded-full border-4 border-border opacity-20 animate-bounce-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-lime rounded-full border-4 border-border opacity-20 animate-pulse"></div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
