import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import colors from '../colors'
import usePersistedState from './usePersistedState'
import i18n from '../i18n'
import { getLocales } from 'expo-localization'

interface PreferencesContextType {
  primaryColor: string
  apiUrl: string | undefined
  language: string
  setLanguage: (language: string) => void
  setPrimaryColor: (color: string) => void
  setApiUrl: (apiUrl: string | undefined) => void
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

  const [apiUrl, setApiUrl] = usePersistedState<string | undefined>(
    'preferences.apiUrl',
    undefined,
  )

  const [language, setLanguage] = usePersistedState(
    'preferences.language',
    getLocales()[0].languageCode ?? 'en',
  )

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <PreferencesContext.Provider
      value={{
        primaryColor,
        apiUrl,
        language,
        setPrimaryColor,
        setApiUrl,
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
