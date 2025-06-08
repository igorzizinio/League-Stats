import React, { memo, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatDistanceToNow } from 'date-fns'
import { Match } from '../../../@types/riot'
import colors from '../../../colors'
import { useSummoner } from '../../../hooks/useSummoner'

import getCombatScore from '../../../functions/combatScore'
import SimpleKDA from '../../generic/SimpleKDA'

import { useTranslation } from 'react-i18next'
import queues from '../../../common/queues'
import runes from '../../../runes.json'
import spells from '../../../spells.json'
import VictoryDefeatIcon from '../../generic/VictoryDefeatIcon'
import { useRiot } from '../../../hooks/useRiot'
import { getLocales } from 'expo-localization'
import { expoToDateFnsLocale } from '../../../functions/expoToDateFnsLocale'

type Props = {
  match: Match
  // eslint-disable-next-line no-unused-vars
  onClick: (match: Match) => unknown
}

const MatchInfoCard: React.FC<Props> = ({ match, onClick }) => {
  const { riot } = useRiot()
  const { summoner } = useSummoner()

  const { t } = useTranslation()

  const me = match.info.participants.find((p) => p.puuid == summoner?.puuid)!

  const primaryMainRune = me.perks.styles[0].selections[0].perk

  const runeIconPath =
    runes.find((rune) => rune.id == primaryMainRune)?.icon.toLowerCase() ?? ''

  const spell1 = spells.find((spell) => spell.id == me.summoner1Id)
  const spell2 = spells.find((spell) => spell.id == me.summoner2Id)

  const myTeam = match.info.teams.find((team) => team.teamId == me.teamId)

  const myTeamKills = match.info.participants
    .filter((participant) => participant.teamId == myTeam?.teamId)
    .reduce((prev, curr) => prev + curr.kills, 0)

  const combatScore = getCombatScore(me.kills, me.assists, myTeamKills)

  const handleOnClick = useCallback(() => {
    onClick(match)
  }, [])

  const queue = queues.find((q) => q.queueId == match.info.queueId)?.key

  const queueName = t(`league.queue.${queue}`, {
    defaultValue: match.info.gameMode,
  }) as string

  const timeAgo = formatDistanceToNow(new Date(match.info.gameCreation), {
    addSuffix: true,
    locale: expoToDateFnsLocale(getLocales()[0].languageTag),
  })

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnClick}
    >
      <View
        style={[
          styles.leftBar,
          { backgroundColor: me.win ? colors.softCyan : colors.softRed },
        ]}
      />

      <View style={styles.basicInfo}>
        <Image
          style={{
            width: 72,
            height: 72,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            marginRight: 12,
          }}
          source={{
            uri: riot.ddragon.getChampionIcon(me.championName),
          }}
        />

        {!runeIconPath && !spell1 && !spell2 ? (
          <></>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 24, height: 24, borderBottomLeftRadius: 12 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${runeIconPath}`,
              }}
            />

            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell1?.iconPath.toLowerCase()}`,
              }}
            />

            <Image
              style={{ width: 24, height: 24, borderBottomRightRadius: 12 }}
              source={{
                uri: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/${spell2?.iconPath.toLowerCase()}`,
              }}
            />
          </View>
        )}
      </View>

      <View style={{ alignItems: 'center' }}>
        <VictoryDefeatIcon win={me.win} />

        <Text
          style={[
            styles.subText,
            { fontWeight: '500', maxWidth: 96, textAlign: 'center' },
          ]}
        >
          {queueName}
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <SimpleKDA
          kills={me.kills}
          deaths={me.deaths}
          assists={me.assists}
        />

        <Text style={styles.subText}>
          {isNaN(combatScore) ? 0 : combatScore.toFixed(1)}%{' '}
          {t('league.killParticipation')}
        </Text>
        <Text style={styles.subText}>
          {me.totalMinionsKilled + me.neutralMinionsKilled} CS
        </Text>

        <Text style={styles.subText}>
          {(match.info.gameDuration / 60).toFixed()} min • {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#ffffff05',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftBar: {
    left: 0,
    height: '95%',
    width: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
  },
  name: {
    padding: 4,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#ffffff60',
  },
  championIcon: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  basicInfo: {
    flexDirection: 'column',
  },
  masteryPoints: {
    alignItems: 'center',
  },
})

export default memo(MatchInfoCard)
