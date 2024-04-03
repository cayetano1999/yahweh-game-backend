import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RuleModule } from '../rule/rule.module';
import { RabbitService } from '../common/rabbit/services/rabbit/rabbit.service';
import { ActionsController } from './controllers/actions.controller';
import { ActionsDto } from './dtos/actions.dto';
import { ActionsService } from './services/actions/actions.service';
import { acctionsProvider } from './provider/actions.provider';

@Module({
  imports: [DatabaseModule, LoggerModule, RuleModule],
  exports: [ActionsService],
  controllers: [ActionsController],
  providers: [
    ActionsService,
    ...acctionsProvider,
    ActionsDto,
    PaginationQueryDto,
    RabbitService,
  ],
})
export class ActionsModule {}
