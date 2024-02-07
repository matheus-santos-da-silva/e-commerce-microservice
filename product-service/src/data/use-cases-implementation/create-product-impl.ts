import { Product } from '../../domain/models/product';
import { CreateProduct, CreateProductModel, CreateProductResponse } from '../../domain/use-cases/create-product';
import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';
import { CreateProductRepository } from '../protocols/db-create-product';

export class CreateProductImplementation implements CreateProduct {

  constructor(
    private createProductRepository: CreateProductRepository,
    private messagingService: MessagingServiceRepository
  ) {}

  async create({
    code,
    name,
    price,
    quantity
  }: CreateProductModel): Promise<CreateProductResponse> {

    const checkProductCode = await this.createProductRepository.getProductByCode(code);
    if(checkProductCode) return {
      message: 'Code is already exists',
      statusCode: 422
    };

    const product = new Product({
      code,
      name,
      price,
      quantity
    }); 

    await this.createProductRepository.create( product ); 
  
    await this.messagingService.start();
    await this.messagingService.publishInQueue( 'PRODUCT', JSON.stringify(product) );

    return { message: 'Product created successfully', statusCode: 201 };

  }
  
}