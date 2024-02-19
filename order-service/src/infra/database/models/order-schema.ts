import { Schema } from 'mongoose';
import mongoose from '../connection';
import { Order } from '../../../domain/models/order';
import { Customer } from '../../../domain/models/customer';
import { Product } from '../../../domain/models/product';

const OrderSchema = new Schema<Order>({
  customer: {
    type: {} as Customer,
    required: true
  },

  orderItems: {
    type: [{
      product: {} as Product,
      quantity: Number,
      orderId: String
    }]
  },

  total: {
    type: Number,
    required: true
  }
  
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', OrderSchema);