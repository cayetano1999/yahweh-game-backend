import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PromotionDto } from './dtos/promotion.dto';
import { RuleModule } from '../rule/rule.module';
import { RabbitService } from '../common/rabbit/services/rabbit/rabbit.service';
import { RabbitListenerService } from '../common/rabbit/services/rabbit/rabbitListenService.service';
import { ContactabilityService } from './services/contactability/contactability.service';
import { ContactabilityController } from './controllers/contactability.controller';


@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [ContactabilityController],
  providers: [
    ContactabilityService,
    RabbitService,
  ],
})
export class ContactabilityModule {}
