import { RabbitMQMessagingService } from '../rabbitMQ';
import { CreateOrderImplementation } from '../../../data/use-cases-implementation/create-order-impl';
import { OrderMongoDBRepository } from '../../database/repositories/order/order-mongodb-repository';
import { CustomerMongoDBRepository } from '../../database/repositories/customer/customer-mongodb-repository';
import { OrderModel } from '../../database/models/order-schema';
import { CustomerModel } from '../../database/models/customer.schema';

type BuyProductConsumer = {
customer: { email: string, name: string, externalId: string }
products: [{ productId: string, quantity: number, price: number }]
}

export async function buyProductConsumer() {
  
  const messagingService = new RabbitMQMessagingService(`${process.env.URI}`);

  await messagingService.start();
  await messagingService.consume('BUY_PRODUCTS', async (message) => {
    const messageToString = message.content.toString();
    const { customer, products } = JSON.parse(messageToString) as BuyProductConsumer;

    const createOrderRepository = new OrderMongoDBRepository(OrderModel);
    const customerRepository = new CustomerMongoDBRepository(CustomerModel);
    const createOrderUseCase = new CreateOrderImplementation(createOrderRepository, customerRepository, messagingService);

    await createOrderUseCase.create({ orderItems: products, customer });
  });

}

buyProductConsumer();