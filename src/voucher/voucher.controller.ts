import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('voucher')
@ApiTags('Voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(+id);
  }
}
