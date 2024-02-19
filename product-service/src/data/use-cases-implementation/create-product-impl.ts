import { Product } from '../../domain/models/product';
import { CreateProduct, CreateProductModel, CreateProductResponse } from '../../domain/use-cases/create-product';
import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';
import { CreateProductRepository } from '../protocols/db-create-product';
import { generateProductCode } from '../utils/generate-product-code'; 

export class CreateProductImplementation implements CreateProduct {

  constructor(
    private createProductRepository: CreateProductRepository,
    private messagingService: MessagingServiceRepository
  ) {}

  async create({
    name,
    price,
    quantity
  }: CreateProductModel): Promise<CreateProductResponse> {

    const code = generateProductCode();

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
    await this.messagingService.publishInQueue('CREATE_PRODUCT', JSON.stringify({ 
      name: product.name,
      code: product.code,
      price: product.price
    }) );

    return { message: 'Product created successfully', statusCode: 201 };

  }
  
}