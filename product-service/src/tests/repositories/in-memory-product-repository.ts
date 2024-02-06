import { BuyProductRepository } from '../../data/protocols/db-buy-product';
import { CreateProductRepository } from '../../data/protocols/db-create-product';
import { Product } from '../../domain/models/product';
import { BuyProductModel } from '../../domain/use-cases/buy-product';
import { CreateProductModel } from '../../domain/use-cases/create-product';
import { randomUUID } from 'node:crypto';

export class InMemoryProductRepository 
implements 
CreateProductRepository,
BuyProductRepository {
  
  items: Product[] = [];

  async buy(products: BuyProductModel): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async create( product: CreateProductModel): Promise<void> {
    this.items.push({ id: randomUUID(), ...product });
  }

  async getProductByCode(code: string): Promise<Product | null> {
    const product = this.items.find((item) => item.code === code);
    if(product) return product;

    return null;
  }

}