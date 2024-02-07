import { Router } from 'express';
import { CreateProductController } from '../controllers/create-product-controller';
import { Request, Response } from 'express'; 
import { CreateProductImplementation } from '../../data/use-cases-implementation/create-product-impl';
import { ProductMongoDBRepository } from '../../infra/database/repositories/product-mongodb-repository';
import { ProductModel } from '../../infra/database/models/product-schema'; 
import { validationMiddleware } from '../../data/utils/middleware/validation';
import { CreateProductValidationSchema } from '../../data/utils/validations-schemas/create-product-validation-schema';
import { RabbitMQMessagingService } from '../../infra/rabbitMQ/rabbitMQ';

const router = Router();

router.post('/create', validationMiddleware(CreateProductValidationSchema) , async (request: Request, response: Response) => {
  const mongoRepository = new ProductMongoDBRepository(ProductModel);
  const messagingRepository = new RabbitMQMessagingService(`${process.env.URI}`);
  const createProductUseCase = new CreateProductImplementation(mongoRepository, messagingRepository);
  const controller = new CreateProductController(createProductUseCase);

  await controller.execute(request, response);
});

export default router;