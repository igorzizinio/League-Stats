import { StringResources } from '.'

export const pt: StringResources = {
  common: {
    unknownSummoner: 'Invocador desconhecido',
    victory: 'Vitória',
    defeat: 'Derrota',
    confirm: 'Confirmar',
  },
  error: {
    notFound: 'Não encontrado',
  },
  screen: {
    welcome: {
      welcome: 'Bem-vindo',
      subText:
        'Antes de começarmos... preencha os campos abaixo com as informações',
      input: {
        riotID: 'Seu RiotID',
        region: 'Região',
      },
      recentSummoners: 'Invocadores recentes',
      continue: 'Continuar',
    },
    settings: {
      title: 'Configurações',
      customApiUrl: 'URL da API personalizada',
      customApiUrlPlaceholder: 'Insira sua URL da API personalizada aqui',
      appColor: 'Cor do aplicativo',
      deleteData: 'Excluir todos os dados',
      language: 'Idioma',
    },
    home: {
      title: 'Início',
    },
    champions: {
      title: 'Campeões',
    },
    history: {
      title: 'Histórico',
    },
    profile: {
      title: 'Perfil',
    },
    bestChampions: {
      title: 'Todos campeões',
    },
  },
  card: {
    leagueInfo: {
      title: 'Classificação pessoal',
    },
    bestChampions: {
      title: 'Melhores campeões',
    },
  },
  league: {
    championRotation: 'Rotação de campeões',
    pdl: 'Pontos de liga',
    pdlShort: 'PDL',
    physicalDamage: 'dano físico',
    magicDamage: 'dano mágico',
    trueDamage: 'dano verdadeiro',
    emotionalDamage: 'dano emocional',
    killParticipation: 'atuação em abates',
    queue: {
      normalBlindPick: 'Normal (Escolha às cegas)',
      normalDraftPick: 'Normal (Escolha alternada)',
      normalQuickPlay: 'Normal (Jogo Rápido)',
      normalSwiftPlay: 'Normal (Jogo Dinâmico)',
      rankedSolo: 'Ranqueado (Solo/Duo)',
      rankedFlex: 'Ranqueado (Flex)',
    },
    leagueTier: {
      IRON: 'Ferro',
      BRONZE: 'Bronze',
      SILVER: 'Prata',
      GOLD: 'Ouro',
      PLATINUM: 'Platina',
      EMERALD: 'Esmeralda',
      DIAMOND: 'Diamante',
      MASTER: 'Mestre',
      GRANDMASTER: 'Grão-Mestre',
      CHALLENGER: 'Desafiante',
    },
    gameModeName: {
      ARAM: 'ARAM',
      CLASSIC: "Summoner's Rift",
      URF: 'Ultra rapido e furioso',
      CHERRY: 'Arena',
    },
    queueType: {
      RANKED_SOLO_5x5: 'Ranqueada Solo',
      RANKED_FLEX_SR: 'Ranqueada Flex',
      CHERRY: 'Arena',
    },
  },
}
