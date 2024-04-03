import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controller/customer.controller';
import { customerProvider } from './providers/customer.provider';
import { PromotionModule } from '../promotion/promotion.module';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerModule } from '../common/logger/logger.module';
import { ContactabilityModule } from '../contactability/contactability.module';
import { ActionsModule } from '../actions/actions.module';

@Module({
  imports: [PromotionModule, DatabaseModule, LoggerModule, ContactabilityModule, ActionsModule],
  providers: [CustomerService, ...customerProvider],
  controllers: [CustomerController],
})
export class CustomerModule {}
