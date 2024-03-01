import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialOfferDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  percentage: number;
}
