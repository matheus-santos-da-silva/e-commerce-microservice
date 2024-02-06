import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

type SchemaType<T> = z.ZodType<T, any, any>;

export const validationMiddleware = <T>(
  schema: SchemaType<T>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const data: T = request.body;
      schema.parse(data);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((error) => ({
          message: error.message
        }));
        response.status(422).json(formattedErrors);
        return;
      }
    }
  };
};