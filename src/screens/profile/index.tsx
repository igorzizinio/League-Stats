import React from 'react'
import { ScrollView } from 'react-native'
import LeaguesInfoCard from '../../components/cards/LeagueInfosCard'
import MasteriesCard from '../../components/cards/MasteriesCard'
import ProfileCard from '../../components/cards/ProfileCard'

import { styles } from './styles'

export type ProfileStackParamList = {
  profileDefault: undefined
  bestChampions: undefined
}

export default function Profile() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <ProfileCard />
      <LeaguesInfoCard />
      <MasteriesCard />
    </ScrollView>
  )
}
