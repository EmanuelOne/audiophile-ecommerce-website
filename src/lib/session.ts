import cookies from 'lib/cookies'
import { NextApiRequest } from 'next'

export const isLoggedIn = (handler: any) =>
  cookies((req: NextApiRequest, res: any) => {
    if (req.cookies.user) {
      return handler(req, res)
    }
    // const user = req.headers.user
    // if (user) {
    //   res.cookie('user', user)
    //   return handler(req, res)
    // }

    return res.status(401).json({ status: 'error', message: 'Unauthorized' })
  })
