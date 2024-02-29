import { BuyProductsRepository } from '../../data/protocols/db-buy-products';
import { CreateProductRepository } from '../../data/protocols/db-create-product';
import { generateProductCode } from '../../data/utils/generate-product-code';
import { Product } from '../../domain/models/product';
import { CreateProductModel } from '../../domain/use-cases/create-product';
import { randomUUID } from 'node:crypto';

export class InMemoryProductRepository 
implements 
CreateProductRepository,
BuyProductsRepository {
  
  items: Product[] = [];

  async checkProductsStock(products: [{ quantity: number; price: number; code: string; name: string; }]): Promise<boolean> {
    const checkProductsStock = products.map( async (product) => {
      const prod = this.items.find((item) => item.code === product.code);
      return prod!.quantity >= product.quantity;
    });

    const results = await Promise.all(checkProductsStock);
    return !results.includes(false);
  }

  async create( product: CreateProductModel): Promise<void> {
    const prod = {
      id: randomUUID(),
      code: generateProductCode(),
      ...product 
    };
    this.items.push(prod);
  }

  async getProductByCode(code: string): Promise<Product | null> {
    const product = this.items.find((item) => item.code === code);
    if(product) return product;

    return null;
  }

}