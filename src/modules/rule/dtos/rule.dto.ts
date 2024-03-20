import { ApiProperty } from '@nestjs/swagger';
import { RuleFact } from '../interfaces/rule-fact.interface';
import { TopLevelCondition } from 'json-rules-engine';

export class RuleDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  condition: TopLevelCondition;
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
