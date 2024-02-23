export interface BuyProductsResponse {
  message: string
  statusCode: number
}

export interface BuyProductsModel {
  products: [{ code: string, name: string, quantity: number, price: number }]
  token: string
}

export abstract class BuyProducts {
  abstract buy(products: BuyProductsModel): Promise<BuyProductsResponse>
}