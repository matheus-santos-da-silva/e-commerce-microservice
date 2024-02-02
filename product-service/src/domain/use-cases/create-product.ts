import { Product } from '../models/product';

export interface CreateProductModel {
  name: string
  price: number
  code: string
  quantity: number
}

export abstract class CreateProduct {
  abstract create(product: CreateProductModel): Promise<Product>
}