import { RabbitMQMessagingService } from '../rabbitMQ';
import { ProductModel } from '../../database/models/product-schema';

type ProductConsumer = {
  code: string
  name: string
  price: string
}

export async function createProductConsumer() {

  const messagingService = new RabbitMQMessagingService(`${process.env.URI}`);

  await messagingService.start();
  await messagingService.consume('CREATE_PRODUCT', async (message) => {
    const messageToString = message.content.toString();
    const { code, name, price } = JSON.parse(messageToString) as ProductConsumer;

    await ProductModel.create({
      code,
      name,
      price
    });
  });

}

createProductConsumer();