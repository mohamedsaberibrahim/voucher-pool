import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';

const mockSpecialOfferService = {
  create: jest
    .fn()
    .mockImplementation((createSpecialOfferDto: CreateSpecialOfferDto) => {
      return {
        id: 1,
        ...createSpecialOfferDto,
      };
    }),
  findAll: jest.fn().mockReturnValue([
    { id: 1, name: 'Special Offer 1' },
    { id: 2, name: 'Special Offer 2' },
  ]),
  findOne: jest.fn().mockImplementation((id: number) => {
    return { id, name: 'Special Offer 1' };
  }),
};

describe('SpecialOfferController', () => {
  let controller: SpecialOfferController;
  let specialOfferService: SpecialOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferController],
      providers: [SpecialOfferService],
    })
      .overrideProvider(SpecialOfferService)
      .useValue(mockSpecialOfferService)
      .compile();

    controller = module.get<SpecialOfferController>(SpecialOfferController);
    specialOfferService = module.get<SpecialOfferService>(SpecialOfferService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new special offer', () => {
      const createSpecialOfferDto: CreateSpecialOfferDto = {
        name: 'Special Offer 1',
        percentage: 10,
      };

      const createdSpecialOffer = controller.create(createSpecialOfferDto);

      expect(createdSpecialOffer).toEqual({
        id: 1,
        name: 'Special Offer 1',
        percentage: 10,
      });
      expect(specialOfferService.create).toHaveBeenCalledWith(
        createSpecialOfferDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of special offers', () => {
      const specialOffers = controller.findAll();

      expect(specialOffers).toEqual([
        { id: 1, name: 'Special Offer 1' },
        { id: 2, name: 'Special Offer 2' },
      ]);
      expect(specialOfferService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the special offer with the specified ID', () => {
      const specialOfferId = '1';

      const specialOffer = controller.findOne(specialOfferId);

      expect(specialOffer).toEqual({ id: 1, name: 'Special Offer 1' });
      expect(specialOfferService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
