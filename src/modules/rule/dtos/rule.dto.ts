import { ApiProperty } from '@nestjs/swagger';
import { RuleFact } from '../interfaces/rule-fact.interface';

export class RuleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: any;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createBy: string;
  @ApiProperty()
  updateBy: string;
  @ApiProperty()
  ruleFacts: RuleFact[] | any;
  @ApiProperty()
  description: string;
}
