import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../services/customer.service';
import { LandingDto } from '../dtos/landing.dto';
import { CustomerPromotionDto } from '../dtos/customer-promotion.dto';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly _service: CustomerService) { }

  @Post(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Promotions for a customer' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing valid Promotions for a customer',
  })
  getAllPromotions(
    @Param('id') id: string,
    @Body() payload: any,
  ): Promise<LandingDto[]> {
    return this._service.GetValidPromotionsLandings(id, payload);
  }

  @Put("action")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register interaction between customer and promotions' })
  @ApiResponse({
    status: 200,
    description: 'Action registered successfully',
  })
  saveAction(
    @Body() payload: CustomerPromotionDto,
  ) {
    const {promotionId, customerId, action} = payload;
    return this._service.RegisterAction(customerId, promotionId, action);
  }
}
