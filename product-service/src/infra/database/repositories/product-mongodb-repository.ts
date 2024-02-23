import { BuyProductsRepository } from '../../../data/protocols/db-buy-products';
import { CreateProductRepository } from '../../../data/protocols/db-create-product';
import { Product } from '../../../domain/models/product';
import { CreateProductModel } from '../../../domain/use-cases/create-product';
import { ProductModel } from '../models/product-schema';

export class ProductMongoDBRepository 
implements 
    CreateProductRepository,
    BuyProductsRepository
{

  constructor(
    private mongoProductModel: typeof ProductModel
  ) {}
  
  async create(product: CreateProductModel): Promise<void> {
    await this.mongoProductModel.create(product);
  }

  async getProductByCode(code: string): Promise<Product | null> {
    
    const checkIfCodeAlreadyExists = await this.mongoProductModel.findOne({ code });
    if(checkIfCodeAlreadyExists) return checkIfCodeAlreadyExists;

    return null; 
  }

  async checkProductsStock(products: [{ code: string, name: string,quantity: number, price: number }]): Promise<boolean> {
    
    const checkProductsStock = products.map(async (product) => {
      const prod = await this.mongoProductModel.findOne({ code: product.code });
      return prod!.quantity >= product.quantity;
    });

    const results = await Promise.all(checkProductsStock);
    return !results.includes(false);

  }
}