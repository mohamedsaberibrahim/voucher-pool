import { Test, TestingModule } from '@nestjs/testing';
import { VoucherService } from './voucher.service';
import { CustomerService } from '../customer/customer.service';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { DataSource } from 'typeorm';

const mockVoucherRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    createQueryRunner: jest.fn().mockImplementation(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      release: jest.fn(),
      rollbackTransaction: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    })),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

describe('VoucherService', () => {
  let service: VoucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoucherService,
        CustomerService,
        SpecialOfferService,
        { provide: DataSource, useFactory: dataSourceMockFactory },
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
