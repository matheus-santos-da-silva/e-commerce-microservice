import { CreateOrder, CreateOrderModel } from '../../domain/use-cases/create-order';
import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';
import { CustomerRepository } from '../protocols/customer/db-customer-repository';
import { CreateOrderRepository } from '../protocols/order/db-create-order';

export class CreateOrderImplementation implements CreateOrder {

  constructor(
    private createOrderRepository: CreateOrderRepository,
    private customerRepository: CustomerRepository,
    private messagingService: MessagingServiceRepository
  ) {}

  async create({ orderItems, customer }: CreateOrderModel): Promise<void> {

    let total = 0;

    for (const item of orderItems) {
      total += item.price * item.quantity;
    }

    const newCustomer = await this.customerRepository.create({  
      email: customer.email,
      externalId: customer.externalId,
      name: customer.name 
    });

    await this.createOrderRepository.create({
      customer: newCustomer,
      orderItems,
      total
    });

    await this.messagingService.start();
    await this.messagingService.publishInQueue('ORDER_STATUS', JSON.stringify('Status do pedido: AGUARDANDO PAGAMENTO'));
  }
  
}