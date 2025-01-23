export interface StringResources {
  common: {
    unknownSummoner: string
    victory: string
    defeat: string
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
      }
      recentSummoners: string
      continue: string
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
    queue: {
      normalBlindPick: string
      normalDraftPick: string
      normalQuickPlay: string
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
