import { Product } from '../../domain/models/product';
import { CreateProductModel } from '../../domain/use-cases/create-product';

export interface CreateProductRepository {
  create(product: CreateProductModel): Promise<void>
  getProductByCode(code: string): Promise<Product | null>
}