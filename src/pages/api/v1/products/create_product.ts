import dbConnect from 'utils/db'
import { RequestMethods } from './../../../../utils/requestMethods'
import { NextApiResponse, NextApiRequest } from 'next'
import cookies from 'lib/cookies'
import { isLoggedIn } from './../../../../lib/session'
import Product from 'models/product.model'
import Joi from 'joi'
export default isLoggedIn(async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method = RequestMethods.get() } = req
  await dbConnect()
  if (method === RequestMethods.post()) {
    try {
      const joiSchema = Joi.object()
        .keys({
          name: Joi.string().required(),
          price: Joi.number().required(),
          description: Joi.string().required(),
          image: Joi.string(),
          category: Joi.string().required(),
          quantity: Joi.number().required(),
        })
        .validate(req.body || {})
      if (joiSchema.error) {
        return res
          .status(400)
          .json({ status: 'error', message: joiSchema.error.message })
      }
      const { name, price, description, image, category, quantity } = req.body
      const product = new Product({
        name,
        price,
        description,
        image,
        category,
        quantity,
      })
      await product.save()
      return res.status(200).json({
        status: 'success',
        data: product,
        message: 'Product created successfully',
      })
    } catch (err: any) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
  }
  return res.status(400).json({ status: 'error', message: 'not found' })
})
