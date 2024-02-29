import { Module } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferEntity } from './entities/special-offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialOfferEntity])],
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService],
})
export class SpecialOfferModule {}
