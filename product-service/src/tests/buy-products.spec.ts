import { describe, it, expect } from 'vitest'; 
import { BuyProductsImplementation } from '../data/use-cases-implementation/buy-products-impl';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';
import { InMemoryMessagingServiceRepository } from './repositories/in-memory-messaging-service-repository';
import { CreateProductImplementation } from '../data/use-cases-implementation/create-product-impl';
import { createUserToken } from './utils/create-user-token';

describe('BuyProducts use-case', () => {
  
  it('should be able to buy a new Product', async () => {
    const productRepository = new InMemoryProductRepository();
    const messagingService = new InMemoryMessagingServiceRepository();

    const createProductUseCase = new CreateProductImplementation(productRepository, messagingService);
    const sut = new BuyProductsImplementation(productRepository, messagingService);

    const token = await createUserToken({
      email: 'johndoe@example.com',
      externalId: '1',
      name: 'John Doe'
    });

    await createProductUseCase.create({
      name: 'Chair',
      price: 200,
      quantity: 5
    });

    const chair = productRepository.items[0];

    const result = await sut.buy({
      products: [{
        code: chair.code,
        name: chair.name,
        price: chair.price,
        quantity: 2
      }],
      token
    });

    expect(result.statusCode).toBe(200);
    expect(result.message).toBe('Your order has been done successfully.');
  });

  it('should not to be able to buy a product that not have enough stock', async () => {
    
    const productRepository = new InMemoryProductRepository();
    const messagingService = new InMemoryMessagingServiceRepository();

    const createProductUseCase = new CreateProductImplementation(productRepository, messagingService);
    const sut = new BuyProductsImplementation(productRepository, messagingService);

    const token = await createUserToken({
      email: 'johndoe@example.com',
      externalId: '1',
      name: 'John Doe'
    });

    await createProductUseCase.create({
      name: 'Chair',
      price: 200,
      quantity: 5
    });

    const chair = productRepository.items[0];

    const result = await sut.buy({
      products: [{
        code: chair.code,
        name: chair.name,
        price: chair.price,
        quantity: 10
      }],
      token
    });

    expect(result.statusCode).toBe(422);
    expect(result.message).toBe('There is a product that does not have the enough quantity');
  });

});