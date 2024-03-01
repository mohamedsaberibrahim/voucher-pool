import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { SpecialOfferEntity } from './entities/special-offer.entity';

const mockSpecialOfferRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
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

  describe('create', () => {
    it('should create a new special offer', async () => {
      const createSpecialOfferDto: CreateSpecialOfferDto = {
        name: 'Special Offer 1',
        percentage: 10,
      };

      const createdSpecialOffer: SpecialOfferEntity = {
        id: 1,
        name: 'Special Offer 1',
        percentage: 10,
        createdAt: new Date(),
        updatedAt: null,
      };

      mockSpecialOfferRepository.create.mockReturnValue(createSpecialOfferDto);
      mockSpecialOfferRepository.save.mockReturnValue(createdSpecialOffer);

      const result = await service.create(createSpecialOfferDto);

      expect(result).toEqual(createdSpecialOffer);
      expect(mockSpecialOfferRepository.create).toHaveBeenCalledWith({
        ...createSpecialOfferDto,
        createdAt: expect.any(Date),
      });
      expect(mockSpecialOfferRepository.save).toHaveBeenCalledWith(
        createSpecialOfferDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of special offers', async () => {
      const specialOffers: SpecialOfferEntity[] = [
        {
          id: 1,
          name: 'Special Offer 1',
          percentage: 10,
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: 2,
          name: 'Special Offer 2',
          percentage: 20,
          createdAt: new Date(),
          updatedAt: null,
        },
      ];

      mockSpecialOfferRepository.find.mockReturnValue(specialOffers);

      const result = await service.findAll();

      expect(result).toEqual(specialOffers);
      expect(mockSpecialOfferRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the special offer with the specified ID', async () => {
      const specialOfferId = 1;

      const specialOffer: SpecialOfferEntity = {
        id: specialOfferId,
        name: 'Special Offer 1',
        percentage: 10,
        createdAt: new Date(),
        updatedAt: null,
      };

      mockSpecialOfferRepository.findOneBy.mockReturnValue(specialOffer);

      const result = await service.findOne(specialOfferId);

      expect(result).toEqual(specialOffer);
      expect(mockSpecialOfferRepository.findOneBy).toHaveBeenCalledWith({
        id: specialOfferId,
      });
    });
  });
});
