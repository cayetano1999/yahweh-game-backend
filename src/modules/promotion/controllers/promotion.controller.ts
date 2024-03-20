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
import { PromotionDto } from '../dtos/promotion.dto';
import { Promotion } from '../interfaces/promotion.interface';
import { PromotionService } from '../services/promotion/promotion.service';
import { EvaluationResultDto } from '../dtos/evluation-result.dto';

@Controller('promotion')
@ApiTags('promotion')
export class PromotionController {
  constructor(private readonly _service: PromotionService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Promotions paginated documents' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing Promotions paginated',
  })
  getAllPromotions(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Promotion[]> {
    return this._service.getPaginated(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Add Promotion to the database' })
  @ApiBody({ type: PromotionDto })
  @ApiResponse({
    status: 200,
    description: 'Promotion created',
  })
  addPromotion(@Body() promotion: PromotionDto): Promise<Promotion> {
    return this._service.add(promotion);
  }

  @Put(':id')
  @ApiBody({ type: PromotionDto })
  @ApiOperation({ summary: 'Update existing Promotion' })
  @ApiResponse({
    status: 200,
    description: 'Promotion created',
  })
  @ApiResponse({
    status: 404,
    description: 'Promotion not found',
  })
  update(
    @Param('id') id: string,
    @Body() promotion: PromotionDto,
  ): Promise<Promotion> {
    return this._service.update(id, promotion);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing Promotion' })
  @ApiResponse({
    status: 200,
    description: 'Promotion created',
  })
  @ApiResponse({
    status: 404,
    description: 'Promotion not found',
  })
  delete(@Param('id') id: string): Promise<Promotion> {
    return this._service.delete(id);
  }

  @Post(':id/evaluate')
  @ApiOperation({ summary: 'Evaluate an parameters in an existing rule' })
  @ApiResponse({
    status: 200,
    description: 'Promotion rules evaluated',
  })
  evaluate(
    @Param('id') id: string,
    @Body() parameters: PromotionDto,
  ): Promise<EvaluationResultDto> {
    return this._service.evaluate(id, parameters);
  }
}
