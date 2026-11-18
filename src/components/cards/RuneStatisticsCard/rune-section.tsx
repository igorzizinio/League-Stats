import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export function RuneSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}
