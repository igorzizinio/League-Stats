import { useState } from 'react'
import { Match, RiotRegion } from '../@types/riot'
import Summoner from '../entities/Summoner'
import riot from '../services/riot'

export const MATCH_LOAD_COUNT = 10

export default function useSummonerMatches(
  summoner?: Summoner,
  region?: RiotRegion,
) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)

  const loadMatches = async (force: boolean = false) => {
    if (loading && !force) return

    setLoading(true)

    try {
      if (!summoner || !region) {
        throw Error('Summoner or region is not available or null')
      }

      const ids = await riot.getMatchesByPuuid(
        summoner.puuid,
        {
          count: MATCH_LOAD_COUNT,
          start: matches.length,
        },
        region,
      )

      await Promise.all(
        ids.map(async (id) => await riot.getMatchById(id, region)),
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
