import React from 'react'
import { Image, StyleSheet } from 'react-native'
import ddragon from '../../../services/ddragon'

type Props = {
  iconId?: number
}

const SummonerIcon: React.FC<Props> = ({ iconId = 0 }) => {
  const uri = ddragon.getIcon(iconId)

  return (
    <Image
      source={{
        uri,
      }}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
  },
})

export default SummonerIcon
