import { isLoggedIn } from './../../../../lib/session'
import { RequestMethods } from './../../../../utils/requestMethods'
import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dbConnect from 'utils/db'
import User from 'models/user.model'
import cookies from 'lib/cookies'
export default isLoggedIn(
  cookies(async function (req: NextApiRequest, res: any) {
    const { method = RequestMethods.get() } = req
    // res.cookie('user', 'api-middleware!')
    // console.log(req.cookies)
    // return res.end(res.getHeader('Set-Cookie'))

    await dbConnect()
    const obj = {
      [RequestMethods.get()]: async () => {
        try {
          const user = await User.find({})
          return res.status(200).json({ status: 'success', data: user })
        } catch (err: any) {
          return res.status(400).json({ status: 'error', message: err.message })
        }
      },
    }
    return obj[method]
      ? await obj[method]()
      : res.status(404).json({ status: 'not found' })
  })
)
