export interface BuyProductsRepository {
  checkProductsStock(products: [{ quantity: number, price: number, code: string, name: string }]): Promise<boolean>
}