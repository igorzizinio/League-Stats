import React from 'react'
import { View, Text, Image } from 'react-native'
import ChampionMastery from '../../../entities/ChampionMastery'
import styles from './styles'

type Props = {
  mastery: ChampionMastery
}

const Mastery: React.FC<Props> = ({ mastery }) => {
  const masteryLevel = mastery.championLevel >= 10 ? 10 : mastery.championLevel

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        width={76}
        height={76}
        source={{
          uri:
            mastery.championLevel < 4
              ? `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level_0_art.png`
              : `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level_${masteryLevel}_art.png`,
        }}
      />

      {10 > mastery.championLevel ? null : (
        <>
          <Text style={styles.text}>{mastery.championLevel}</Text>
        </>
      )}
    </View>
  )
}

export { Mastery }
