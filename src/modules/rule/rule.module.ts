import { Module } from '@nestjs/common';
import { RuleController } from './controllers/rule.controller';
import { RuleService } from './services/rule/rule.service';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { ruleProvider } from './provider/rule.provider';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RuleDto } from './dtos/rule.dto';

@Module({
  imports: [DatabaseModule, LoggerModule],
  exports: [RuleService],
  controllers: [RuleController],
  providers: [RuleService, ...ruleProvider, RuleDto, PaginationQueryDto],
})
export class RuleModule {}
