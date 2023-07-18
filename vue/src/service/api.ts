import axios from 'axios'

const host = `https://66dcilqsil.execute-api.us-east-1.amazonaws.com/prod`

export const api = {
  async get(path: string): Promise<any> {
    return (await axios.get(`${host}${path}`, { withCredentials: true })).data
  },
  async post(path: string, payload: any = {}): Promise<any> {
    return (await axios.post(`${host}${path}`, payload, { withCredentials: true })).data
  }
}
