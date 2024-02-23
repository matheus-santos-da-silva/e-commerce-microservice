export interface CreateOrderModel {
  orderItems: [{ productId: string, quantity: number, price: number, name: string, code: string }]
  customer: { email: string, name: string, externalId: string }
}

export abstract class CreateOrder {
  abstract create(order: CreateOrderModel): Promise<void>
}