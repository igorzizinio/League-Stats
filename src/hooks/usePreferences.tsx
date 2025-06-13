import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import colors from '../colors'
import usePersistedState from './usePersistedState'
import i18n from '../i18n'

interface PreferencesContextType {
  primaryColor: string
  riotApiKey: string | undefined
  language: string
  setLanguage: (language: string) => void
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

  const [language, setLanguage] = usePersistedState(
    'preferences.language',
    'en',
  )

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <PreferencesContext.Provider
      value={{
        primaryColor,
        riotApiKey,
        language,
        setPrimaryColor,
        setRiotApiKey,
        setLanguage,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext)

  return context
}
