import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import { getLocales } from 'expo-localization'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Markdown from 'react-native-markdown-display'
import type { Match } from '../../@types/riot'
import colors from '../../colors'
import ParticipantFocusDetails from '../../components/cards/ParticipantFocusDetail'
import { TeamKDA } from '../../components/generic/TeamKDA'
import MatchParticipantInfo from '../../components/items/MatchParticipantInfo'
import Card from '../../components/ui/card'
import Title from '../../components/ui/title'
import { expoToDateFnsLocale } from '../../functions/expoToDateFnsLocale'
import riotRegionFromLeague from '../../functions/riotRegionFromLeague'
import { useLeagueStats } from '../../hooks/useLeagueStats'
import { usePreferences } from '../../hooks/usePreferences'
import { useSummoner } from '../../hooks/useSummoner'
import type { HistoryStackParamList } from '../../routes/history.routes'
import { mdStyles, styles } from './styles'
import { RuneStatisticsCard } from '../../components/cards/RuneStatisticsCard'

type matchInfoScreenProp = RouteProp<HistoryStackParamList, 'matchInfo'>

export default function MatchInfo() {
  const route = useRoute<matchInfoScreenProp>()

  const { leaguestats } = useLeagueStats()
  const { language } = usePreferences()
  const { summoner, leagueRegion } = useSummoner()

  const [match, setMatch] = useState<Match>()
  const [focusedParticipantPuuid, setFocusedParticipantPuuid] =
    useState<string>(summoner?.puuid ?? '')

  const [aiCoachText, setAiCoachText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const streamContentRef = useRef<string>('')

  useEffect(() => {
    if (!leagueRegion || !summoner) return

    leaguestats
      .getMatchById(riotRegionFromLeague(leagueRegion), route.params?.matchId)
      .then((match) => setMatch(match))
  }, [leaguestats, route?.params.matchId, summoner, leagueRegion])

  const handleStreamChunk = useCallback((text: string) => {
    streamContentRef.current += text
    setAiCoachText(streamContentRef.current)
  }, [])

  const handleStreamComplete = useCallback(() => {
    setIsStreaming(false)
    setLoading(false)
  }, [])

  const handleStreamError = useCallback((error: Error) => {
    console.error('Stream error:', error)
    setIsStreaming(false)
    setLoading(false)
    setAiCoachText('Failed to analyze match. Please try again.')
  }, [])

  const analyzeMatch = async () => {
    if (!match || !summoner?.puuid || loading || !leagueRegion) return

    console.log('Analyzing match with streaming...')
    setLoading(true)
    setIsStreaming(true)
    streamContentRef.current = ''
    setAiCoachText('')

    leaguestats.analyzeMatchStream(
      riotRegionFromLeague(leagueRegion),
      match?.metadata.matchId ?? '',
      summoner.puuid,
      language,
      handleStreamChunk,
      handleStreamComplete,
      handleStreamError,
    )
  }

  const focusedParticipant = match?.info.participants.find(
    (p) => p.puuid === focusedParticipantPuuid,
  )

  const team1Won = match?.info.teams[0].win ?? true

  const [team1, team2] = useMemo(() => {
    const participants = match?.info?.participants ?? []
    const team1 = []
    const team2 = []

    for (const participant of participants) {
      if (participant.teamId == 100) {
        team1.push(participant)
      } else {
        team2.push(participant)
      }
    }

    return [team1, team2]
  }, [match])

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
        <TeamKDA
          won={team1Won}
          participants={team1}
        />

        <Text style={styles.text}>
          {(match.info.gameDuration / 60).toFixed()}mins
        </Text>

        <TeamKDA
          won={!team1Won}
          participants={team2}
        />
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          {team1.map((participant) => (
            <MatchParticipantInfo
              key={participant.puuid}
              participant={participant}
              focused={participant.puuid == focusedParticipantPuuid}
              onClick={() => setFocusedParticipantPuuid(participant.puuid)}
            />
          ))}
        </View>

        <View style={styles.team}>
          {team2.map((participant) => (
            <MatchParticipantInfo
              key={participant.puuid}
              participant={participant}
              focused={participant.puuid == focusedParticipantPuuid}
              onClick={() => setFocusedParticipantPuuid(participant.puuid)}
            />
          ))}
        </View>
      </View>

      {focusedParticipant && (
        <>
          <ParticipantFocusDetails
            participant={focusedParticipant}
            match={match}
          />
          <RuneStatisticsCard participant={focusedParticipant} />
        </>
      )}

      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Title>🤖 Coach AI</Title>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={analyzeMatch}
          disabled={loading}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {loading && (
              <ActivityIndicator
                size='small'
                color={colors.white}
              />
            )}
            <Text style={styles.text}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </Text>
          </View>
        </TouchableOpacity>

        <Card>
          <Markdown style={mdStyles}>
            {loading && !aiCoachText
              ? 'Please wait, we are analyzing your match...'
              : aiCoachText || 'Your analysis will appear here.'}
          </Markdown>
          {isStreaming && !!aiCoachText && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <ActivityIndicator
                size='small'
                color={colors.softCyan}
              />
              <Text
                style={{ color: colors.softCyan, marginLeft: 8, fontSize: 12 }}
              >
                Receiving analysis...
              </Text>
            </View>
          )}
        </Card>
      </Card>

      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.subText}>{matchDateTime}</Text>

        <Text style={styles.subText}>Match id: {match.metadata.matchId}</Text>
      </Card>
    </ScrollView>
  )
}
