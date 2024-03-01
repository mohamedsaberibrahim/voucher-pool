import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

const mockCustomerRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: 'CustomerEntityRepository',
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const createdCustomer: CustomerEntity = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: null,
      };

      mockCustomerRepository.create.mockReturnValue(createCustomerDto);
      mockCustomerRepository.save.mockReturnValue(createdCustomer);

      const result = await service.create(createCustomerDto);

      expect(result).toEqual(createdCustomer);
      expect(mockCustomerRepository.create).toHaveBeenCalledWith({
        ...createCustomerDto,
        createdAt: expect.any(Date),
      });
      expect(mockCustomerRepository.save).toHaveBeenCalledWith(
        createCustomerDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers: CustomerEntity[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      mockCustomerRepository.find.mockReturnValue(customers);

      const result = await service.findAll();

      expect(result).toEqual(customers);
      expect(mockCustomerRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should return the customer with the specified ID', async () => {
      const customerId = 1;

      const customer: CustomerEntity = {
        id: customerId,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: null,
      };

      mockCustomerRepository.findOneBy.mockReturnValue(customer);

      const result = await service.findOneById(customerId);

      expect(result).toEqual(customer);
      expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({
        id: customerId,
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should return the customer with the specified email', async () => {
      const email = 'john@example.com';

      const customer: CustomerEntity = {
        id: 1,
        name: 'John Doe',
        email: email,
        createdAt: new Date(),
        updatedAt: null,
      };

      mockCustomerRepository.findOneBy.mockReturnValue(customer);

      const result = await service.findOneByEmail(email);

      expect(result).toEqual(customer);
      expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({
        email,
      });
    });
  });
});
