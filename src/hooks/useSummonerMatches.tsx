import { useState } from 'react'
import { Match, RiotRegion } from '../@types/riot'
import Summoner from '../entities/Summoner'
import { useLeagueStats } from './useLeagueStats'

export const MATCH_LOAD_COUNT = 10

export default function useSummonerMatches(
  summoner?: Summoner,
  region?: RiotRegion,
) {
  const { leaguestats } = useLeagueStats()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)

  const loadMatches = async (force: boolean = false) => {
    if (loading && !force) return

    setLoading(true)

    try {
      if (!summoner || !region) {
        throw Error('Summoner or region is not available or null')
      }

      const ids = await leaguestats.getSummonerMatchList(
        region,
        summoner.puuid,
        {
          count: MATCH_LOAD_COUNT,
          start: matches.length,
        },
      )

      await Promise.all(
        ids.map(async (id) => await leaguestats.getMatchById(region, id)),
      ).then((matches) => {
        setMatches((prev) => [...prev, ...matches])
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loadMatches,
    matches,
    loading,
  }
}
