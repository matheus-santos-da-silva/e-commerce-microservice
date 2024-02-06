import { Request, Response } from 'express'; 
import { CreateProduct, CreateProductModel } from '../../domain/use-cases/create-product';

export class CreateProductController {

  constructor(private readonly createProduct: CreateProduct) {}

  async execute(request: Request, response: Response): Promise<void> {

    const {
      code,
      name,
      price,
      quantity
    }: CreateProductModel = request.body;

    const { message, statusCode } = await this.createProduct.create({
      code,
      name,
      price,
      quantity
    });

    response.status(statusCode).json({ message });

  }
}