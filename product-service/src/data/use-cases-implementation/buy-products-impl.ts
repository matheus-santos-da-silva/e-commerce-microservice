import { BuyProducts, BuyProductsModel, BuyProductsResponse } from '../../domain/use-cases/buy-products';
import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';
import { BuyProductsRepository } from '../protocols/db-buy-products';

export class BuyProductsImplementation implements BuyProducts {

  constructor(
    private buyProductRepository: BuyProductsRepository,
    private messagingService: MessagingServiceRepository
  ) {}

  async buy({
    products,
    token
  }: BuyProductsModel): Promise<BuyProductsResponse> {

    // take the credentials of user
    const tokenParts = token.split('.');
    const { email, externalId, name } = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf-8')) as { email: string, name: string, externalId: string }; 

    const checkProductsStock = await this.buyProductRepository.checkProductsStock(products);
    if(!checkProductsStock) return {
      message: 'There is a product that does not have the enough quantity',
      statusCode: 422
    };

    await this.messagingService.start();
    await this.messagingService.publishInQueue('BUY_PRODUCTS', JSON.stringify({
      customer: { email, name, externalId },
      products
    }));
 
    return {
      message: 'Your order has been done successfully.',
      statusCode: 200
    };
  }

}