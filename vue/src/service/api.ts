import axios from 'axios'
import { getCookie, setCookie } from './cookie'

const host =
  process.env.NODE_ENV === 'production'
    ? `https://66dcilqsil.execute-api.us-east-1.amazonaws.com/prod`
    : `http://localhost:3000`

export const api = {
  async get(path: string): Promise<any> {
    const res = await axios.get(`${host}${path}`, { headers: { 'x-session': this.session } })
    const data = res.data
    console.log('head', res.headers)
    setCookie('session', res.headers['x-session'])
    return data
  },
  async post(path: string, payload: any = {}): Promise<any> {
    const res = await axios.post(`${host}${path}`, payload, {
      headers: { 'x-session': this.session }
    })
    const data = res.data
    console.log('head', res.headers)
    setCookie('session', res.headers['x-session'])
    return data
  },
  get session(): string {
    return getCookie('session')
  }
}
