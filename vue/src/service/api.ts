import axios from 'axios'

const host = `http://localhost:3000`

export const api = {
  async get(path: string): Promise<any> {
    return (await axios.get(`${host}${path}`, { withCredentials: true })).data
  },
  async post(path: string, payload: any = {}): Promise<any> {
    return (await axios.post(`${host}${path}`, payload, { withCredentials: true })).data
  }
}
