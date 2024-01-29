import { Schema } from 'mongoose';
import mongoose from '../connection/connection';

const UserSchema = new Schema({
  email: { 
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  }
}, { timestamps: true });

export const UserModel = mongoose.model('User', UserSchema);