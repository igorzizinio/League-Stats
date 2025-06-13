import axios, { AxiosInstance } from 'axios'
import { DDragonChampionsRaw, DDragonItemsRaw } from '../@types/riot'

interface CacheKey<T> {
  gotAt: number
  data?: T
}

interface DDragonCache {
  [key: string]: CacheKey<unknown>
}

class DDragon {
  readonly #CURRENT_PATCH = '13.14.1'

  api: AxiosInstance

  #baseURL = 'https://ddragon.leagueoflegends.com'

  #cache: DDragonCache = {
    versions: {
      gotAt: 0,
      data: undefined,
    },
    champions: {
      gotAt: 0,
      data: undefined,
    },
    items: {
      gotAt: 0,
      data: undefined,
    },
  }

  constructor() {
    this.api = axios.create({
      baseURL: this.#baseURL,
    })
  }

  get versions() {
    const versions = this.#cache.versions as CacheKey<string[]>

    if (!versions.data) {
      this.getOrFetchVersions()
      return [this.#CURRENT_PATCH]
    }

    return versions.data
  }

  getCDN(path: string) {
    return this.#baseURL + `/cdn/${this.versions[0]}/` + path
  }

  getIcon(iconId: number) {
    const versions = this.versions

    if (!versions)
      return (
        this.#baseURL +
        `/cdn/${this.#CURRENT_PATCH}/img/profileicon/${iconId}.png`
      )

    return this.#baseURL + `/cdn/${versions[0]}/img/profileicon/${iconId}.png`
  }

  getChampionIcon(championId: string) {
    const [version] = this.versions

    if (!version)
      return (
        this.#baseURL +
        `/cdn/${this.#CURRENT_PATCH}/img/champion/${championId}.png`
      )

    return this.#baseURL + `/cdn/${version}/img/champion/${championId}.png`
  }

  async getOrFetchVersions() {
    if (!this.#cache.versions.data) {
      const versions = await this.fetchVersions()

      this.#cache.versions = {
        gotAt: Date.now(),
        data: versions,
      }

      return versions
    }

    return this.#cache.versions.data
  }

  async getOrFetchChampions(): Promise<DDragonChampionsRaw> {
    if (!this.#cache.champions.data) {
      const champions = await this.fetchChampions()

      this.#cache.champions = {
        gotAt: Date.now(),
        data: champions,
      }

      return champions
    }

    return this.#cache.champions.data as DDragonChampionsRaw
  }

  async getOrFetchItems(): Promise<DDragonItemsRaw> {
    if (!this.#cache.items.data) {
      const items = await this.fetchItems()

      this.#cache.items = {
        gotAt: Date.now(),
        data: items,
      }

      return items
    }

    return this.#cache.items.data as DDragonItemsRaw
  }

  async fetchVersions() {
    const res = await this.api.get<string[]>('api/versions.json')
    return res.data
  }

  async fetchChampions(locale: string = 'en_US'): Promise<DDragonChampionsRaw> {
    const [version] = this.versions
    const res = await this.api.get(
      `/cdn/${version}/data/${locale}/champion.json`,
    )

    return res.data.data
  }

  async fetchItems(locale: string = 'en_US') {
    const [version] = this.versions
    const res = await this.api.get(`/cdn/${version}/data/${locale}/item.json`)

    return res.data.data
  }
}

export default new DDragon()
