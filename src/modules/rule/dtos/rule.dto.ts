import { ApiProperty } from '@nestjs/swagger';

export class RuleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
}
