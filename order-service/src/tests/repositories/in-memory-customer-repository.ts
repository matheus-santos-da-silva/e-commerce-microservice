import { CreateCustomerModel, CustomerRepository } from '../../data/protocols/customer/db-customer-repository';
import { Customer } from '../../domain/models/customer';
import { randomUUID } from 'node:crypto';

export class InMemoryCustomerRepository implements CustomerRepository {

  items: Customer[] = [];

  async create(customer: CreateCustomerModel): Promise<Customer> {
    const newCustomer = { id: randomUUID(), ...customer };
    this.items.push(newCustomer);
    return newCustomer;
  }
}
  