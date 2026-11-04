// 総合お問い合わせフォームのスパム対策（入力チェック・ハニーポット・送信速度・reCAPTCHA v3）

export const CONTACT_TYPES = ['support', 'recruit', 'other'] as const
export type ContactType = (typeof CONTACT_TYPES)[number]

export const HONEYPOT_FIELD = 'website'
export const MIN_FILL_MS = 3000
const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const MAX_URLS = 3
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactInput = {
  name: string
  email: string
  type: ContactType
  message: string
}

export type CheckResult =
  | { kind: 'ok'; input: ContactInput }
  // ボットと判断したもの。送信はしないが、相手には成功に見せる
  | { kind: 'drop'; reason: string }
  // 人が直せる入力エラー。理由を画面に出す
  | { kind: 'invalid'; error: string }

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export function checkContact(data: unknown, now = Date.now()): CheckResult {
  const d = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>

  if (str(d[HONEYPOT_FIELD]) !== '') return { kind: 'drop', reason: 'honeypot' }

  const startedAt = Number(d.startedAt)
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) {
    return { kind: 'drop', reason: 'too-fast' }
  }

  const name = str(d.name)
  const email = str(d.email)
  const type = str(d.type)
  const message = str(d.message)

  if (!name || !email || !type || !message) {
    return { kind: 'invalid', error: '必須項目が入力されていません。' }
  }
  if (name.length > MAX_NAME || /[\r\n"<>]/.test(name)) {
    return { kind: 'invalid', error: 'お名前の入力内容をご確認ください。' }
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { kind: 'invalid', error: '有効なメールアドレスの形式ではありません。' }
  }
  if (!(CONTACT_TYPES as readonly string[]).includes(type)) {
    return { kind: 'invalid', error: 'お問い合わせ種別を選択してください。' }
  }
  if (message.length > MAX_MESSAGE) {
    return { kind: 'invalid', error: `お問い合わせ内容は${MAX_MESSAGE}文字以内でご記入ください。` }
  }
  const urls = message.match(/https?:\/\/|www\./gi) ?? []
  if (urls.length > MAX_URLS) {
    return { kind: 'invalid', error: `URLは${MAX_URLS}件までにしてください。` }
  }

  return { kind: 'ok', input: { name, email, type: type as ContactType, message } }
}

export const RECAPTCHA_ACTION = 'contact_submit'
const MIN_SCORE = 0.5

// コラム予約フォーム（actions/reservation.ts）と同じキー・同じ基準で検証する。
// RECAPTCHA_SECRET_KEY が無い環境（ローカル等）では検証を飛ばす。
export async function verifyRecaptcha(
  token: unknown,
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true }
  if (typeof token !== 'string' || !token) return { ok: false, reason: 'no-token' }

  const res = await fetchImpl('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  })
  const r = (await res.json()) as { success?: boolean; score?: number; action?: string }

  if (!r.success) return { ok: false, reason: 'verify-failed' }
  if (r.action !== undefined && r.action !== RECAPTCHA_ACTION) return { ok: false, reason: 'action' }
  if (r.score !== undefined && r.score < MIN_SCORE) return { ok: false, reason: `score ${r.score}` }
  return { ok: true }
}
