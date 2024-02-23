import { Customer } from '../../../domain/models/customer';
import { Order } from '../../../domain/models/order';

export interface CreateOrderModel {
  customer: Customer
  orderItems: [{ name: string, code: string, productId: string, quantity: number, price: number  }]
  total: number
}

export interface CreateOrderRepository {
  create(order: CreateOrderModel): Promise<Order>
}