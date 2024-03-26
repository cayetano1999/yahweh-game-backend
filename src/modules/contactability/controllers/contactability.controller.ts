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
import { EvaluationResultDto } from '../dtos/evluation-result.dto';
import { ContactabilityService } from '../services/contactability/contactability.service';

@Controller('contactability')
@ApiTags('contactability')
export class ContactabilityController {
  constructor(private readonly _service: ContactabilityService) {}

  @Get('get-templates')
  @ApiOperation({ summary: 'Get All Notification Templates' })
  @ApiResponse({
    status: 200,
    description: 'Returned all notification templates',
  })
  async getAllPromotions(
  ): Promise<any> {
    const result =  await this._service.getPaginated();
    console.log('result', result)
    return result;
  }

  // @Get('get-templates-by-id')
  // get(
  //   @Param('id') id: string,
  // ): Promise<any> {
  //   // return this._service.update(id, promotion);
  //   return this._service.getPaginated();
  // }

  //No es necesario
  
  
}
