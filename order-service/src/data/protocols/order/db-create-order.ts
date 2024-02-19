import { Customer } from '../../../domain/models/customer';
import { Order } from '../../../domain/models/order';
import { OrderItems } from '../../../domain/models/order-items';

export interface CreateOrderModel {
  customer: Customer
  orderItems: OrderItems[]
  total: number
}

export interface CreateOrderRepository {
  create(order: CreateOrderModel): Promise<Order>
}