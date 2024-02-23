import { CustomerRepository } from '../../../../data/protocols/customer/db-customer-repository';
import { Customer } from '../../../../domain/models/customer';
import { CustomerModel } from '../../models/customer.schema';

export class CustomerMongoDBRepository implements CustomerRepository {

  constructor(
    private customerModel: typeof CustomerModel
  ) {}

  async create({ email, externalId, name }: Customer): Promise<Customer> {
    const customer = await this.customerModel.create({ email, externalId, name });
    return customer;
  }
}
  