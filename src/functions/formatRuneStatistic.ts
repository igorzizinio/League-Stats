import type { CommunityDragonPerk } from '../services/cdragon'

const COMPACT_LABEL = /damage|healing|shield|gold|mana|bonus|earned|dealt/i

function normalizeLocale(locale?: string): string | undefined {
  if (!locale) return undefined
  return locale.replace('_', '-')
}

function createFormatter(
  locale: string | undefined,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat | null {
  try {
    return new Intl.NumberFormat(locale, options)
  } catch {
    try {
      // fallback sem locale (usa o padrão do dispositivo)
      return new Intl.NumberFormat(undefined, options)
    } catch {
      return null
    }
  }
}

function createFormatters(rawLocale?: string) {
  const locale = normalizeLocale(rawLocale)

  return {
    compact: createFormatter(locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }),
    integer: createFormatter(locale, { maximumFractionDigits: 0 }),
  }
}

export function formatRuneStatistic(
  perk: CommunityDragonPerk,
  vars: number[],
  locale?: string,
): string | undefined {
  if (vars.every((v) => !Number.isFinite(v) || v <= 0)) return undefined

  const { compact, integer } = createFormatters(locale)

  const format = (value: number, useCompact: boolean) => {
    const formatter = useCompact && compact ? compact : integer
    return formatter ? formatter.format(value) : String(Math.round(value))
  }

  const lines = (perk.endOfGameStatDescs ?? [])
    .filter((desc) => /@eogvar[123]@/.test(desc))
    .map((desc) => {
      const plain = desc.replace(/<[^>]+>/g, '')
      const useCompact = COMPACT_LABEL.test(plain)

      return plain
        .replace(/@eogvar([123])@/g, (_, n: string) => {
          const value = vars[Number(n) - 1] ?? 0
          if (!Number.isFinite(value) || value <= 0) return '0'
          return format(value, useCompact)
        })
        .replace(/\s+/g, ' ')
        .trim()
    })
    .filter(Boolean)

  return lines.length ? lines.join('\n') : undefined
}
