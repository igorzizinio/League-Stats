import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { leagueFromString } from '../../@types/riot'
import { SelectMenu } from '../../components/generic/SelectMenu'
import { SummonerInfo, useSummoner } from '../../hooks/useSummoner'
import themes from '../../themes'
import { useTranslation } from 'react-i18next'
import getRiotIdFromString from '../../functions/ritoIdFromString'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { WelcomeStackParamList } from '../../routes/welcome.routes'
import { useNavigation } from '@react-navigation/native'
import { usePreferences } from '../../hooks/usePreferences'
import { useLeagueStats } from '../../hooks/useLeagueStats'

import { styles } from './styles'

type welcomeScreenProp = NativeStackNavigationProp<
  WelcomeStackParamList,
  'welcome'
>

export default function Welcome() {
  const { primaryColor } = usePreferences()

  const { leaguestats } = useLeagueStats()
  const { savedSummoners, addSummoner, getSummoner } = useSummoner()

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

      const { account, summoner } = await leaguestats.getSummonerByRiotId(
        leagueRegion,
        riotId.name,
        riotId.tag,
      )

      if (!account || !summoner) {
        return
      }

      ToastAndroid.show(
        `Found summoner with name ${summoner.name}!`,
        ToastAndroid.SHORT,
      )

      getSummoner(leagueRegion, summoner.puuid)
      addSummoner(
        leagueRegion,
        summoner.puuid,
        `${account.gameName}#${account.tagLine}`,
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themes.dark.background,
        paddingVertical: 32,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
              cursorColor={primaryColor}
              selectionColor={primaryColor}
              selectionHandleColor={primaryColor}
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
              cursorColor={primaryColor}
              selectionColor={primaryColor}
              selectionHandleColor={primaryColor}
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
      </ScrollView>

      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          padding: 12,
          backgroundColor: primaryColor,
          borderRadius: 12,
          margin: 16,
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('settings')}
      >
        <MaterialIcons
          name='settings'
          size={32}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  )
}
