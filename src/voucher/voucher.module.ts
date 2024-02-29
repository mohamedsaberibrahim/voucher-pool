import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { VoucherEntity } from './entities/voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { SpecialOfferEntity } from 'src/special-offer/entities/special-offer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { SpecialOfferService } from 'src/special-offer/special-offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VoucherEntity,
      CustomerEntity,
      SpecialOfferEntity,
    ]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService, CustomerService, SpecialOfferService],
})
export class VoucherModule {}
