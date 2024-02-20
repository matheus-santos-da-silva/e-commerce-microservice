export interface BuyProductsResponse {
  message: string
  statusCode: number
}

export interface BuyProductsModel {
  products: [ { productId: string, quantity: number } ]
  token: string
}

export abstract class BuyProducts {
  abstract buy(products: BuyProductsModel): Promise<BuyProductsResponse>
}