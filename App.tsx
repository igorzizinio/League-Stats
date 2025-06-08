import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { SummonerProvider } from './src/hooks/useSummoner'
import { Routes } from './src/routes'

// Load i18n
import './src/i18n'
import themes from './src/themes'
import { PreferencesProvider } from './src/hooks/usePreferences'
import { useRiot } from './src/hooks/useRiot'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { riot } = useRiot()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setupCache()
  }, [riot])

  // Load static data from ddragon and set on cache
  async function setupCache() {
    await riot.ddragon.getOrFetchVersions()
    await riot.ddragon.getOrFetchChampions()

    setLoading(false)
  }

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync()
    }
  }, [loading])

  if (loading) return null

  return (
    <PreferencesProvider>
      <SummonerProvider>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: themes.dark.background }}
        >
          <Routes />
          <StatusBar style='auto' />
        </View>
      </SummonerProvider>
    </PreferencesProvider>
  )
}
