import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Match, MatchParticipant } from '../@types/riot'
import colors from '../colors'
import ParticipantFocusDetails from '../components/cards/ParticipantFocusDetail'
import MatchParticipantInfo from '../components/items/MatchParticipantInfo'
import Card from '../components/ui/card'
import riotRegionFromLeague from '../functions/riotRegionFromLeague'
import { useSummoner } from '../hooks/useSummoner'
import themes from '../themes'
import { useRiot } from '../hooks/useRiot'
import { HistoryStackParamList } from '../routes/history.routes'
import { expoToDateFnsLocale } from '../functions/expoToDateFnsLocale'
import { getLocales } from 'expo-localization'
import { format } from 'date-fns'

type matchInfoScreenProp = RouteProp<HistoryStackParamList, 'matchInfo'>

export default function MatchInfo() {
  const route = useRoute<matchInfoScreenProp>()

  const { riot } = useRiot()
  const { summoner, leagueRegion } = useSummoner()

  const [match, setMatch] = useState<Match>()
  const [focusedParticipantPuuid, setFocusedParticipantPuuid] =
    useState<string>(summoner?.puuid ?? '')

  const { t } = useTranslation()

  useEffect(() => {
    if (!leagueRegion || !summoner) return
    riot
      .getMatchById(route.params?.matchId, riotRegionFromLeague(leagueRegion))
      .then((match) => {
        setMatch(match)
      })
  }, [])

  const focusedParticipant =
    match?.info.participants.find((p) => p.puuid === focusedParticipantPuuid) ??
    ({} as MatchParticipant)

  const team1Won = match?.info.teams[0].win

  const team1Kda = useMemo(
    () =>
      match?.info.participants
        .filter((p) => p.teamId == 100)
        .reduce(
          (prev, curr) => {
            return {
              kills: prev.kills + curr.kills,
              deaths: prev.deaths + curr.deaths,
              assists: prev.assists + curr.assists,
            }
          },
          { kills: 0, deaths: 0, assists: 0 },
        ),
    [match],
  )

  const team2Kda = useMemo(
    () =>
      match?.info.participants
        .filter((p) => p.teamId == 200)
        .reduce(
          (prev, curr) => {
            return {
              kills: prev.kills + curr.kills,
              deaths: prev.deaths + curr.deaths,
              assists: prev.assists + curr.assists,
            }
          },
          { kills: 0, deaths: 0, assists: 0 },
        ),
    [match],
  )

  const matchDate = new Date(match?.info?.gameCreation ?? 0)

  const locale = expoToDateFnsLocale(getLocales()[0].languageTag)

  const matchDateTime = format(matchDate, 'Pp', { locale })

  if (!match) return <View style={styles.container}></View>

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text
            style={[
              styles.text,
              { color: team1Won ? colors.softCyan : colors.softRed },
            ]}
          >
            {team1Won ? t('common.victory') : t('common.defeat')}
          </Text>

          <Text style={styles.subText}>
            {team1Kda?.kills} / {team1Kda?.deaths} / {team1Kda?.assists}
          </Text>
        </View>

        <Text style={styles.text}>
          {(match.info.gameDuration / 60).toFixed()}mins
        </Text>

        <View style={styles.heading}>
          <Text
            style={[
              styles.text,
              { color: !team1Won ? colors.softCyan : colors.softRed },
            ]}
          >
            {!team1Won ? t('common.victory') : t('common.defeat')}
          </Text>

          <Text style={styles.subText}>
            {team2Kda?.kills} / {team2Kda?.deaths} / {team2Kda?.assists}
          </Text>
        </View>
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {match.info.participants
            .filter((p) => p.teamId == 100)
            .map((participant) => (
              <MatchParticipantInfo
                key={participant.puuid}
                participant={participant}
                focused={participant.puuid == focusedParticipantPuuid}
                onClick={() => setFocusedParticipantPuuid(participant.puuid)}
              />
            ))}
        </View>

        <View style={styles.team}>
          {match.info.participants
            .filter((p) => p.teamId == 200)
            .map((participant) => (
              <MatchParticipantInfo
                key={participant.puuid}
                participant={participant}
                focused={participant.puuid == focusedParticipantPuuid}
                onClick={() => setFocusedParticipantPuuid(participant.puuid)}
              />
            ))}
        </View>
      </View>

      <ParticipantFocusDetails
        participant={focusedParticipant}
        match={match}
      />

      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.subText}>{matchDateTime}</Text>

        <Text style={styles.subText}>Match id: {match.metadata.matchId}</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  team: {
    flex: 1,
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#ffffff80',
  },
})
