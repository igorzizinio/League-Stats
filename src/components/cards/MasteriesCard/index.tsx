import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ChampionMastery from '../../../entities/ChampionMastery'
import { useSummoner } from '../../../hooks/useSummoner'
import { ProfileStackParamList } from '../../../screens/Profile'
import ChampionMasteryCard from '../../items/ChampionMastery'
import Card from '../../ui/card'
import Title from '../../ui/title'
import { useLeagueStats } from '../../../hooks/useLeagueStats'

type profileScreenProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'profileDefault'
>

const MasteriesCard: React.FC = () => {
  const navigation = useNavigation<profileScreenProp>()

  const { leaguestats } = useLeagueStats()
  const { leagueRegion, summoner } = useSummoner()

  const [masteries, setMasteries] = useState<ChampionMastery[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    leaguestats
      .getSummonerChampionsMasteries(leagueRegion, summoner.puuid)
      .then((masteries) => {
        if (!masteries) return
        setMasteries(
          masteries
            .sort((x, y) => y.championLevel - x.championLevel)
            ?.slice(0, 5),
        )
      })
  }, [])

  return (
    <Card style={styles.container}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => navigation.navigate('bestChampions')}
      >
        <Title>{t('card.bestChampions.title')}</Title>

        <MaterialIcons
          name='chevron-right'
          size={28}
          color='#fff'
        />
      </TouchableOpacity>

      <View style={styles.maestries}>
        {masteries.map((mastery) => (
          <ChampionMasteryCard
            key={mastery.championId}
            mastery={mastery}
          />
        ))}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff05',
  },
  maestries: {
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 16,
    gap: 8,
  },
})

export default MasteriesCard
