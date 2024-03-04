import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IntegrationService } from '../services/integration.service';
import { Integration } from '../interfaces/integration.interface';

@ApiTags('integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly _service: IntegrationService) {}

  @Post()
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
  addIntegration(): Promise<Integration[]> {
    return this._service.getAll();
  }
}
