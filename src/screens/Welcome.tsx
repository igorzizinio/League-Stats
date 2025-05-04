import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { leagueFromString } from '../@types/riot'
import { SelectMenu } from '../components/generic/SelectMenu'
import riotRegionFromLeague from '../functions/riotRegionFromLeague'
import { SummonerInfo, useSummoner } from '../hooks/useSummoner'
import riot from '../services/riot'
import themes from '../themes'

import { useTranslation } from 'react-i18next'
import getRiotIdFromString from '../functions/ritoIdFromString'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WelcomeStackParamList } from '../routes/welcome.routes'
import { useNavigation } from '@react-navigation/native'
import { usePreferences } from '../hooks/usePreferences'

type welcomeScreenProp = NativeStackNavigationProp<
  WelcomeStackParamList,
  'welcome'
>

export default function Welcome() {
  const { primaryColor } = usePreferences()

  const { savedSummoners, resetSummoner, addSummoner, getSummoner } =
    useSummoner()

  const navigation = useNavigation<welcomeScreenProp>()

  const [typingName, setTypingName] = useState('')
  const [typingRegion, setTypingRegion] = useState('BR1')

  const [loading, setLoading] = useState(false)

  const [selectOpen, setSelectOpen] = useState(true)

  const { t } = useTranslation()

  async function handleOnSearchSummonerPress() {
    if (loading) return
    setLoading(true)

    ToastAndroid.show(`Searching for ${typingName}...`, ToastAndroid.SHORT)
    try {
      const riotId = getRiotIdFromString(typingName)

      if (!riotId.tag || !riotId.tag.length) {
        riotId.tag = typingRegion.toLowerCase()
      }

      const leagueRegion = leagueFromString(typingRegion.toUpperCase())
      const riotAccount = await riot.getAccountByRiotId(
        riotId.tag,
        riotId.name,
        riotRegionFromLeague(leagueRegion),
      )

      const summoner = await riot.getSummonerByPuuId(
        riotAccount.puuid,
        leagueRegion,
      )

      ToastAndroid.show(
        `Found summoner with name ${summoner.name}!`,
        ToastAndroid.SHORT,
      )

      getSummoner(leagueRegion, summoner.puuid)
      addSummoner(
        leagueRegion,
        summoner.puuid,
        `${riotAccount.gameName}#${riotAccount.tagLine}`,
      )
    } catch (e) {
      alert(
        'Não foi possivel recuperar a conta, certifique-se que digitou corretamente',
      )
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectSummoner(data: SummonerInfo) {
    if (loading) return
    setLoading(true)

    try {
      getSummoner(leagueFromString(data.leagueRegion.toUpperCase()), data.puuid)
    } catch (e) {
      alert('Não foi possivel recuperar a conta')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleOnPressDelete() {
    await resetSummoner()
    await AsyncStorage.clear()
    alert(
      '[Dev] All data deleted, you should completely exit and reopen the app now! :)',
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <Text style={styles.text}>Config.</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>{t('screen.welcome.welcome')}</Text>
        <Text style={styles.subTitle}>{t('screen.welcome.subText')}</Text>
      </View>

      <View>
        <View style={styles.inputsContainer}>
          <TextInput
            value={typingRegion}
            placeholder={t('screen.welcome.input.region')}
            placeholderTextColor='#ffffff45'
            onChangeText={(text) => setTypingRegion(text)}
            style={[
              styles.textInput,
              {
                width: '30%',
                borderRightWidth: 1,
                borderColor: '#ffffff50',
              },
            ]}
          />

          <TextInput
            value={typingName}
            placeholder={t('screen.welcome.input.riotID')}
            placeholderTextColor='#ffffff45'
            onChangeText={(text) => setTypingName(text)}
            style={styles.textInput}
          />
        </View>
        <SelectMenu
          open={selectOpen}
          onPress={() => setSelectOpen((val) => !val)}
          text={t('screen.welcome.recentSummoners')}
          styles={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onSelect={(item) => handleSelectSummoner(item.data as SummonerInfo)}
          items={savedSummoners.map((x) => ({
            text: x.name ?? t('common.unknownSummoner'),
            key: x.puuid,
            data: {
              name: x.name,
              leagueRegion: x.leagueRegion,
              puuid: x.puuid,
            },
          }))}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={handleOnSearchSummonerPress}
          style={[styles.button, { backgroundColor: primaryColor }]}
        >
          <Text style={styles.text}>{t('screen.welcome.continue')}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={handleOnPressDelete}>
          <MaterialCommunityIcons
            name='trash-can-outline'
            color={themes.dark.text}
            size={32}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.background,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subTitle: {
    color: '#ffffff60',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputsContainer: {
    backgroundColor: '#ffffff10',
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#ffffff50',
    borderBottomWidth: 1,
    width: '75%',
  },
  textInput: {
    color: '#ffffff70',
    padding: 12,
    fontSize: 18,
    width: '75%',
  },
  button: {
    backgroundColor: '#ffffff10',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: themes.dark.primary,
  },
})
