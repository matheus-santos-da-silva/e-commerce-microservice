import { describe, it, expect } from 'vitest';
import { CreateOrderImplementation } from '../data/use-cases-implementation/create-order-impl';
import { InMemoryOrderRepository } from './repositories/in-memory-order-repository';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryMessagingServiceRepository } from './repositories/in-memory-messaging-service-repository';

describe('CreateOrder use-case', () => {
  
  it('should be able to create a new Order', async () => {
    const createOrderRepository = new InMemoryOrderRepository();
    const customerRepository = new InMemoryCustomerRepository();
    const messagingService = new InMemoryMessagingServiceRepository();

    const sut = new CreateOrderImplementation(createOrderRepository, customerRepository, messagingService);
    await sut.create({
      customer: {
        email: 'johndoe@example.com',
        externalId: '1',
        name: 'John Doe'
      },
      orderItems: [{
        code: '1',
        name: 'chair',
        price: 200,
        productId: '1',
        quantity: 2
      }]
    });

    expect(createOrderRepository.items[0].customer.name).toBe('John Doe');

  });

});