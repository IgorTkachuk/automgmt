export default class GearService {
  _apiBase = '/api'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + 
        `received ${res.status}`)
    }

    return await res.json()
  }

  getAllGears = async () => {
    const res = await this.getResource('/gears.json')
    return res
  }

  getGear = async (id) => {
    const res = await this.getResource('/gears.json')
    return res[id]
  }
}