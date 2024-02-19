import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const checkAuthentication = () => {

  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers['authorization']!.split(' ')[1];
      verify(token, `${process.env.JWT_SECRET}`);
      next();
    } catch (error) {
      return response.status(401).json({ message: 'Invalid Token' });
    }
  };
};