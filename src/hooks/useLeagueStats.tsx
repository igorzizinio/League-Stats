import { LeagueStats } from '../services/league-stats'
import { usePreferences } from './usePreferences'

declare const process: {
  env: {
    [key: string]: string
  }
}

let instance: LeagueStats | null = null
let lastUrl: string | null = null

export function getLeagueStats(apiUrl: string): LeagueStats {
  if (!instance || lastUrl !== apiUrl) {
    instance = new LeagueStats(apiUrl)
    lastUrl = apiUrl
  }
  return instance
}

const useLeagueStats = () => {
  const { apiUrl } = usePreferences()
  const leaguestats = getLeagueStats(
    apiUrl ?? process.env.EXPO_PUBLIC_LEAGUE_STATS_API_URL!,
  )
  return { leaguestats }
}

export { useLeagueStats }
