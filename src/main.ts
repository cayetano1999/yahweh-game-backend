import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './modules/common/swagger/swagger.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthService } from './modules/auth/services/auth.service';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import bodyParser from 'body-parser';
import { json } from 'body-parser';
import * as cors from 'cors'; // Importa el módulo cors
async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '50mb' })); // Ajusta el límite según tus necesidades
  const configService = app.get(ConfigService);
  // if (configService.get('ENABLE_DOCUMENTATION') === 'true') {
    setupSwagger(app);
  // }

  if (configService.get<string>('USE_AUTH') === 'true') {
    const authService = app.get(AuthService);
    app.useGlobalGuards(new JwtAuthGuard(authService));
  }
  const appPort = configService.get<number>('PORT');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors())
  await app.listen(8080);
}
bootstrap();
