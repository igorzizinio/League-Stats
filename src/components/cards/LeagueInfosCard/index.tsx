import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { LeagueEntry } from '../../../@types/riot'
import { useSummoner } from '../../../hooks/useSummoner'
import LeagueInfo from '../../items/LeagueInfo'
import Card from '../../ui/card'
import Title from '../../ui/title'
import { useRiot } from '../../../hooks/useRiot'

const LeagueInfosCard: React.FC = () => {
  const { riot } = useRiot()
  const { leagueRegion, summoner } = useSummoner()
  const { t } = useTranslation()

  const [leagues, setLeagues] = useState<LeagueEntry[]>([])

  useEffect(() => {
    if (!leagueRegion || !summoner) return
    riot.getSummonerLeague(summoner?.id, leagueRegion).then((leagues) => {
      setLeagues(leagues.filter((l) => l.queueType != 'CHERRY'))
    })
  }, [])

  if (!leagues?.length) return <></>

  return (
    <Card style={styles.container}>
      <Title>{t('card.leagueInfo.title')}</Title>

      {leagues.map((league) => (
        <LeagueInfo
          key={league.queueType}
          league={league}
        />
      ))}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
})

export default LeagueInfosCard
