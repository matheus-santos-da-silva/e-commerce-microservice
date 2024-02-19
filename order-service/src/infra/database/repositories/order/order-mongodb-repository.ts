import { CreateOrderRepository } from '../../../../data/protocols/order/db-create-order';
import { Order } from '../../../../domain/models/order';
import { CreateOrderModel } from '../../../../data/protocols/order/db-create-order';
import { OrderModel } from '../../models/order-schema';

export class OrderMongoDBRepository implements CreateOrderRepository {

  constructor(
    private mongoOrderModel: typeof OrderModel
  ) {}

  async create({ customer, orderItems, total }: CreateOrderModel): Promise<Order> {
    const order = await this.mongoOrderModel.create({ customer, orderItems, total});
    return order;
  }
  
}