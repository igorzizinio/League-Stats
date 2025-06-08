import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useSummoner } from '../hooks/useSummoner'

import TabRoutes from './tab.routes'
import WelcomeRoutes from './welcome.routes'

export function Routes() {
  const { summoner } = useSummoner()

  return (
    <NavigationContainer>
      {!summoner ? <WelcomeRoutes /> : <TabRoutes />}
    </NavigationContainer>
  )
}
