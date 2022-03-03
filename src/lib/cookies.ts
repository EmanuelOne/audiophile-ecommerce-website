import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

/**
 * This sets `cookie` on `res` object
 */
const cookie = (
  res: NextApiResponse,
  name: string,
  value: any,
  options: any = { path: '/' }
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (handler: any) => (req: any, res: any) => {
  res.cookie = (name: string, value: any, options: any) =>
    cookie(res, name, value, options)

  return handler(req, res)
}
export const setCookie = (res: any, key: string, value: string) => {
  res.cookie(key, value)
}
export const getCookie = (req: any, key: string) => {
  return req.cookies[key]
}

export default cookies
