import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

import themes from '../themes'
import Champions from '../screens/Champions'

const Stack = createNativeStackNavigator()

export default function ChampionsRoutes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='championsDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='championsDefault'
          component={Champions}
        />
      </Stack.Navigator>
    </View>
  )
}
