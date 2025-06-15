import { useMemo } from 'react'
import { LeagueStats } from '../services/league-stats'
import { usePreferences } from './usePreferences'

declare const process: {
  env: {
    [key: string]: string
  }
}

const useLeagueStats = () => {
  const { apiUrl } = usePreferences()

  const leaguestats = useMemo(
    () =>
      new LeagueStats(apiUrl ?? process.env.EXPO_PUBLIC_LEAGUE_STATS_API_URL),
    [apiUrl],
  )

  return { leaguestats }
}

export { useLeagueStats }
