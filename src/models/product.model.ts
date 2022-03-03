import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['earphones', 'headphone', 'speaker'],
    },
  },
  {
    timestamps: true,
  }
)
export default mongoose.models.Product ||
  mongoose.model('Product', productSchema)
