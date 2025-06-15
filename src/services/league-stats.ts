import {
  Account,
  LeagueEntry,
  LeagueRegion,
  Match,
  RiotRegion,
} from '../@types/riot'
import ChampionMastery from '../entities/ChampionMastery'
import Summoner from '../entities/Summoner'

export class LeagueStats {
  constructor(private readonly apiUrl: string) {}

  async getSummonerByRiotId(
    region: LeagueRegion,
    gameName: string,
    tagLine: string,
  ): Promise<{
    account: Account
    summoner: Summoner
    riotRegion: RiotRegion
    region: LeagueRegion
  }> {
    const res = await fetch(
      `${this.apiUrl}/summoner/by-riot-id/${region}/${gameName}/${tagLine}`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner: ${res.statusText}`)
    }
    const data = await res.json()
    return data as {
      account: Account
      summoner: Summoner
      riotRegion: RiotRegion
      region: LeagueRegion
    }
  }

  async getSummonerByPuuid(
    region: LeagueRegion,
    puuid: string,
  ): Promise<{
    account: Account
    summoner: Summoner
    riotRegion: RiotRegion
    region: LeagueRegion
  }> {
    const res = await fetch(
      `${this.apiUrl}/summoner/by-puuid/${region}/${puuid}`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner: ${res.statusText}`)
    }

    const data = await res.json()
    return data as {
      account: Account
      summoner: Summoner
      riotRegion: RiotRegion
      region: LeagueRegion
    }
  }

  async getSummonerLeague(
    region: LeagueRegion,
    puuid: string,
  ): Promise<LeagueEntry[]> {
    const res = await fetch(`${this.apiUrl}/summoner/league/${region}/${puuid}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner league: ${res.statusText}`)
    }

    const data = await res.json()
    return data as LeagueEntry[]
  }

  async getSummonerChampionsMasteries(
    region: LeagueRegion,
    puuid: string,
  ): Promise<ChampionMastery[]> {
    const res = await fetch(
      `${this.apiUrl}/summoner/masteries/${region}/${puuid}`,
    )

    if (!res.ok) {
      throw new Error(
        `Failed to fetch summoner champions masteries: ${res.statusText}`,
      )
    }

    const data = await res.json()
    return data as ChampionMastery[]
  }

  async getSummonerMatchList(
    region: RiotRegion,
    puuid: string,
    options: Record<string, unknown> = {},
  ) {
    const params = new URLSearchParams()

    for (const option in options) {
      const value = options[option]

      if (!value) continue

      params.append(option, value.toString())
    }

    const res = await fetch(
      `${this.apiUrl}/matchlist/${region}/${puuid}?${params.toString()}`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner match list: ${res.statusText}`)
    }

    const data = await res.json()
    return data as string[]
  }

  async getMatchById(riotRegion: RiotRegion, matchId: string): Promise<Match> {
    const res = await fetch(`${this.apiUrl}/match/${riotRegion}/${matchId}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch match: ${res.statusText}`)
    }

    const data = await res.json()
    return data as Match
  }

  async getFreeChamopionRotation(
    leagueRegion: LeagueRegion,
  ): Promise<string[]> {
    const res = await fetch(`${this.apiUrl}/champion-rotation/${leagueRegion}`)

    if (!res.ok) {
      throw new Error('Failed to fetch champion rotation')
    }

    const data = await res.json()

    return data.freeChampionIds as string[]
  }

  async analyzeMatch(
    riotRegion: RiotRegion,
    matchId: string,
    participantPuuid: string,
    locale = 'en-US',
  ) {
    const url = `${this.apiUrl}/match/${riotRegion}/${matchId}/analyze/${participantPuuid}?locale=${locale}`
    console.log(`Analyzing match at URL: ${url}`)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to analyze match: ${res.statusText}`)
    }

    const data = await res.json()
    return data
  }
}
