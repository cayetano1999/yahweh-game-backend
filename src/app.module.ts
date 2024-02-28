
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './modules/common/database/config/database.config';
import keycloakConfig from './modules/auth/config/keycloak.config';
import rabbitConfig from './modules/common/rabbit/config/rabbit.config';
import htttpConfig from './modules/common/http/config/htttp.config';
import cacheConfig from './modules/common/cache/config/cache.config';
import enviroment from './modules/common/config/config.module';
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
        htttpConfig,
      ],
      validate: enviroment,
      validationOptions:{
        abortEarly: true
      },
      envFilePath: '.env',
    }),
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
