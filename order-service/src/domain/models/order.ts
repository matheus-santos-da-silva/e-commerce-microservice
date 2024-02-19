import { Customer } from './customer';
import { OrderItems } from './order-items';

interface OrderProps { 
  total: number
  customer: Customer
  orderItems: OrderItems[]
}

export class Order {
  id!: string;
  total: number;
  customer: Customer;
  orderItems: OrderItems[];

  constructor({ customer, orderItems, total }: OrderProps) {
    this.customer = customer;
    this.orderItems = orderItems;
    this.total = total;
  }
}