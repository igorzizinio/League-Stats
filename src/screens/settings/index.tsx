import React, { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { SelectMenu } from '../../components/generic/SelectMenu'
import colors from '../../colors'
import { useState } from 'react'
import { usePreferences } from '../../hooks/usePreferences'

export default function Settings() {
  const { primaryColor, setPrimaryColor, setRiotApiKey } = usePreferences()

  const [colorsOpen, setColorsOpen] = useState(false)

  const [riotApiKey, setCustomRiotApiKey] = useState('')

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

  const changeRiotApiKey = () => {
    setRiotApiKey(riotApiKey)
  }

  const resetRiotApiKey = () => {
    setRiotApiKey(undefined)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>⚠️ Custom Riot Api Key: </Text>
        <TextInput
          placeholder='Your key here'
          placeholderTextColor='#ffffff80'
          style={styles.input}
          onChangeText={(text) => setCustomRiotApiKey(text)}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.softRed, width: '25%' },
            ]}
            onPress={resetRiotApiKey}
          >
            <Text style={styles.text}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: primaryColor, flexGrow: 1 },
            ]}
            onPress={changeRiotApiKey}
          >
            <Text style={styles.text}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <SelectMenu
          open={colorsOpen}
          onPress={() => setColorsOpen((val) => !val)}
          onSelect={(item) => onSelectColor(item.data as string)}
          items={items.map((c) => ({
            key: c.value,
            data: c.value,
            text: c.name,
          }))}
          text='App Color'
        />
      </View>
    </View>
  )
}
