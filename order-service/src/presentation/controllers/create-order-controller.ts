import { CreateOrder, CreateOrderModel } from '../../domain/use-cases/create-order';
import { Request, Response } from 'express'; 

export class CreateOrderController {
  constructor(private readonly createOrder: CreateOrder) {}

  async execute(request: Request, response: Response): Promise<void> {

    const {
      orderItems 
    }: CreateOrderModel = request.body;

    const { message, statusCode } = await this.createOrder.create({
      orderItems
    });

    response.status(statusCode).json({ message });

  }
}