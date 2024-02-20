import { BuyProducts, BuyProductsModel } from '../../domain/use-cases/buy-products';
import { Request, Response } from 'express';

export class BuyProductsController {

  constructor(private readonly buyProduct: BuyProducts) {}

  async execute(request: Request, response: Response): Promise<void> {

    const headersAuth = request.headers.authorization;
    const token = headersAuth!.split(' ')[1];

    const {
      products
    }: BuyProductsModel = request.body;

    const { message, statusCode } = await this.buyProduct.buy({
      products,
      token
    });

    response.status(statusCode).json({ message });
  }

}