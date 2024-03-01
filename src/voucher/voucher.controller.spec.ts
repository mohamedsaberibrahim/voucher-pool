import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { DataSource } from 'typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

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
const mockVoucherService = {
  create: jest.fn().mockImplementation((createVoucherDto: CreateVoucherDto) => {
    return {
      id: 1,
      ...createVoucherDto,
    };
  }),
  findAllByCustomerEmail: jest.fn().mockReturnValue([
    { id: 1, code: 'VOUCHER1' },
    { id: 2, code: 'VOUCHER2' },
  ]),
  findOne: jest.fn().mockImplementation((id: number) => {
    return { id, code: 'VOUCHER1' };
  }),
  redeem: jest.fn().mockImplementation((code: string, email: string) => {
    return {
      code,
      email,
      redeemed: true,
    };
  }),
  validate: jest.fn().mockImplementation((code: string, email: string) => {
    return {
      code,
      email,
      valid: true,
    };
  }),
};

describe('VoucherController', () => {
  let controller: VoucherController;
  let voucherService: VoucherService;
  let dataSourceMock: MockType<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 3,
          },
        ]),
      ],
      controllers: [VoucherController],
      providers: [
        VoucherService,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ], // Add the DataSource provider
    })
      .overrideProvider(VoucherService)
      .useValue(mockVoucherService)
      .compile();

    controller = module.get<VoucherController>(VoucherController);
    voucherService = module.get<VoucherService>(VoucherService);
    dataSourceMock = module.get(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(dataSourceMock).toBeDefined();
  });

  describe('create', () => {
    it('should create a new voucher', () => {
      const createVoucherDto: CreateVoucherDto = {
        expiryAt: new Date('2024-03-30'),
        specialOfferId: 1,
      };

      const createdVoucher = controller.create(createVoucherDto);
      expect(createdVoucher).toEqual({
        expiryAt: new Date('2024-03-30'),
        specialOfferId: 1,
        id: 1,
      });
      expect(voucherService.create).toHaveBeenCalledWith(createVoucherDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of vouchers for the specified email', () => {
      const email = 'example@example.com';

      const vouchers = controller.findAll(email);

      expect(vouchers).toEqual([
        { id: 1, code: 'VOUCHER1' },
        { id: 2, code: 'VOUCHER2' },
      ]);
      expect(voucherService.findAllByCustomerEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('findOne', () => {
    it('should return the voucher with the specified ID', () => {
      const voucherId = '1';

      const voucher = controller.findOne(voucherId);

      expect(voucher).toEqual({ id: 1, code: 'VOUCHER1' });
      expect(voucherService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('redeem', () => {
    it('should redeem the voucher with the specified code and email', () => {
      const code = 'VOUCHER1';
      const email = 'example@example.com';

      const result = controller.redeem(code, email);

      expect(result).toEqual({
        code: 'VOUCHER1',
        email: 'example@example.com',
        redeemed: true,
      });
      expect(voucherService.redeem).toHaveBeenCalledWith(code, email);
    });
  });

  describe('validate', () => {
    it('should validate the voucher with the specified code and email', () => {
      const code = 'VOUCHER1';
      const email = 'example@example.com';

      const result = controller.validate(code, email);

      expect(result).toEqual({
        code: 'VOUCHER1',
        email: 'example@example.com',
        valid: true,
      });
      expect(voucherService.validate).toHaveBeenCalledWith(code, email);
    });
  });
});
