import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PromotionController } from './controllers/promotion.controller';
import { PromotionService } from './services/promotion/promotion.service';
import { promotionProvider } from './provider/promotion.provider';
import { PromotionDto } from './dtos/promotion.dto';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [PromotionController],
  providers: [PromotionService, ...promotionProvider, PromotionDto, PaginationQueryDto],
})
export class PromotionModule {}
