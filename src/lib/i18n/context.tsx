import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import en from './en'
import fa from './fa'
import type { Translations } from './en'

type Lang = 'en' | 'fa'

interface I18nContext {
  lang: Lang
  t: Translations
  setLang: (l: Lang) => void
  isRtl: boolean
}

const Ctx = createContext<I18nContext | null>(null)

// ponytail: localStorage flag — set PERSIST_LANG=false to disable
const PERSIST = true

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (PERSIST) {
      const saved = localStorage.getItem('arses-lang')
      if (saved === 'fa' || saved === 'en') return saved
    }
    return 'en'
  })

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (PERSIST) localStorage.setItem('arses-lang', l)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'fa' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <Ctx.Provider value={{ lang, t: lang === 'fa' ? (fa as unknown as Translations) : en, setLang, isRtl: lang === 'fa' }}>
      {children}
    </Ctx.Provider>
  )
}

export const useI18n = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n outside I18nProvider')
  return ctx
}
