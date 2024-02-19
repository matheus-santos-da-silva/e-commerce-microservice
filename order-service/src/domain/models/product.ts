interface ProductProps { 
  name: string
  price: number
  code: string
}

export class Product {
  id!: string;
  name: string;
  price: number;
  code: string;

  constructor({ code, name, price }: ProductProps) {
    this.code = code;
    this.name = name;
    this.price = price;
  }
}