import { Test, TestingModule } from '@nestjs/testing';
import { VoucherService } from './voucher.service';
import { CustomerService } from '../customer/customer.service';
import { SpecialOfferService } from '../special-offer/special-offer.service';

const mockVoucherRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('VoucherService', () => {
  let service: VoucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoucherService,
        CustomerService,
        SpecialOfferService,
        {
          provide: 'VoucherEntityRepository',
          useValue: mockVoucherRepository,
        },
        {
          provide: 'CustomerEntityRepository',
          useValue: {},
        },
        {
          provide: 'SpecialOfferEntityRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VoucherService>(VoucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
