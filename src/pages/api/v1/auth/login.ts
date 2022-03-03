import { setCookie } from './../../../../lib/cookies'
import cookies from 'lib/cookies'
import bcrypt from 'bcryptjs'
import { RequestMethods } from './../../../../utils/requestMethods'
import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dbConnect from 'utils/db'
import User from 'models/user.model'
import joi from 'joi'
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method = RequestMethods.get() } = req
  await dbConnect()
  const obj = {
    [RequestMethods.post()]: async () => {
      const { email, password } = req.body
      const joiSchema = joi
        .object()
        .keys({
          email: joi.string().email().required(),
          password: joi.string().required(),
        })
        .validate(req.body || {})
      if (joiSchema.error) {
        return res

          .status(400)
          .json({ status: 'error', message: joiSchema.error.message })
      }

      try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
          return res
            .status(400)
            .json({ status: 'error', message: 'email is incorrect' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res
            .status(400)
            .json({ status: 'error', message: 'Password is incorrect' })
        }
        setCookie(res, 'user', JSON.stringify(user))
        return res
          .status(200)
          .json({ status: 'success', message: 'Login Successfull', data: user })
      } catch (err: any) {
        return res.status(400).json({ status: 'error', message: err.message })
      }
    },
  }
  return obj[method]
    ? await obj[method]()
    : res.status(404).json({ status: 'not found' })
}

export default cookies(loginRoute)
