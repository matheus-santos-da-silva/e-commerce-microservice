import { CreateOrderModel, CreateOrderRepository } from '../../data/protocols/order/db-create-order';
import { Order } from '../../domain/models/order';
import { randomUUID } from 'node:crypto';

export class InMemoryOrderRepository implements CreateOrderRepository {

  items: Order[] = [];

  async create(order: CreateOrderModel): Promise<Order> {
    const newOrder = { id: randomUUID(), ...order };
    this.items.push(newOrder);
    return newOrder;
  }
  
}