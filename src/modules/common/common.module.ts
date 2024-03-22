import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModuleConfig } from './http/http.module';
import { LoggerModule } from './logger/logger.module';
import { HttpRequestMiddleware } from './middleware/RequestMiddleware';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [DatabaseModule, HttpModuleConfig, LoggerModule, RabbitModule],
  exports: [CommonModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestMiddleware).forRoutes('/');
  }
}
