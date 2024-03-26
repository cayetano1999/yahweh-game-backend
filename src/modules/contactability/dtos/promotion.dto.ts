import { ApiProperty } from '@nestjs/swagger';

export class PromotionDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  initialDate: Date;
  @ApiProperty()
  finishDate: Date;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createBy: string;
  @ApiProperty()
  updateBy: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  promotionDetails: any;
  @ApiProperty()
  promotionRules: any;
}
