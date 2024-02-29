import { Injectable } from '@nestjs/common';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { SpecialOfferEntity } from './entities/special-offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpecialOfferService {
  constructor(
    @InjectRepository(SpecialOfferEntity)
    private specialOfferRepository: Repository<SpecialOfferEntity>,
  ) {}

  create(createSpecialOfferDto: CreateSpecialOfferDto) {
    const newOffer = this.specialOfferRepository.create({
      ...createSpecialOfferDto,
      createdAt: new Date(),
    });
    return this.specialOfferRepository.save(newOffer);
  }

  findAll() {
    return this.specialOfferRepository.find();
  }

  findOne(id: number) {
    return this.specialOfferRepository.findOneBy({ id });
  }
}
