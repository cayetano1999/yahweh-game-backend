import { ApiProperty } from '@nestjs/swagger';

export class IconDto {
  @ApiProperty()
  iconName: string;
  @ApiProperty()
  iconAppName: string;
  @ApiProperty()
  file: any;
}
