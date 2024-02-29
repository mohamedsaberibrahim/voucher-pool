import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { SpecialOfferModule } from './special-offer/special-offer.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'rails_user',
      password: 'secretpass',
      database: 'simple_cms_development',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CustomerModule,
    SpecialOfferModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
