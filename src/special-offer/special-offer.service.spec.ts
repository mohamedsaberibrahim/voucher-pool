import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferService } from './special-offer.service';

const mockSpecialOfferRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('SpecialOfferService', () => {
  let service: SpecialOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialOfferService,
        {
          provide: 'SpecialOfferEntityRepository',
          useValue: mockSpecialOfferRepository,
        },
      ],
    }).compile();

    service = module.get<SpecialOfferService>(SpecialOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
