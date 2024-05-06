import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RuleModule } from '../rule/rule.module';
import { RabbitService } from '../common/rabbit/services/rabbit/rabbit.service';
import { iconProvider } from './provider/icon.provider';
import { IconDto } from './dtos/icon.dto';
import { IconService } from './services/actions/icon.service';
import { IconController } from './controllers/icon.controller';

@Module({
  imports: [DatabaseModule, LoggerModule, RuleModule],
  exports: [IconService],
  controllers: [IconController],
  providers: [
    IconService,
    ...iconProvider,
    IconDto,
    RabbitService,
  ],
})
export class IconModule {}
