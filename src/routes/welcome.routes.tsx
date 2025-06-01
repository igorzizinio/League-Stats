import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/Welcome'
import Settings from '../screens/settings'
import colors from '../colors'
import themes from '../themes'
import { useTranslation } from 'react-i18next'
//import SettingsScreen from '../screens/settings'

export type WelcomeStackParamList = {
  welcome: undefined
  settings: undefined
}

const Stack = createNativeStackNavigator<WelcomeStackParamList>()

const WelcomeRoutes: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Stack.Navigator
      initialRouteName='welcome'
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: themes.dark.background,
        },
      }}
    >
      <Stack.Screen
        name='welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='settings'
        component={Settings}
        options={{ title: t('screen.settings.title') }}
      />
    </Stack.Navigator>
  )
}

export default WelcomeRoutes
