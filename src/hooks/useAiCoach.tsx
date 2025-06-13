import { useMemo } from 'react'

import { CoachAI } from '../services/coach-ai'

declare const process: {
  env: {
    [key: string]: string
  }
}

const useAiCoach = () => {
  const aiCoach = useMemo(
    () => new CoachAI(process.env.EXPO_PUBLIC_OPENROUTER_API_KEY),
    [],
  )

  return { aiCoach }
}

export { useAiCoach }
