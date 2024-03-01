import { CustomerEntity } from '../../customer/entities/customer.entity';
import { SpecialOfferEntity } from '../../special-offer/entities/special-offer.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'vouchers' })
@Unique(['specialOfferId', 'customerId']) // This will create a unique constraint on the specialOfferId and customerId columns
export class VoucherEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  code: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column('number', { nullable: true })
  customerId: number;

  @ManyToOne(() => SpecialOfferEntity)
  @JoinColumn({ name: 'specialOfferId' })
  specialOffer: SpecialOfferEntity;

  @Column('number', { nullable: true })
  specialOfferId: number;

  @Column({ nullable: true })
  expiryAt: Date;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  usedAt: Date;
}
