import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/common/database/database.module';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { integrationProviders } from './integration.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [IntegrationController],
  providers: [IntegrationService, ...integrationProviders],
})
export class IntegrationModule {}
