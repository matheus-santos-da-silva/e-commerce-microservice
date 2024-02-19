import { Product } from './product';

interface OrderItemsProps { 
  product: Product
  orderId: string
  quantity: number
}

export class OrderItems {
  id!: string;
  product: Product;
  quantity: number;
  orderId: string;

  constructor({ product, quantity, orderId }: OrderItemsProps) {
    this.product = product;
    this.quantity = quantity;
    this.orderId = orderId;
  }
}