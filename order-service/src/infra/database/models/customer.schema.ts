import { Schema } from 'mongoose';
import mongoose from '../connection';
import { Customer } from '../../../domain/models/customer';

const CustomerSchema = new Schema<Customer>({
  email: {
    type: String,
    required: true
  },
  
  externalId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

export const CustomerModel = mongoose.model('Customer', CustomerSchema);