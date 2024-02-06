import { Product } from '../../domain/models/product';
import { CreateProduct, CreateProductModel, CreateProductResponse } from '../../domain/use-cases/create-product';
import { CreateProductRepository } from '../protocols/db-create-product';

export class CreateProductImplementation implements CreateProduct {

  constructor(
    private createProductRepository: CreateProductRepository
  ) {}

  async create({
    code,
    name,
    price,
    quantity
  }: CreateProductModel): Promise<CreateProductResponse> {

    const product = await this.createProductRepository.getProductByCode(code);
    if(product) return {
      message: 'Code is already exists',
      statusCode: 422
    };

    await this.createProductRepository.create( new Product({
      code,
      name,
      price,
      quantity
    })); 

    return { message: 'Product created successfully', statusCode: 201 };

  }
  
}