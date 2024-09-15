import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import FreeChampionsRotation from '../components/cards/FreeChampionsRotation'
import themes from '../themes'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    padding: 8,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
