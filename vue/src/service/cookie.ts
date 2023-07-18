export function setCookie(name: string, value: string, days: number = 365) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}
export function getCookie(name: string): string {
  name += '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
  }
  return ''
}
