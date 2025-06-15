import { useMemo } from 'react'
import { LeagueStats } from '../services/league-stats'

declare const process: {
  env: {
    [key: string]: string
  }
}

const useLeagueStats = () => {
  const leaguestats = useMemo(
    () => new LeagueStats(process.env.EXPO_PUBLIC_LEAGUE_STATS_API_URL),
    [],
  )

  return { leaguestats }
}

export { useLeagueStats }
