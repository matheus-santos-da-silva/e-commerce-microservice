import { Customer } from '../../../domain/models/customer';

export interface CreateCustomerModel {
  name: string;
  email: string;
  externalId: string;
}

export interface CustomerRepository {
  create(customer: CreateCustomerModel): Promise<Customer>
}