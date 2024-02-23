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
      name: String,
      price: Number,
      code: String,
      quantity: Number
    }]
  },

  total: {
    type: Number,
    required: true
  }
  
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', OrderSchema);