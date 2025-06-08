import { enUS, ptBR, es, ja, Locale } from 'date-fns/locale'

const localeMap: Record<string, Locale> = {
  'pt-br': ptBR,
  pt: ptBR,
  'en-us': enUS,
  en: enUS,
  es: es,
  ja: ja,
  'ja-jp': ja,
}

export function expoToDateFnsLocale(locale: string): Locale {
  const normalizedLocale = locale.toLowerCase().replace('_', '-')
  return localeMap[normalizedLocale] || enUS
}
