import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';

const mockVoucherService = () => ({});

describe('VoucherController', () => {
  let controller: VoucherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [VoucherController],
      providers: [VoucherService],
    })
      .overrideProvider(VoucherService)
      .useValue(mockVoucherService)
      .compile();

    controller = module.get<VoucherController>(VoucherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
