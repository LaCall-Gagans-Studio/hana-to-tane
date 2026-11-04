import { afterEach, describe, expect, it, vi } from 'vitest'
import { checkContact, verifyRecaptcha, RECAPTCHA_ACTION } from '@/lib/contactSpam'

const NOW = 1_800_000_000_000
const base = {
  name: '山田 太郎',
  email: 'taro@example.com',
  type: 'support',
  message: '賛助会員について教えてください。',
  website: '',
  startedAt: NOW - 10_000,
}

describe('checkContact', () => {
  it('通常の入力は ok', () => {
    const r = checkContact(base, NOW)
    expect(r.kind).toBe('ok')
  })

  it('ハニーポットに入力があれば drop', () => {
    expect(checkContact({ ...base, website: 'http://spam.example' }, NOW)).toEqual({ kind: 'drop', reason: 'honeypot' })
  })

  it('3秒未満の送信や startedAt 無しは drop', () => {
    expect(checkContact({ ...base, startedAt: NOW - 1000 }, NOW).kind).toBe('drop')
    const { startedAt: _s, ...noStart } = base
    expect(checkContact(noStart, NOW).kind).toBe('drop')
  })

  it('必須漏れ・不正な種別・メール形式・改行入りの名前は invalid', () => {
    expect(checkContact({ ...base, message: '  ' }, NOW).kind).toBe('invalid')
    expect(checkContact({ ...base, type: 'spam' }, NOW).kind).toBe('invalid')
    expect(checkContact({ ...base, email: 'not-an-email' }, NOW).kind).toBe('invalid')
    expect(checkContact({ ...base, name: 'a\r\nBcc: x@example.com' }, NOW).kind).toBe('invalid')
  })

  it('URL が4件以上・長すぎる本文は invalid', () => {
    const urls = Array.from({ length: 4 }, (_, i) => `https://e${i}.example`).join(' ')
    expect(checkContact({ ...base, message: urls }, NOW).kind).toBe('invalid')
    expect(checkContact({ ...base, message: 'あ'.repeat(5001) }, NOW).kind).toBe('invalid')
  })

  it('JSON でない入力でも落ちない', () => {
    expect(checkContact(null, NOW).kind).toBe('drop')
  })
})

describe('verifyRecaptcha', () => {
  afterEach(() => vi.unstubAllEnvs())

  const fakeFetch = (body: object) => vi.fn(async () => new Response(JSON.stringify(body))) as unknown as typeof fetch

  it('シークレット未設定なら検証しない', async () => {
    vi.stubEnv('RECAPTCHA_SECRET_KEY', '')
    expect(await verifyRecaptcha(undefined, fakeFetch({}))).toEqual({ ok: true })
  })

  it('シークレット設定時: トークン無し・低スコア・別アクションは拒否、正常は通す', async () => {
    vi.stubEnv('RECAPTCHA_SECRET_KEY', 'test-secret')
    expect((await verifyRecaptcha(undefined, fakeFetch({}))).ok).toBe(false)
    expect((await verifyRecaptcha('t', fakeFetch({ success: true, score: 0.2, action: RECAPTCHA_ACTION }))).ok).toBe(false)
    expect((await verifyRecaptcha('t', fakeFetch({ success: true, score: 0.9, action: 'reservation_submit' }))).ok).toBe(false)
    expect((await verifyRecaptcha('t', fakeFetch({ success: false }))).ok).toBe(false)
    expect(await verifyRecaptcha('t', fakeFetch({ success: true, score: 0.9, action: RECAPTCHA_ACTION }))).toEqual({ ok: true })
  })
})
