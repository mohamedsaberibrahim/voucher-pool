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
    const customers = await this.customerService.findAll();
    if (!customers || customers.length === 0) {
      throw new Error('Customer not found');
    }
    const specialOffer = await this.specialOfferService.findOne(
      createVoucherDto.specialOfferId,
    );
    if (!specialOffer) {
      throw new Error('Special offer not found');
    }
    const constructedVoucherObjs = customers.map((customer) => {
      const newVoucher = this.voucherRepository.create({
        ...createVoucherDto,
        customer,
        specialOffer,
        code: this._generateCode(8),
        createdAt: new Date(),
      });
      return newVoucher;
    });
    return this.voucherRepository.save(constructedVoucherObjs);
  }

  async findAllByCustomerEmail(email: string) {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return this.voucherRepository
      .createQueryBuilder('voucher')
      .innerJoinAndSelect(
        'voucher.specialOffer',
        'specialOffer',
        'specialOffer.id = voucher.specialOfferId',
      )
      .where('voucher.customerId = :customerId', { customerId: customer.id })
      .andWhere('voucher.usedAt IS NULL')
      .getMany();
  }

  findOne(id: number) {
    return this.voucherRepository.findOneBy({ id });
  }

  async redeem(code: string, email: string) {
    const voucher = await this.validate(code, email);
    // setting the usedAt date
    voucher.usedAt = new Date();
    voucher.updatedAt = new Date();
    await this.voucherRepository.save(voucher);
    return voucher;
  }

  async validate(code: string, email: string) {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const voucher = await this.voucherRepository.findOne({
      where: { code, customerId: customer.id },
    });
    if (!voucher) {
      throw new Error('Voucher not found');
    }
    if (voucher.usedAt) {
      throw new Error('Voucher already used');
    }
    if (voucher.expiryAt < new Date()) {
      throw new Error('Voucher expired');
    }
    return voucher;
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
