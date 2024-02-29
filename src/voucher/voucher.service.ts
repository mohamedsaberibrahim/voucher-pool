import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { VoucherEntity } from './entities/voucher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { SpecialOfferService } from '../special-offer/special-offer.service';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private voucherRepository: Repository<VoucherEntity>,
    private customerService: CustomerService,
    private specialOfferService: SpecialOfferService,
  ) {}

  async create(createVoucherDto: CreateVoucherDto) {
    const customer = await this.customerService.findOne(
      createVoucherDto.customerId,
    );
    if (!customer) {
      throw new Error('Customer not found');
    }
    const specialOffer = await this.specialOfferService.findOne(
      createVoucherDto.specialOfferId,
    );
    if (!specialOffer) {
      throw new Error('Special offer not found');
    }
    const newVoucher = this.voucherRepository.create({
      ...createVoucherDto,
      customer,
      specialOffer,
      code: this._generateCode(8),
      createdAt: new Date(),
    });
    return this.voucherRepository.save(newVoucher);
  }

  findAll() {
    return this.voucherRepository.find();
  }

  findOne(id: number) {
    return this.voucherRepository.findOneBy({ id });
  }

  _generateCode(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
