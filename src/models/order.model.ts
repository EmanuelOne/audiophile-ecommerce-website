import { Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
      default: 'card',
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true }
)
