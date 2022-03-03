import { getCookie as GetCookie, removeCookies } from 'cookies-next'
export const getCookie = (name: string) => {
  return JSON.parse(GetCookie(name) ? GetCookie(name) : '{}')
}
export const removeCookie = (name: string) => {
  const cookie = removeCookies(name)
  console.log(cookie)
  return cookie
}
