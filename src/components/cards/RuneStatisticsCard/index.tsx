import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MatchParticipant, PerkStyleSelection } from '../../../@types/riot'
import cdragon, { CommunityDragonPerk } from '../../../services/cdragon'
import { usePreferences } from '../../../hooks/usePreferences'
import Card from '../../ui/card'
import Title from '../../ui/title'
import { styles } from './styles'
import { RuneSection } from './rune-section'
import { RuneItem } from './rune-item'

type Props = { participant: MatchParticipant }

const STAT_SHARD_ORDER = ['offense', 'flex', 'defense'] as const

export const RuneStatisticsCard = ({ participant }: Props) => {
  const { t } = useTranslation()
  const { language } = usePreferences()
  const [perks, setPerks] = useState<CommunityDragonPerk[]>([])

  useEffect(() => {
    let cancelled = false
    cdragon
      .getOrFetchPerks(language)
      .then((result) => !cancelled && setPerks(result))
      .catch((error) => console.warn('Failed to load perks', error))
    return () => {
      cancelled = true
    }
  }, [language])

  const perksById = useMemo(
    () => new Map(perks.map((perk) => [perk.id, perk])),
    [perks],
  )

  const styleSelections = participant.perks?.styles ?? []
  const [primary, secondary] = styleSelections
  const statPerks = participant.perks?.statPerks

  const renderSelections = (selections: PerkStyleSelection[] = []) =>
    selections.map((selection) => {
      const rune = perksById.get(selection.perk)
      return rune ? (
        <RuneItem
          key={selection.perk}
          rune={rune}
          selection={selection}
          locale={language}
        />
      ) : null
    })

  return (
    <Card style={styles.container}>
      <Title>{t('card.runeStatistics.title')}</Title>

      <RuneSection title={t('card.runeStatistics.primary')}>
        {renderSelections(primary?.selections)}
      </RuneSection>

      <RuneSection title={t('card.runeStatistics.secondary')}>
        {renderSelections(secondary?.selections)}
      </RuneSection>

      <RuneSection title={t('card.runeStatistics.shards')}>
        <View style={styles.shards}>
          {STAT_SHARD_ORDER.map((slot) => {
            const rune = statPerks ? perksById.get(statPerks[slot]) : undefined
            return rune ? (
              <RuneItem
                key={slot}
                rune={rune}
                compact
              />
            ) : null
          })}
        </View>
      </RuneSection>
    </Card>
  )
}
