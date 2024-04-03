import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../services/customer.service';
import { PromotionDto } from 'src/modules/promotion/dtos/promotion.dto';
import { LandingDto } from '../dtos/landing.dto';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly _service: CustomerService) { }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Promotions for a customer' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing Promotions for a customer',
  })
  getAllPromotions(
    @Param('id') id: string,
    @Body() parameters: PromotionDto,
  ): Promise<LandingDto[]> {
    return this._service.GetValidPromotionsLandings(id, parameters);
  }
}
