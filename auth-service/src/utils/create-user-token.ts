import { sign } from 'jsonwebtoken';

interface payload {
  email: string
  name: string
}

export const createUserToken = async (payload: payload) => {
  const token = sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '24h' });
  return token;
};