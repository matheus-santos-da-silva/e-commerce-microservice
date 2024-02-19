import { Customer } from '../../../domain/models/customer';

export interface CustomerRepository {
  create(customer: Customer): Promise<void>
}