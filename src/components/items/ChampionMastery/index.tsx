import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../colors'
import ChampionMastery from '../../../entities/ChampionMastery'

import { getLocales } from 'expo-localization'

import { ChampionData } from '../../../@types/riot'
import riot from '../../../services/riot'
import Card from '../../ui/card'

type Props = {
  mastery: ChampionMastery
}

const ChampionMasteryCard: React.FC<Props> = ({ mastery }) => {
  const [champion, setChampion] = useState<ChampionData>({} as ChampionData)
  const [locale] = getLocales()

  useEffect(() => {
    findChampion()
  }, [])

  const findChampion = async () => {
    const champions = await riot.ddragon.getOrFetchChampions()
    const values = Object.values(champions)
    setChampion(
      values.find(
        (champ) => champ.key == String(mastery.championId),
      ) as ChampionData,
    )
  }

  const masteryLevel = mastery.championLevel >= 10 ? 10 : mastery.championLevel

  return (
    <Card style={styles.container}>
      <View style={styles.basicInfo}>
        <Image
          style={styles.championIcon}
          source={{
            uri: riot.ddragon.getChampionIcon(champion.id),
          }}
        />

        <View>
          <Text style={styles.name}>{champion.name}</Text>
          <Text style={styles.subText}>
            {mastery.championPoints
              .toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                locale.digitGroupingSeparator ?? '',
              )}{' '}
            pontos
          </Text>
        </View>
      </View>

      <View style={styles.masteryPoints}>
        <Image
          style={{ width: 96, height: 96, margin: -8 }}
          source={{
            uri:
              mastery.championLevel < 4
                ? `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level_0_art.png`
                : `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level_${masteryLevel}_art.png`,
          }}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#ffffff60',
    paddingHorizontal: 12,
  },
  championIcon: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  basicInfo: {
    flexDirection: 'row',
  },
  masteryPoints: {
    alignItems: 'center',
  },
})

export default ChampionMasteryCard
