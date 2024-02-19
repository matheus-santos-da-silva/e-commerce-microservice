export interface CreateProductModel {
  name: string
  price: number
  quantity: number
}

export interface CreateProductResponse {
  message: string
  statusCode: number
}

export abstract class CreateProduct {
  abstract create(product: CreateProductModel): Promise<CreateProductResponse>
}