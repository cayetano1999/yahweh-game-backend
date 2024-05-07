import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IntegrationService } from '../services/integration.service';
import { Integration } from '../interfaces/integration.interface';
import { IntegrationDto } from '../dtos/integration-dto';

@ApiTags('integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly _service: IntegrationService) {}

  @Post("/configure")
  @ApiOperation({ summary: 'Configure default integrations' })
  @ApiResponse({
    status: 200,
    description: 'Deletes and recreate all default integrations',
  })
  getIntegrations(): Promise<Integration> {
    return this._service.configure();
  }

  @Get()
  @ApiOperation({ summary: 'Get All integrations documents' })
  @ApiResponse({ status: 200, description: 'Returned all existing documents' })
  getIntegration(): Promise<Integration[]> {
    return this._service.getAll();
  }

  @Post('/create')
  @ApiOperation({ summary: 'Add integration to the database' })
  @ApiBody({ type: IntegrationDto })
  @ApiResponse({
    status: 200,
    description: 'integration created',
  })
  addIntegration(@Body() integration: IntegrationDto): Promise<Integration> {
    return this._service.addIntegration(integration);
  }

  @Put(':id')
  @ApiBody({ type: IntegrationDto })
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
    @Body() integration: Integration,
  ): Promise<Integration> {
    return this._service.updateIntegration(id, integration);
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
  delete(@Param('id') id: string): Promise<Integration> {
    return this._service.deleteIntegration(id);
  }


}
