import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Account, MatchParticipant, RiotRegion } from '../../../@types/riot'

import SimpleKDA from '../../generic/SimpleKDA'
import ParticipantItems from '../ParticipantItems'

import colors from '../../../colors'
import runes from '../../../runes.json'
import riot from '../../../services/riot'
import spells from '../../../spells.json'
import cdragon from '../../../services/cdragon'

type Props = {
  participant: MatchParticipant
  region: RiotRegion
  focused: boolean
  onClick: () => unknown
}

const nameFilter = {
  FiddleSticks: 'Fiddlesticks',
}

const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

const MatchParticipantInfo: React.FC<Props> = ({
  participant,
  region,
  onClick,
  focused = false,
}) => {
  const [account, setAccount] = useState<Account>()

  useEffect(() => {
    riot.getAccountByPuuid(participant.puuid, region).then((acc) => {
      setAccount(acc)
    })
  }, [participant, region])

  const primaryMainRune = participant.perks.styles[0].selections[0].perk
  const runeIconPath =
    runes.find((rune) => rune.id == primaryMainRune)?.icon.toLowerCase() ?? ''

  const a = participant.summoner1Id.toString() as keyof typeof spells
  const b = participant.summoner2Id.toString() as keyof typeof spells

  const spell1 = spells.find((spell) => spell.id == a)
  const spell2 = spells.find((spell) => spell.id == b)

  const csScore =
    participant.totalMinionsKilled + participant.neutralMinionsKilled

  const totalGold = formatter.format(participant.goldEarned)

  // For some reason there are some champs that come with wrong formatting
  const nameFiltered = !nameFilter[
    participant.championName as keyof typeof nameFilter
  ]
    ? participant.championName
    : nameFilter[participant.championName as keyof typeof nameFilter]

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: focused ? '#ffffff20' : '#ffffff05',
        },
      ]}
      onPress={onClick}
    >
      <View
        style={{ flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <View style={styles.basicImageInfos}>
          <Image
            style={{
              width: 48,
              height: 48,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              marginRight: 12,
            }}
            source={{
              uri: riot.ddragon.getChampionIcon(nameFiltered),
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 16, height: 16, borderBottomLeftRadius: 12 }}
              source={{
                uri: cdragon.getCDN(
                  `plugins/rcp-be-lol-game-data/global/default/v1/${runeIconPath}`,
                ),
              }}
            />

            <View
              style={{
                backgroundColor: '#00000045',
                position: 'absolute',
                top: -12,
                left: -11,
                zIndex: 1,
                width: 22,
                height: 22,
                borderRadius: 11,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 11, color: '#fff' }}>
                {participant.champLevel}
              </Text>
            </View>

            <Image
              style={{ width: 16, height: 16 }}
              source={{
                uri: cdragon.getCDN(
                  `plugins/rcp-be-lol-game-data/global/default/data/${spell1?.iconPath.toLowerCase()}`,
                ),
              }}
            />

            <Image
              style={{ width: 16, height: 16, borderBottomRightRadius: 12 }}
              source={{
                uri: cdragon.getCDN(
                  `plugins/rcp-be-lol-game-data/global/default/data/${spell2?.iconPath.toLowerCase()}`,
                ),
              }}
            />
          </View>
        </View>

        <Text style={styles.text}>{totalGold} ouro</Text>
        <Text style={styles.text}>{csScore} CS</Text>
        <Text style={styles.text}>{participant.visionScore} vis.</Text>
      </View>

      <View style={styles.basicPlayerInfo}>
        <Text style={styles.name}>{account?.gameName}</Text>

        <SimpleKDA
          kills={participant.kills}
          deaths={participant.deaths}
          assists={participant.assists}
          textSize={14}
          bold={false}
        />

        <ParticipantItems
          items={[
            { item: participant.item0, slot: 0 },
            { item: participant.item1, slot: 1 },
            { item: participant.item2, slot: 2 },
            { item: participant.item3, slot: 3 },
            { item: participant.item4, slot: 4 },
            { item: participant.item5, slot: 5 },
            { item: participant.item6, slot: 6 },
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'space-evenly',
  },
  basicImageInfos: {
    flexDirection: 'column',
  },
  basicPlayerInfo: {
    flexDirection: 'column',
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    color: '#ffffff60',
  },
})

export default MatchParticipantInfo
