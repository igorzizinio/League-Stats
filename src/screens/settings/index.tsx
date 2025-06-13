import React, { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { SelectMenu } from '../../components/generic/SelectMenu'
import colors from '../../colors'
import { useState } from 'react'
import { usePreferences } from '../../hooks/usePreferences'

import { resources } from '../../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { languageNames } from '../../resources/strings'
import themes from '../../themes'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { primaryColor, setPrimaryColor, setRiotApiKey, setLanguage } =
    usePreferences()
  const { t } = useTranslation()

  const [colorsOpen, setColorsOpen] = useState(false)
  const [languagesOpen, setLanguagesOpen] = useState(false)

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

  const languages = Object.keys(resources).map((langValue) => {
    return {
      name:
        languageNames[langValue as keyof typeof resources] ??
        langValue.toUpperCase(),
      value: langValue,
    }
  })

  const onSelectColor = (value: string) => {
    setPrimaryColor(value)
  }

  const onSelectLanguage = (value: string) => {
    setLanguage(value)
  }

  const changeRiotApiKey = () => {
    setRiotApiKey(riotApiKey)
  }

  const resetRiotApiKey = () => {
    setRiotApiKey(undefined)
  }

  const handleOnPressDelete = async () => {
    await AsyncStorage.clear()
    alert('All data cleared! Please restart the app.')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>
          ⚠️ {t('screen.settings.customRiotApiKey')}:{' '}
        </Text>
        <TextInput
          placeholder={t('screen.settings.customRiotApiKeyPlaceholder')}
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
            <Text style={styles.text}>{t('common.confirm')}</Text>
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
          text={t('screen.settings.appColor')}
        />

        <SelectMenu
          open={languagesOpen}
          onPress={() => setLanguagesOpen((val) => !val)}
          onSelect={(item) => onSelectLanguage(item.data as string)}
          items={languages.map((lang) => ({
            key: lang.value,
            data: lang.value,
            text: lang.name,
          }))}
          text={t('screen.settings.language')}
        />
      </View>

      <TouchableOpacity
        onPress={handleOnPressDelete}
        style={[
          styles.button,
          {
            backgroundColor: colors.softRed,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <MaterialCommunityIcons
          name='trash-can-outline'
          color={themes.dark.text}
          size={32}
        />

        <Text style={styles.text}>{t('screen.settings.deleteData')}</Text>
      </TouchableOpacity>
    </View>
  )
}
