import { Schema } from 'mongoose';
import mongoose from '../../infra/database/connection';
import { Product } from '../../domain/models/product';

const ProductSchema = new Schema<Product>({
  name: { 
    type: String,
    required: true
  },
  price: { 
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }

}, { timestamps: true });

export const ProductModel = mongoose.model('Product', ProductSchema);