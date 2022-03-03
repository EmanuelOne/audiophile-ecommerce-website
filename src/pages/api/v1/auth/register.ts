import { RequestMethods } from './../../../../utils/requestMethods'
import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dbConnect from 'utils/db'
import User from 'models/user.model'
import joi from 'joi'
import bcrypt from 'bcryptjs'
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method = RequestMethods.get() } = req
  await dbConnect()
  const obj = {
    [RequestMethods.post()]: async () => {
      const { name, email, password } = req.body
      const joiSchema = joi
        .object()
        .keys({
          name: joi.string().required(),
          email: joi.string().email().required(),
          password: joi.string().required(),
        })
        .unknown(true)
        .validate(req.body)
      if (joiSchema.error) {
        return res
          .status(400)
          .json({ status: 'error', message: joiSchema.error.message })
      }

      try {
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        const user = new User({
          name,
          email,
          password: hashPassword,
        })
        await user.save()
        return res.status(200).json({ status: 'success' })
      } catch (err: any) {
        if (err.code === 11000) {
          return res
            .status(400)
            .json({ status: 'error', message: 'email is already taken' })
        }
        return res.status(400).json({ status: 'error', message: err.message })
      }
    },
  }
  return obj[method]
    ? await obj[method]()
    : res.status(404).json({ status: 'not found' })
}
