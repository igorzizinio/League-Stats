import React, { createContext, useContext, ReactNode } from 'react'
import colors from '../colors'
import usePersistedState from './usePersistedState'

interface PreferencesContextType {
  primaryColor: string
  riotApiKey: string | undefined
  setPrimaryColor: (color: string) => void
  setRiotApiKey: (apiKey: string | undefined) => void
}

const PreferencesContext = createContext<PreferencesContextType>(
  {} as PreferencesContextType,
)

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [primaryColor, setPrimaryColor] = usePersistedState(
    'preferences.primaryColor',
    colors.softPurple,
  )

  const [riotApiKey, setRiotApiKey] = usePersistedState<string | undefined>(
    'preferences.riotApiKey',
    undefined,
  )

  return (
    <PreferencesContext.Provider
      value={{ primaryColor, riotApiKey, setPrimaryColor, setRiotApiKey }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext)

  return context
}
