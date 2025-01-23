import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'
import themes from '../themes'

import Profile from '../screens/Profile'
import BestChampions from '../screens/BestChampions'

const Stack = createNativeStackNavigator()

export default function ProfileRoutes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='profileDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='profileDefault'
          component={Profile}
        />

        <Stack.Screen
          name='bestChampions'
          component={BestChampions}
        />
      </Stack.Navigator>
    </View>
  )
}
