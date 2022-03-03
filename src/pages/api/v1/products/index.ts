import dbConnect from 'utils/db'
import { RequestMethods } from './../../../../utils/requestMethods'
import { NextApiResponse, NextApiRequest } from 'next'
import cookies from 'lib/cookies'
import { isLoggedIn } from './../../../../lib/session'
import Product from 'models/product.model'
import Joi from 'joi'
import mongoose from 'mongoose'
export default isLoggedIn(async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method = RequestMethods.get() } = req
  await dbConnect()
  if (method === RequestMethods.get()) {
    // console.log(req.query)
    // console.log(req.query)
    const { category } = req.query
    try {
      let product = []
      if (category) {
        product = await Product.find({ category })
      } else product = await Product.find()
      if (!product)
        return res
          .status(400)
          .json({ status: 'error', message: 'product not found' })

      return res.status(200).json({
        status: 'success',
        data: product,
      })
    } catch (err: any) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
  }

  return res.status(400).json({ status: 'error', message: 'not found' })
})
