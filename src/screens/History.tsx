import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { LeagueRegions, Match } from '../@types/riot'
import MatchInfoCard from '../components/items/MatchInfo'
import riotRegionFromLeague from '../functions/riotRegionFromLeague'
import { useSummoner } from '../hooks/useSummoner'
import useSummonerMatches from '../hooks/useSummonerMatches'
import themes from '../themes'
import { HistoryStackParamList } from '../routes/history.routes'
import { usePreferences } from '../hooks/usePreferences'

type historyScreenProp = NativeStackNavigationProp<
  HistoryStackParamList,
  'historyDefault'
>

export default function History() {
  const navigation = useNavigation<historyScreenProp>()
  const { summoner, leagueRegion } = useSummoner()
  const { matches, loading, loadMatches } = useSummonerMatches(
    summoner,
    riotRegionFromLeague(leagueRegion ?? LeagueRegions.BR1),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchList: {
    width: '100%',
    padding: 8,
  },
  matchListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
})
