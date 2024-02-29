import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const newUser = this.customerRepository.create({
      ...createCustomerDto,
      createdAt: new Date(),
    });
    return this.customerRepository.save(newUser);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOneById(id: number) {
    return this.customerRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.customerRepository.findOneBy({ email });
  }
}
