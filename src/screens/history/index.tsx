import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { LeagueRegions, Match } from '../../@types/riot'
import MatchInfoCard from '../../components/items/MatchInfo'
import riotRegionFromLeague from '../../functions/riotRegionFromLeague'
import { useSummoner } from '../../hooks/useSummoner'
import useSummonerMatches from '../../hooks/useSummonerMatches'
import { HistoryStackParamList } from '../../routes/history.routes'
import { usePreferences } from '../../hooks/usePreferences'
import { styles } from './styles'

type historyScreenProp = NativeStackNavigationProp<
  HistoryStackParamList,
  'historyDefault'
>

export default function History() {
  const navigation = useNavigation<historyScreenProp>()
  const { summoner, leagueRegion } = useSummoner()
  const { matches, loading, loadMatches } = useSummonerMatches(
    summoner,
    riotRegionFromLeague(leagueRegion ?? LeagueRegions.NA1),
  )

  const { primaryColor } = usePreferences()

  const handleOnClickMatch = useCallback((match: Match) => {
    navigation.navigate('matchInfo', {
      matchId: match.metadata.matchId,
    })
  }, [])

  const handleOnEndReached = async () => {
    await loadMatches()
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.matchList}
        contentContainerStyle={styles.matchListContainer}
        keyExtractor={(item) => item.metadata.matchId}
        data={matches}
        renderItem={({ item }: { item: Match }) => (
          <MatchInfoCard
            match={item}
            onClick={handleOnClickMatch}
          />
        )}
        onEndReached={handleOnEndReached}
        ListFooterComponent={
          <View style={{ height: 32 }}>
            {loading ? (
              <ActivityIndicator
                size={32}
                color={primaryColor}
              />
            ) : null}
          </View>
        }
      />
    </View>
  )
}
