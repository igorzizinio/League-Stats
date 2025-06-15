import { AxiosError } from 'axios'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Account, LeagueRegion } from '../@types/riot'
import Summoner from '../entities/Summoner'

import usePersistedState from './usePersistedState'
import { useLeagueStats } from './useLeagueStats'

export type SummonerInfo = {
  puuid: string
  leagueRegion: string
  name?: string
}

type SummonerContextData = {
  puuid?: string
  leagueRegion?: LeagueRegion
  summoner?: Summoner
  riotAccount?: Account
  setPuuid: React.Dispatch<React.SetStateAction<string>>
  setLeagueRegion: React.Dispatch<React.SetStateAction<LeagueRegion>>
  resetSummoner: () => Promise<void>
  getSummoner: (leagueRegion: LeagueRegion, puuid: string) => Promise<void>
  addSummoner: (
    leagueRegion: LeagueRegion,
    puuid: string,
    name?: string,
  ) => void
  savedSummoners: SummonerInfo[]
}

type SummonerProviderProps = {
  children: ReactNode
}

export const SummonerContext = createContext({} as SummonerContextData)

function SummonerProvider({ children }: SummonerProviderProps) {
  const { leaguestats } = useLeagueStats()
  const [summoner, setSummoner] = useState<Summoner>()
  const [riotAccount, setRiotAccount] = useState<Account>()

  const [leagueRegion, setLeagueRegion] =
    usePersistedState<LeagueRegion>('leagueRegion')
  const [puuid, setPuuid] = usePersistedState<string>('puuid')

  const [savedSummoners, setSavedSummoners] = usePersistedState<SummonerInfo[]>(
    'summoners',
    [],
  )

  async function getSummoner(leagueRegion: LeagueRegion, puuid: string) {
    try {
      console.log(
        `[SummonerContext] Fetching summoner with PUUID: ${puuid} in ${leagueRegion}`,
      )
      const { account, summoner } = await leaguestats.getSummonerByPuuid(
        leagueRegion,
        puuid,
      )

      console.log(
        `[SummonerContext] Summoner found: ${summoner.name} (${puuid}) in ${leagueRegion}`,
      )

      setPuuid(puuid)
      setLeagueRegion(leagueRegion)
      setSummoner(summoner)
      setRiotAccount(account)

      console.log('[SummonerContext] Summoner updated successfully')
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error({ ...e })
      }
    }
  }

  function addSummoner(
    leagueRegion: LeagueRegion,
    puuid: string,
    name?: string,
  ) {
    if (
      savedSummoners.find(
        (s) => s.puuid == puuid && s.leagueRegion == leagueRegion,
      )
    )
      return

    setSavedSummoners((val) => [...val, { puuid, leagueRegion, name }])
  }

  async function resetSummoner() {
    setSummoner(undefined)
    setPuuid('')
    setLeagueRegion('unknown')
  }

  return (
    <SummonerContext.Provider
      value={{
        puuid,
        leagueRegion,
        summoner,
        riotAccount,
        setLeagueRegion,
        setPuuid,
        resetSummoner,
        getSummoner,
        addSummoner,
        savedSummoners,
      }}
    >
      {children}
    </SummonerContext.Provider>
  )
}

function useSummoner() {
  const context = useContext(SummonerContext)

  return context
}

export { SummonerProvider, useSummoner }
