import { OrderItems } from '../models/order-items';

export interface CreateOrderModel {
  orderItems: OrderItems[]
}

export interface CreateOrderResponse {
  message: string
  statusCode: number
}  

export abstract class CreateOrder {
  abstract create(order: CreateOrderModel): Promise<CreateOrderResponse>
}