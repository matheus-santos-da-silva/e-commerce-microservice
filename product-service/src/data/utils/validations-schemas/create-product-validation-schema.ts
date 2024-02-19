import { z } from 'zod';

export const CreateProductValidationSchema = z.object({
  
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),

  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number'
  }).min(1, 'Price must be more than 0'),

  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number'
  }).min(1, 'Quantity must be more than 0'),

});