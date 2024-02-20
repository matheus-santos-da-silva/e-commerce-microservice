export interface BuyProductsRepository {
  checkProductsStock(products: [ { productId: string, quantity: number } ]): Promise<boolean>
}