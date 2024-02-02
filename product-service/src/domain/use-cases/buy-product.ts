export interface BuyProductModel {
  products_ids: string[]
}

export abstract class BuyProduct {
  abstract buy(products: BuyProductModel): Promise<void>
}