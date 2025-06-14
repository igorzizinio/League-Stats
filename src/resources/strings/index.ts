export interface StringResources {
  common: {
    unknownSummoner: string
    victory: string
    defeat: string
    confirm: string
  }
  error: {
    notFound: string
  }
  screen: {
    welcome: {
      welcome: string
      subText: string
      input: {
        riotID: string
        region: string
      }
      recentSummoners: string
      continue: string
    }
    settings: {
      title: string
      customRiotApiKey: string
      customRiotApiKeyPlaceholder: string
      deleteData: string
      appColor: string
      language: string
    }
    home: {
      title: string
    }
    champions: {
      title: string
    }
    history: {
      title: string
    }
    profile: {
      title: string
    }
    bestChampions: {
      title: string
    }
  }
  card: {
    leagueInfo: {
      title: string
    }
    bestChampions: {
      title: string
    }
  }
  league: {
    championRotation: string
    pdl: string
    pdlShort: string
    physicalDamage: string
    magicDamage: string
    trueDamage: string
    emotionalDamage: string
    killParticipation: string
    queue: {
      normalBlindPick: string
      normalDraftPick: string
      normalQuickPlay: string
      normalSwiftPlay: string
      rankedSolo: string
      rankedFlex: string
    }
    leagueTier: {
      IRON: string
      BRONZE: string
      SILVER: string
      GOLD: string
      PLATINUM: string
      EMERALD: string
      DIAMOND: string
      MASTER: string
      GRANDMASTER: string
      CHALLENGER: string
    }
    gameModeName: {
      ARAM: string
      CLASSIC: string
      URF: string
      CHERRY: string
    }
    queueType: {
      RANKED_SOLO_5x5: string
      RANKED_FLEX_SR: string
      CHERRY: string
    }
  }
}

export * from './en'
export * from './pt'

export const languageNames = {
  pt: '🇧🇷 Português',
  en: '🇺🇸 English',
}
