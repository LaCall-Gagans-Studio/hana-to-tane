import React from 'react'
import { ContactForm } from '@/components/ContactForm'
import { Heart, Users, Mail, CheckCircle, Briefcase, Star } from 'lucide-react'

export const revalidate = 60

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
                  <p>山陰合同銀行</p>
                  <p>千代水支店</p>
                  <p>普通：4530689</p>
                  <p>NPO法人はなとたね（エヌピーオーホウジンハナトタネ）</p>
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
              <span className="inline-block px-4 py-1 bg-yellow text-slate-800 font-black text-sm rounded-full mb-6 shadow-sm border-2 border-border">
                RECRUIT
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 relative">
                スタッフ募集
              </h1>

              <div className="bg-white/80 p-8 md:p-12 rounded-2xl border-3 border-border shadow-hard mx-auto max-w-4xl transform text-left">
                {/* キャッチコピー部分 */}
                <div className="text-center mb-10">
                  <p className="text-2xl md:text-3xl font-black text-slate-700 leading-relaxed font-sans relative inline-block">
                    あなたの手が、
                    <br className="md:hidden" />
                    誰かの明日を変える。
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-yellow rounded-full"></span>
                  </p>
                </div>

                {/* 本文部分 */}
                <div className="space-y-6 text-slate-600 font-medium leading-loose text-sm md:text-base">
                  <p>
                    私たちのフリースクールは、一人ひとりの子どもの個性と可能性を大切にする場所です。従来の教育に馴染めなかった子どもたち、自分のペースで学びたい子どもたちが、自分らしく成長できる環境づくりに取り組んでいます。
                  </p>
                  <p>
                    子どもたちは皆、無限の可能性を秘めています。その芽を見つけ、共に育てていくのが私たちの喜びです。時には悩み、立ち止まることもありますが、一人の子どもが小さな一歩を踏み出す瞬間に立ち会えたとき、この仕事の意義を実感します。
                  </p>
                  <p>
                    私たちは、子どもたちと真摯に向き合い、共に考え、共に成長できる仲間を求めています。子どもたちの声に耳を傾け、その思いに寄り添える温かい心を持った方と一緒に働きたいと考えています。
                  </p>
                  <p>
                    あなたの経験や視点が、子どもたちの新たな可能性を開くきっかけになるかもしれません。子どもたちの「今」を大切にしながら、共に未来を創っていきませんか？私たちと一緒に、子どもたちの笑顔あふれる場所をつくりましょう。
                  </p>
                </div>
              </div>
            </div>

            {/* Ideal Candidate */}
            <div className="mb-16">
              <h2 className="text-center text-3xl font-black text-slate-700 mb-10 inline-block relative">
                求める人物像
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow/50 -z-10 rounded-full transform -rotate-1"></span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🗣️',
                    title: 'コミュニケーション力',
                    desc: '明確で効果的なコミュニケーション能力を持ち、チーム内外の人々と円滑にやり取りできる方。',
                  },
                  {
                    icon: '🔥',
                    title: '将来の志がある',
                    desc: '自身のキャリアと同時に、組織の将来に対しても熱意とビジョンを持って取り組める方。',
                  },
                  {
                    icon: '💡',
                    title: '問題を解決する能力',
                    desc: '複雑な課題に直面しても、創造的かつ実践的な解決策を見つけ出すことができる方。',
                  },
                  {
                    icon: '🤝',
                    title: '共感力とサポート精神',
                    desc: '利用者の立場に立って感じ取る共感力を持ち、支援が必要な人々への深い理解と優しさで接することができる方。',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 md:p-8 rounded-2xl border-3 border-border shadow-hard flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform h-full"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-14 h-14 bg-yellow/20 rounded-full flex items-center justify-center text-3xl border-2 border-border shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-black text-slate-800">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
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
