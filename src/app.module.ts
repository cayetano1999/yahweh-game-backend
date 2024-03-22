import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { IntegrationModule } from './modules/integration/integration.module';
import databaseConfig from './modules/common/database/config/database.config';
import keycloakConfig from './modules/auth/config/keycloak.config';
import rabbitConfig from './modules/common/rabbit/config/rabbit.config';
import httpConfig from './modules/common/http/config/htttp.config';
import cacheConfig from './modules/common/cache/config/cache.config';
import enviroment from './modules/common/config/config.module';
import { RuleModule } from './modules/rule/rule.module';
import { PromotionModule } from './modules/promotion/promotion.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        databaseConfig,
        cacheConfig,
        keycloakConfig,
        rabbitConfig,
        httpConfig,
      ],
      validate: enviroment,
      validationOptions: {
        abortEarly: true,
      },
      envFilePath: '.env',
    }),
    CommonModule,
    AuthModule,
    IntegrationModule,
    RuleModule,
    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
