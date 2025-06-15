import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import History from '../screens/history'
import themes from '../themes'
import MatchInfo from '../screens/match-info'

export type HistoryStackParamList = {
  historyDefault: undefined
  matchInfo: {
    matchId: string
  }
}

const Stack = createNativeStackNavigator<HistoryStackParamList>()

export default function HistoryRoutes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='historyDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='historyDefault'
          component={History}
        />

        <Stack.Screen
          name='matchInfo'
          component={MatchInfo}
        />
      </Stack.Navigator>
    </View>
  )
}
