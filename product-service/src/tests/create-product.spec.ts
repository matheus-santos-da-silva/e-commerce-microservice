import { describe, expect, it } from 'vitest';
import { CreateProductImplementation } from '../data/use-cases-implementation/create-product-impl';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';

describe('Create Product UseCase', () => {

  it('should be able to create a Product', async () => {
    const repository = new InMemoryProductRepository();
    const sut = new CreateProductImplementation(repository);

    const product = await sut.create({
      code: '1',
      name: 'product-test',
      price: 200,
      quantity: 15
    });

    expect(product.statusCode).toBe(201);
    expect(product.message).toBe('Product created successfully');
  });

  it('should not to be able to create a Product if the code is already exists', async () => {

    const repository = new InMemoryProductRepository();
    const sut = new CreateProductImplementation(repository);

    await sut.create({
      code: '1',
      name: 'product-test',
      price: 200,
      quantity: 15
    });

    const product = await sut.create({
      code: '1',
      name: 'product-test-2',
      price: 200,
      quantity: 15
    });

    expect(product.statusCode).toBe(422);
    expect(product.message).toBe('Code is already exists');
  });

});