import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModuleConfig } from './http/http.module';
import { HttpRequestMiddleware } from './middleware/RequestMiddleware';

@Module({
  imports: [DatabaseModule, HttpModuleConfig],
  exports:[CommonModule]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestMiddleware).forRoutes('/');
  }
}
