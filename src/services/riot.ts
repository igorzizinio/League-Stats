import axios, { AxiosResponse } from 'axios'

import {
  Account,
  LeagueEntry,
  LeagueRegion,
  Match,
  RiotRegion,
} from '../@types/riot'
import ChampionMastery from '../entities/ChampionMastery'
import Summoner from '../entities/Summoner'
import ddragonApi from './ddragon'

interface GetMatchesOptions {
  startTime?: number
  endTime?: number
  queue?: number
  type?: string
  start?: number
  count?: number
}

// TODO: type all
interface RequestOptions {
  url?: string
  leagueRegion?: LeagueRegion
  riotRegion?: RiotRegion
}

export class Riot {
  ddragon = ddragonApi

  constructor(private apiKey: string) {}

  async getAccountByPuuid(puuid: string, region: RiotRegion) {
    const res = await this.request<Account>({
      url: `/riot/account/v1/accounts/by-puuid/${puuid}`,
      riotRegion: region,
    })

    return res.data
  }

  async getAccountByRiotId(tag: string, name: string, region: RiotRegion) {
    const res = await this.request<Account>({
      url: `/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      riotRegion: region,
    })

    return res.data
  }

  async getSummonerByPuuId(puuid: string, region: LeagueRegion) {
    const res = await this.request<Summoner>({
      url: `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      leagueRegion: region,
    })

    return new Summoner(res.data)
  }

  async getSummonerByName(name: string, region: LeagueRegion) {
    const res = await this.request<Summoner>({
      url: `/lol/summoner/v4/summoners/by-name/${name}`,
      leagueRegion: region,
    })

    return new Summoner(res.data)
  }

  async getSummonerLeague(summonerId: string, region: LeagueRegion) {
    const res = await this.request<LeagueEntry[]>({
      url: `/lol/league/v4/entries/by-summoner/${summonerId}`,
      leagueRegion: region,
    })

    return res.data
  }

  async getSummonerChampionsMasteries(puuid: string, region: LeagueRegion) {
    const res = await this.request<ChampionMastery[]>({
      url: `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
      leagueRegion: region,
    })

    if (Array.isArray(res.data)) {
      const masteries = res.data.map((m) => new ChampionMastery(m))
      return masteries
    }
  }

  async getFreeChampionsIdRotation(region: LeagueRegion): Promise<number[]> {
    const res = await this.request<{ freeChampionIds: number[] }>({
      url: `/lol/platform/v3/champion-rotations`,
      leagueRegion: region,
    })
    return res.data.freeChampionIds
  }

  async getMatchesByPuuid(
    puuid: string,
    options: GetMatchesOptions = {},
    riotRegion: RiotRegion,
  ): Promise<string[]> {
    const params = new URLSearchParams()

    for (const option in options) {
      const value = options[option as keyof GetMatchesOptions]

      if (!value) continue

      params.append(option, value.toString())
    }

    const res = await this.request<string[]>({
      url: `/lol/match/v5/matches/by-puuid/${puuid}/ids?${params.toString()}`,
      riotRegion,
    })

    return res.data
  }

  async getMatchById(matchId: string, riotRegion: RiotRegion) {
    const res = await this.request<Match>({
      url: `/lol/match/v5/matches/${matchId}`,
      riotRegion,
    })

    return res.data
  }

  async request<T = unknown>(
    options: RequestOptions,
  ): Promise<AxiosResponse<T>> {
    const _options: RequestOptions = {
      riotRegion: 'americas',
    }

    Object.assign(_options, options)

    console.log(
      `[Riot Network] GET https://${
        _options.leagueRegion ?? _options.riotRegion
      }.api.riotgames.com` + _options.url,
    )

    const res = await axios.request<T>({
      url:
        `https://${
          _options.leagueRegion ?? _options.riotRegion
        }.api.riotgames.com` + _options.url,
      headers: {
        'X-Riot-Token': this.apiKey,
        'User-Agent': 'LeagueStats',
      },
    })

    return res
  }
}
