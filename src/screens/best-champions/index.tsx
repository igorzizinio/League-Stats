import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import ChampionMasteryCard from '../../components/items/ChampionMastery'
import ChampionMastery from '../../entities/ChampionMastery'
import { useSummoner } from '../..//hooks/useSummoner'
import { useLeagueStats } from '../../hooks/useLeagueStats'
import { styles } from './styles'

export default function BestChampions() {
  const { t } = useTranslation()

  const { leaguestats } = useLeagueStats()
  const { summoner, leagueRegion } = useSummoner()

  const [masteries, setMasteries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    leaguestats
      .getSummonerChampionsMasteries(leagueRegion, summoner.puuid)
      .then((masteries) => {
        if (!masteries) return

        setMasteries(
          masteries.sort((x, y) => y.championLevel - x.championLevel),
        )
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screen.bestChampions.title')}</Text>

      <ScrollView
        style={styles.maestries}
        contentContainerStyle={{ gap: 8 }}
      >
        {masteries.map((mastery) => (
          <ChampionMasteryCard
            key={mastery.championId}
            mastery={mastery}
          />
        ))}
      </ScrollView>
    </View>
  )
}
