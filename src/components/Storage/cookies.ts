import { getCookie as GetCookie, removeCookies } from 'cookies-next'
export const getCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    const cookie = GetCookie(name)
    if (cookie) {
      // @ts-ignore
      return JSON.parse(cookie || '{}')
    }
    return {}
  }
}
export const removeCookie = (name: string) => {
  const cookie = removeCookies(name)
  console.log(cookie)
  return cookie
}
