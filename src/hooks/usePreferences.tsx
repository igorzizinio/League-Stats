import React, { createContext, useContext, useState, ReactNode } from 'react'
import colors from '../colors'

interface PreferencesContextType {
  primaryColor: string
  setPrimaryColor: (color: string) => void
}

const PreferencesContext = createContext<PreferencesContextType>(
  {} as PreferencesContextType,
)

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [primaryColor, setPrimaryColor] = useState(colors.softPurple)

  return (
    <PreferencesContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext)

  return context
}
