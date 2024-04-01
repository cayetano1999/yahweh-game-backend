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
import { ActionsDto } from '../dtos/actions.dto';
import { Actions } from '../interfaces/actions.interface';
import { ActionsService } from '../services/actions/actions.service';

@Controller('actions')
@ApiTags('actions')
export class ActionsController {
  constructor(private readonly _service: ActionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Actions paginated documents' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing Actions paginated',
  })
  getAllActions(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Actions[]> {
    return this._service.getPaginated(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Add Actions to the database' })
  @ApiBody({ type: ActionsDto })
  @ApiResponse({
    status: 200,
    description: 'Actions created',
  })
  addActions(@Body() promotion: ActionsDto): Promise<Actions> {
    return this._service.add(promotion);
  }

  @Put(':id')
  @ApiBody({ type: ActionsDto })
  @ApiOperation({ summary: 'Update existing Actions' })
  @ApiResponse({
    status: 200,
    description: 'Actions created',
  })
  @ApiResponse({
    status: 404,
    description: 'Actions not found',
  })
  update(
    @Param('id') id: string,
    @Body() promotion: ActionsDto,
  ): Promise<Actions> {
    return this._service.update(id, promotion);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing Actions' })
  @ApiResponse({
    status: 200,
    description: 'Actions created',
  })
  @ApiResponse({
    status: 404,
    description: 'Actions not found',
  })
  delete(@Param('id') id: string): Promise<Actions> {
    return this._service.delete(id);
  }

}
