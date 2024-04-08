import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/common/database/database.module';
import { IntegrationController } from './controllers/integration.controller';
import { IntegrationService } from './services/integration.service';
import { integrationProviders } from './providers/integration.provider';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  exports: [IntegrationService],
  controllers: [IntegrationController],
  providers: [IntegrationService, ...integrationProviders],
})
export class IntegrationModule {}
