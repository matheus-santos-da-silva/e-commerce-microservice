interface CustomerProps { 
  name: string
  email: string
  id: string
  externalId: string
}

export class Customer {
  id!: string;
  name: string;
  email: string;
  externalId: string;

  constructor({ name, email, externalId }: CustomerProps) {
    this.name = name;
    this.email = email;
    this.externalId = externalId;
  }
}