import { Order } from '../../../domain/models/order';
import { CreateOrderModel } from '../../../domain/use-cases/create-order';

export interface CreateOrderRepository {
  create(order: CreateOrderModel): Promise<Order>
}