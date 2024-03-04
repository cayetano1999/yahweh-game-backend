import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IntegrationService } from './integration.service';
import { Integration } from './integration.interface';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly _service: IntegrationService) {}

  @Post()
  @ApiOperation({ summary: 'gets hello World message' })
  @ApiResponse({ status: 200, description: 'Hello World!' })
  addIntegration(): Promise<Integration> {
    return this._service.create();
  }
}
