import axios, { AxiosInstance } from 'axios'

class CDragon {
  api: AxiosInstance

  #baseURL = 'https://raw.communitydragon.org'

  constructor() {
    this.api = axios.create({
      baseURL: this.#baseURL,
    })
  }

  getCDN(path: string) {
    return this.#baseURL + `/latest/` + path
  }
}

export default new CDragon()
