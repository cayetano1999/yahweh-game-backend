import { ApiProperty } from '@nestjs/swagger';

export class ActionsDto {
  @ApiProperty()
  pageName: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  module: string;
  @ApiProperty()
  requeredState: boolean;
  @ApiProperty()
  btnConfirmText: string;
}
