import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, View } from 'react-native'
import {
  DDragonChampionsRaw,
  Match,
  MatchParticipant,
} from '../../../@types/riot'
import colors from '../../../colors'
import SimpleKDA from '../../generic/SimpleKDA'
import ParticipantItems from '../../items/ParticipantItems'
import Card from '../../ui/card'
import styles from './styles'
import Title from '../../ui/title'
import { useRiot } from '../../../hooks/useRiot'

type Props = {
  participant: MatchParticipant
  match: Match
}

const ParticipantFocusDetails: React.FC<Props> = ({ participant, match }) => {
  const [championsData, setChampionsData] = useState<DDragonChampionsRaw>({})
  const champion = championsData[participant.championName] ?? {}

  const { riot } = useRiot()
  const { t } = useTranslation()

  useEffect(() => {
    getChampionsData()
  }, [])

  async function getChampionsData() {
    const data = await riot.ddragon.getOrFetchChampions()
    setChampionsData(data)
  }

  const csScore =
    participant.totalMinionsKilled + participant.neutralMinionsKilled

  const csPerMin = csScore / (match.info.gameDuration / 60)

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 72, height: 72 }}
          source={{
            uri: riot.ddragon.getChampionIcon(champion.id),
          }}
        />

        <View style={styles.column}>
          <Title>{participant.championName}</Title>
        </View>

        <View style={styles.column}>
          <SimpleKDA
            kills={participant.kills}
            assists={participant.assists}
            deaths={participant.deaths}
          />

          <Text style={styles.text}>
            {csScore}CS{' '}
            <Text style={styles.subText}>({csPerMin.toFixed(1)}/min)</Text>
          </Text>
        </View>

        <View style={styles.column}>
          <Image
            style={{ width: 48, height: 48 }}
            source={{
              uri: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${participant.teamPosition?.toLowerCase()}.png`,
            }}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <View
            style={[
              styles.column,
              {
                backgroundColor: '#ffffff05',
                padding: 12,
                borderRadius: 12,
                gap: 4,
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                gap: 4,
              }}
            >
              <Image
                style={{ width: 9, height: 16 }}
                source={{
                  uri: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/icon_gold.png',
                }}
              />
              <Text style={styles.text}>{participant.goldEarned}</Text>
            </View>
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

          <View
            style={[
              styles.column,
              {
                backgroundColor: '#ffffff05',
                padding: 12,
                borderRadius: 12,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 4,
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: 'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsadaptiveforceicon.png',
                }}
              />
              <Text style={styles.text}>
                Dano a campeões: {participant.totalDamageDealtToChampions}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: 'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png',
                }}
              />
              <Text style={styles.subText}>
                <Text style={[styles.subText, { color: colors.softOrange }]}>
                  {participant.physicalDamageDealtToChampions}{' '}
                </Text>
                {t('league.physicalDamage')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: 'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png',
                }}
              />
              <Text style={styles.subText}>
                <Text style={[styles.subText, { color: colors.softBlue }]}>
                  {participant.magicDamageDealtToChampions}{' '}
                </Text>
                {t('league.magicDamage')}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 22, height: 22 }}
                source={{
                  uri: 'https://raw.communitydragon.org/latest/game/assets/shared/particles/armor_pen.png',
                }}
              />
              <Text style={styles.subText}>
                <Text style={[styles.subText, { color: colors.white }]}>
                  {participant.trueDamageDealtToChampions}{' '}
                </Text>
                {t('league.trueDamage')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  )
}

export default ParticipantFocusDetails
