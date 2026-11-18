import axios, { AxiosInstance } from 'axios'

export interface CommunityDragonPerk {
  id: number
  name: string
  iconPath: string
  endOfGameStatDescs?: string[]
}

class CDragon {
  api: AxiosInstance

  #baseURL = 'https://raw.communitydragon.org'
  #perksCache: Record<string, CommunityDragonPerk[]> = {}

  constructor() {
    this.api = axios.create({
      baseURL: this.#baseURL,
    })
  }

  getCDN(path: string) {
    return this.#baseURL + `/latest/` + path
  }

  getPerkIconUrl(iconPath: string) {
    const path = iconPath
      .replace('/lol-game-data/assets/', '')
      .replace(/^\/+/, '')
      .toLowerCase()
    return this.getCDN('plugins/rcp-be-lol-game-data/global/default/' + path)
  }

  async getOrFetchPerks(
    locale: string = 'en_US',
  ): Promise<CommunityDragonPerk[]> {
    const normalizedLocale = locale.toLowerCase()

    if (this.#perksCache[normalizedLocale]) {
      return this.#perksCache[normalizedLocale]
    }

    const localizedPerks = await this.fetchPerks(normalizedLocale)
    if (localizedPerks.length) {
      this.#perksCache[normalizedLocale] = localizedPerks
      return localizedPerks
    }

    const defaultPerks = await this.fetchPerks('default')
    this.#perksCache[normalizedLocale] = defaultPerks
    return defaultPerks
  }

  async fetchPerks(locale: string): Promise<CommunityDragonPerk[]> {
    try {
      const res = await this.api.get<CommunityDragonPerk[]>(
        `/latest/plugins/rcp-be-lol-game-data/global/${locale}/v1/perks.json`,
      )
      return res.data
    } catch {
      return []
    }
  }
}

export default new CDragon()
