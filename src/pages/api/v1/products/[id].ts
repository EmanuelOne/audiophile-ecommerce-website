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
    const id = req.query?.id?.toString()
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ status: 'error', message: 'invalid id' })

      const product = await Product.findOne({ _id: id })
      if (!product)
        return res
          .status(400)
          .json({ status: 'error', message: 'product not found' })

      return res.status(200).json({
        status: 'success',
        data: product,
        message: 'Product created successfully',
      })
    } catch (err: any) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
  }
  if (method === RequestMethods.put()) {
    try {
      const { name, price, description, image, category, quantity } = req.body
      if (!mongoose.Types.ObjectId.isValid(req.query?.id?.toString() || ''))
        return res.status(400).json({ status: 'error', message: 'invalid id' })
      const product = await Product.findOneAndUpdate(
        { _id: req.query?.id?.toString() },
        {
          name,
          price,
          description,
          image,
          category,
          quantity,
        },
        { new: true }
      )
      if (!product)
        return res
          .status(400)
          .json({ status: 'error', message: 'product not found' })

      return res
        .status(200)
        .json({ status: 'success', message: 'Product Updated' })
    } catch (err: any) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
  }
  return res.status(400).json({ status: 'error', message: 'not found' })
})
