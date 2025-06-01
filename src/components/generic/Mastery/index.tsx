import React from 'react'
import { View, Image } from 'react-native'
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
        width={96}
        height={96}
        source={{
          uri:
            mastery.championLevel < 4
              ? `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level0.cm_updates.png`
              : `https://raw.communitydragon.org/latest/game/assets/ux/mastery/legendarychampionmastery/masterycrest_level${masteryLevel}.cm_updates.png`,
        }}
      />
    </View>
  )
}

export { Mastery }
