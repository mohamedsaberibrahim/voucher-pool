import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'specialOffers' })
export class SpecialOfferEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column('decimal', { precision: 4, scale: 2 })
  percentage: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
