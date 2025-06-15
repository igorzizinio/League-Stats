import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import colors from '../../../colors'
import ddragon from '../../../services/ddragon'

type Props = {
  items: { item: number; slot: number }[]
}

const ParticipantItems: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Image
          key={item.slot}
          style={styles.image}
          source={{
            uri: ddragon.getCDN(`img/item/${item.item}.png`),
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 78,
    gap: 2,
    margin: 2,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff05',
    borderRadius: 4,
  },
})

export default ParticipantItems
