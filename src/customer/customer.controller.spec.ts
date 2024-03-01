import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

const mockCustomerService = {
  create: jest
    .fn()
    .mockImplementation((createCustomerDto: CreateCustomerDto) => {
      return {
        id: 1,
        ...createCustomerDto,
      };
    }),
  findAll: jest.fn().mockReturnValue([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]),
  findOneById: jest.fn().mockImplementation((id: number) => {
    return { id, name: 'John Doe' };
  }),
};

describe('CustomerController', () => {
  let controller: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    controller = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const createdCustomer = controller.create(createCustomerDto);

      expect(createdCustomer).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(customerService.create).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', () => {
      const customers = controller.findAll();

      expect(customers).toEqual([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ]);
      expect(customerService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the customer with the specified ID', () => {
      const customerId = '1';

      const customer = controller.findOne(customerId);

      expect(customer).toEqual({ id: 1, name: 'John Doe' });
      expect(customerService.findOneById).toHaveBeenCalledWith(1);
    });
  });
});
