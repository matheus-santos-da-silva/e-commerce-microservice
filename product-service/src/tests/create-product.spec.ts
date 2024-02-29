import { describe, expect, it } from 'vitest';
import { CreateProductImplementation } from '../data/use-cases-implementation/create-product-impl';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';
import { InMemoryMessagingServiceRepository } from './repositories/in-memory-messaging-service-repository';

describe('Create Product UseCase', () => {

  it('should be able to create a Product', async () => {
    const repository = new InMemoryProductRepository();
    const messagingServiceRepository = new InMemoryMessagingServiceRepository();
    const sut = new CreateProductImplementation(repository, messagingServiceRepository);

    const product = await sut.create({
      name: 'product-test',
      price: 200,
      quantity: 15
    });

    expect(product.statusCode).toBe(201);
    expect(product.message).toBe('Product created successfully');
  });

});