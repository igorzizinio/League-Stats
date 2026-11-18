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
  private matchCache = new Map<string, Match>()

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
    const data = this.matchCache.get(matchId)
    if (!data) {
      const match = await this.fetchMatchById(riotRegion, matchId)
      this.matchCache.set(matchId, match)
      return match
    } else {
      return data
    }
  }

  async fetchMatchById(
    riotRegion: RiotRegion,
    matchId: string,
  ): Promise<Match> {
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

    return data.sr as string[]
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

  /**
   * Streams AI Coach analysis for a match using SSE (Server-Sent Events)
   * Uses XMLHttpRequest for React Native compatibility
   */
  analyzeMatchStream(
    riotRegion: RiotRegion,
    matchId: string,
    participantPuuid: string,
    locale = 'en-US',
    onChunk: (text: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void,
  ): { abort: () => void } {
    const url = `${this.apiUrl}/match/${riotRegion}/${matchId}/analyze/${participantPuuid}/stream?locale=${locale}`
    console.log(`Streaming match analysis at URL: ${url}`)

    const xhr = new XMLHttpRequest()
    let lastIndex = 0

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'text/event-stream')

    xhr.onprogress = () => {
      const newData = xhr.responseText.substring(lastIndex)
      lastIndex = xhr.responseText.length

      if (newData) {
        this.processSSEData(newData, onChunk)
      }
    }

    xhr.onload = () => {
      // Process any remaining data
      const remainingData = xhr.responseText.substring(lastIndex)
      if (remainingData) {
        this.processSSEData(remainingData, onChunk)
      }
      onComplete()
    }

    xhr.onerror = () => {
      onError(new Error(`Request failed with status: ${xhr.status}`))
    }

    xhr.ontimeout = () => {
      onError(new Error('Request timed out'))
    }

    xhr.send()

    return {
      abort: () => xhr.abort(),
    }
  }

  /**
   * Processes SSE data and extracts content chunks
   */
  private processSSEData(data: string, onChunk: (text: string) => void): void {
    const lines = data.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const jsonStr = line.slice(6)
        if (jsonStr === '[DONE]') continue

        try {
          const parsed = JSON.parse(jsonStr)
          const content =
            parsed.content ?? parsed.text ?? parsed.delta?.content ?? null
          if (content) {
            onChunk(content)
          }
        } catch {
          // If not valid JSON, use as plain text
          if (jsonStr.trim()) {
            onChunk(jsonStr)
          }
        }
      }
    }
  }
}
