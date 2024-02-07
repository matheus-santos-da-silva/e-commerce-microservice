import { BuyProductRepository } from '../../../data/protocols/db-buy-product';
import { CreateProductRepository } from '../../../data/protocols/db-create-product';
import { Product } from '../../../domain/models/product';
import { CreateProductModel } from '../../../domain/use-cases/create-product';
import { BuyProductModel } from '../../../domain/use-cases/buy-product';
import { ProductModel } from '../models/product-schema';

export class ProductMongoDBRepository 
implements 
    CreateProductRepository,
    BuyProductRepository
{

  constructor(
    private mongoProductModel: typeof ProductModel
  ) {}

  async create(product: CreateProductModel): Promise<void> {
    await this.mongoProductModel.create(product);
  }

  async buy(products: BuyProductModel): Promise<void> {
    try {
      console.log(products);
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }

  async getProductByCode(code: string): Promise<Product | null> {
    
    const checkIfCodeAlreadyExists = await this.mongoProductModel.findOne({ code });
    if(checkIfCodeAlreadyExists) return checkIfCodeAlreadyExists;

    return null; 
  }
}