import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import themes from '../themes'
import Home from '../screens/home'

const Stack = createNativeStackNavigator()

export default function HomeRoutes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.dark.background }}>
      <Stack.Navigator
        initialRouteName='homeDefault'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='homeDefault'
          component={Home}
        />
      </Stack.Navigator>
    </View>
  )
}
