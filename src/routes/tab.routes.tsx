import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import colors from '../colors'
import { useSummoner } from '../hooks/useSummoner'
import themes from '../themes'
import ProfileRoutes from './profile.routes'
import HistoryRoutes from './history.routes'
import HomeRoutes from './home.routes'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
  const { resetSummoner } = useSummoner()

  const { t } = useTranslation()

  function exitSummoner() {
    resetSummoner()
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: themes.dark.background,
        },
        tabBarStyle: {
          backgroundColor: themes.dark.background,
          height: 56,
        },
        tabBarLabelStyle: {
          paddingBottom: 6,
        },
        tabBarActiveTintColor: themes.dark.primary,
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            onPress={exitSummoner}
            style={{ padding: 16 }}
          >
            <MaterialIcons
              color={tintColor}
              size={24}
              name='logout'
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeRoutes}
        options={{
          title: t('screen.home.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='home'
                size={size}
                color={color}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name='History'
        component={HistoryRoutes}
        options={{
          title: t('screen.history.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='history'
                size={size}
                color={color}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileRoutes}
        options={{
          title: t('screen.profile.title'),
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='person'
                size={size}
                color={color}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
