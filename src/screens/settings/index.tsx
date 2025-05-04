import React, { View, Text } from 'react-native'
import { styles } from './styles'
import { SelectMenu } from '../../components/generic/SelectMenu'
import colors from '../../colors'
import { useState } from 'react'
import { usePreferences } from '../../hooks/usePreferences'

export default function Settings() {
  const { setPrimaryColor } = usePreferences()

  const [colorsOpen, setColorsOpen] = useState(false)

  const items = [
    { name: 'Blue', value: colors.softBlue },
    { name: 'Red', value: colors.softRed },
    { name: 'Green', value: colors.softGreen },
    { name: 'Yellow', value: colors.softYellow },
    { name: 'Purple', value: colors.softPurple },
    { name: 'Pink', value: colors.softPink },
    { name: 'Orange', value: colors.softOrange },
    { name: 'Cyan', value: colors.softCyan },
  ]

  const onSelectColor = (value: string) => {
    setPrimaryColor(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Color</Text>
        <SelectMenu
          open={colorsOpen}
          onPress={() => setColorsOpen((val) => !val)}
          onSelect={(item) => onSelectColor(item.data as string)}
          items={items.map((c) => ({
            key: c.value,
            data: c.value,
            text: c.name,
          }))}
          text='Seleciona uma cor'
        />
      </View>
    </View>
  )
}
