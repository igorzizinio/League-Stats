import {
  Account,
  LeagueEntry,
  LeagueRegion,
  Match,
  RiotRegion,
} from '../@types/riot'
import Summoner from '../entities/Summoner'
import riotRegionFromLeague from '../functions/riotRegionFromLeague'

export class LeagueStats {
  constructor(private readonly apiUrl: string) {}

  async getSummonerByRiotId(
    gameName: string,
    tagLine: string,
  ): Promise<{
    account: Account
    summoner: Summoner
    riotRegion: RiotRegion
    region: LeagueRegion
  }> {
    const res = await fetch(
      `${this.apiUrl}/summoner/by-riot-id/${gameName}/${tagLine}`,
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

  async getSummonerByPuuid(puuid: string): Promise<Summoner> {
    const res = await fetch(`${this.apiUrl}/summoner/by-puuid/${puuid}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner: ${res.statusText}`)
    }

    const data = await res.json()
    return data
  }

  async getSummonerLeague(
    region: LeagueRegion,
    puuid: string,
  ): Promise<unknown> {
    const res = await fetch(`${this.apiUrl}/summoner/league/${region}/${puuid}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch summoner league: ${res.statusText}`)
    }

    const data = await res.json()
    return data as LeagueEntry[]
  }

  async getSummonerChampionsMasteries(region: LeagueRegion, puuid: string) {
    const res = await fetch(
      `${this.apiUrl}/summoner/masteries/${region}/${puuid}`,
    )

    if (!res.ok) {
      throw new Error(
        `Failed to fetch summoner champions masteries: ${res.statusText}`,
      )
    }

    const data = await res.json()
    return data
  }

  async getSummonerMatchList(
    region: LeagueRegion,
    puuid: string,
    options: Record<string, unknown> = {},
  ) {
    const res = await fetch(
      `${this.apiUrl}/summoner/match-list/${riotRegionFromLeague(
        region,
      )}/${puuid}`,
      {
        body: JSON.stringify({ ...options }),
      },
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
