import { Schema } from 'mongoose';
import mongoose from '../../database/connection';
import { UserDTO } from './UserDTO';

const UserSchema = new Schema<UserDTO>({
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

export const User = mongoose.model('User', UserSchema);