/* eslint-disable @typescript-eslint/no-explicit-any */
import { Match, MatchParticipant } from '../@types/riot'
import ddragon from './ddragon'

export class CoachAI {
  constructor(private apiKey: string) {}

  async analyzeMatch(
    participant: string,
    locale: string = 'en_US',
    matchData?: Match,
    matchTimeline?: unknown,
  ) {
    if (!matchData || !matchTimeline) {
      return
    }

    const optmized = await this.optimizeMatchTimeline(
      participant,
      matchData,
      matchTimeline,
    )

    const systemPrompt = `
      You are a League of Legends coach. Your job is to analyze a player's performance based on their match and timeline data.
      Provide strategic, tactical, and mechanical feedback to help the player improve.
      Use a friendly but technically accurate tone.
      Never make up information — only use what is in the data.
      You can break your feedback into early game, mid game, and late game insights if possible.
      Also give an 'AI Score' out of 100 based on the player's performance in early, mid and late game if possible.
      Note: Use user locale: ${locale}
    `

    const userPrompt = `
      Here is the optmized data (match, timeline), the player is "participantId": ${participant}:

      ${JSON.stringify(optmized)}
    `

    console.log('Sending request to CoachAI API with data:', optmized)

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    })

    if (!res.ok) {
      throw new Error(`Failed to analyze match: ${res.statusText}`)
    }

    return res.json()
  }

  async optimizeMatchTimeline(
    summonerPuuid: string,
    matchJson: Match,
    timelineJson: any,
  ) {
    const participantIndex = matchJson.info.participants.findIndex(
      (p) => p.puuid === summonerPuuid,
    )

    if (participantIndex === -1) return null

    const participantId = participantIndex + 1
    const playerStats = matchJson.info.participants.find(
      (p: MatchParticipant) => p.participantId === participantId,
    )
    if (!playerStats) return null

    const relevantEvents = timelineJson.info.frames.flatMap((frame: any) =>
      frame.events.filter(
        (event: any) =>
          event.participantId === participantId ||
          event.killerId === participantId ||
          event.victimId === participantId,
      ),
    )

    const items = await ddragon.getOrFetchItems()
    console.log(items)

    const eventSummary: string[] = relevantEvents.map((e: any) => {
      const minute = Math.floor(e.timestamp / 60000)
      switch (e.type) {
        case 'CHAMPION_KILL':
          return e.killerId === participantId
            ? `Kill ${
                matchJson.info.participants[e.victimId - 1].championName
              } at ${minute} min`
            : `Dead to ${
                matchJson.info.participants[e.killerId - 1].championName
              } at ${minute} min`
        case 'ITEM_PURCHASED':
          return `Item buy ${items[e.itemId].name} at ${minute} min`
        case 'SKILL_LEVEL_UP':
          return `Up skill slot ${e.skillSlot} at ${minute} min`
        default:
          return `${e.type} at ${minute} min`
      }
    })

    return {
      name: `${playerStats.riotIdGameName}#${playerStats.riotIdTagline}`,
      champion: playerStats.championName,
      role: playerStats.teamPosition || playerStats.role,
      kda: `${playerStats.kills}/${playerStats.deaths}/${playerStats.assists}`,
      totalDamage: playerStats.totalDamageDealtToChampions,
      visionScore: playerStats.visionScore,
      items: [
        playerStats.item0,
        playerStats.item1,
        playerStats.item2,
        playerStats.item3,
        playerStats.item4,
        playerStats.item5,
        playerStats.item6,
      ].filter((id) => id !== 0),
      eventSummary,
    }
  }
}
