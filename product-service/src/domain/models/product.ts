interface ProductProps { 
  name: string
  price: number
  code: string
  quantity: number
}

export class Product {
  id!: string;
  name: string;
  price: number;
  code: string;
  quantity: number;

  constructor({ code, name, price, quantity }: ProductProps) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}