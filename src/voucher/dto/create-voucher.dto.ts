import { ApiProperty } from '@nestjs/swagger';

export class CreateVoucherDto {
  @ApiProperty()
  specialOfferId: number;

  @ApiProperty()
  expiryAt: Date;
}
