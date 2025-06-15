import React from 'react'
import { ScrollView } from 'react-native'
import FreeChampionsRotation from '../../components/cards/FreeChampionsRotation'

import { styles } from './styles'

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FreeChampionsRotation />
    </ScrollView>
  )
}
