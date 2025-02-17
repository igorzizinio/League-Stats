import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../colors'
import ChampionMasteryCard from '../components/items/ChampionMastery'
import ChampionMastery from '../entities/ChampionMastery'
import { useSummoner } from '../hooks/useSummoner'
import riot from '../services/riot'
import themes from '../themes'

export default function BestChampions() {
  const { t } = useTranslation()
  const { summoner, leagueRegion } = useSummoner()
  const [maestries, setMaestries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    riot
      .getSummonerChampionsMasteries(summoner?.puuid, leagueRegion)
      .then((maestries) => {
        if (!maestries) return
        setMaestries(
          maestries.sort((x, y) => y.championLevel - x.championLevel),
        )
      })
      .catch(console.error)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screen.bestChampions.title')}</Text>

      <ScrollView
        style={styles.maestries}
        contentContainerStyle={{ gap: 8 }}
      >
        {maestries.map((mastery) => (
          <ChampionMasteryCard
            key={mastery.championId}
            mastery={mastery}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-start',
    fontSize: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontWeight: 'bold',
  },
  maestries: {
    width: '100%',
  },
})
