import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { IconDto } from '../dtos/icon.dto';
import { Icon } from '../interfaces/actions.interface';
import { IconService } from '../services/actions/icon.service';

@Controller('icon')
@ApiTags('icon')
export class IconController {
  constructor(private readonly _service: IconService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Icon paginated documents' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing Icon paginated',
  })
  getAllIcons(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Icon[]> {
    return this._service.getPaginated(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Add Icon to the database' })
  @ApiBody({ type: IconDto })
  @ApiResponse({
    status: 200,
    description: 'Icon created',
  })
  addActions(@Body() icon: IconDto): Promise<Icon> {
    return this._service.add(icon);
  }

  @Put(':id')
  @ApiBody({ type: IconDto })
  @ApiOperation({ summary: 'Update existing Icon' })
  @ApiResponse({
    status: 200,
    description: 'Icon created',
  })
  @ApiResponse({
    status: 404,
    description: 'Icon not found',
  })
  update(
    @Param('id') id: string,
    @Body() icon: IconDto,
  ): Promise<Icon> {
    return this._service.update(id, icon);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing Icon' })
  @ApiResponse({
    status: 200,
    description: 'Icon created',
  })
  @ApiResponse({
    status: 404,
    description: 'Icon not found',
  })
  delete(@Param('id') id: string): Promise<Icon> {
    return this._service.delete(id);
  }

}
