import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferService } from './special-offer.service';

const mockSpecialOfferService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('SpecialOfferController', () => {
  let controller: SpecialOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferController],
      providers: [SpecialOfferService],
    })
      .overrideProvider(SpecialOfferService)
      .useValue(mockSpecialOfferService)
      .compile();

    controller = module.get<SpecialOfferController>(SpecialOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
