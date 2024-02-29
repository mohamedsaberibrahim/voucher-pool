import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('special-offer')
@ApiTags('Special Offer')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Post()
  create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    return this.specialOfferService.create(createSpecialOfferDto);
  }

  @Get()
  findAll() {
    return this.specialOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialOfferService.findOne(+id);
  }
}
