import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import themes from '../themes'
import riot from '../services/riot'
import { ChampionData } from '../@types/riot'

export default function Champions() {
  const [champions, setChampions] = useState<ChampionData[]>([])

  useEffect(() => {
    riot.ddragon.getOrFetchChampions().then((data) => {
      const values = Object.values(data)
      setChampions(values)
    })
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {champions.map((champ) => (
        <TouchableOpacity
          style={styles.card}
          key={champ.key}
        >
          <Text>{champ.name}</Text>
        </TouchableOpacity>
      ))}
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
    gap: 8,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: themes.dark.surface,
  },
})
