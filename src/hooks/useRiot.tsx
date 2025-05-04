import { useMemo } from 'react'
import { Riot } from '../services/riot'
import { usePreferences } from './usePreferences'

declare const process: {
  env: {
    [key: string]: string
  }
}

const useRiot = () => {
  const { riotApiKey } = usePreferences()

  const riot = useMemo(
    () => new Riot(riotApiKey ?? process.env.EXPO_PUBLIC_RIOT_API_KEY),
    [riotApiKey],
  )

  return riot
}

export { useRiot }
