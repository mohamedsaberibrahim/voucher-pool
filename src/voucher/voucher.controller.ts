import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';

@Controller('voucher')
@ApiTags('Voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.voucherService.findAllByCustomerEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(+id);
  }

  @UseGuards(ThrottlerGuard)
  @Get('redeem/:code')
  redeem(@Param('code') code: string, @Query('email') email: string) {
    return this.voucherService.redeem(code, email);
  }

  @UseGuards(ThrottlerGuard)
  @Get('validate/:code')
  validate(@Param('code') code: string, @Query('email') email: string) {
    return this.voucherService.validate(code, email);
  }
}
