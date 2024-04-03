import { HttpExceptionFilter } from './modules/common/filters/exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger } from './modules/common/logger/services/logger/logger.service';
import { setupSwagger } from './modules/common/swagger/swagger.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthService } from './modules/auth/services/auth.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useLogger(new Logger(configService));
  if (configService.get('ENABLE_DOCUMENTATION') === 'true') {
    setupSwagger(app);
  }
  app.useGlobalFilters(new HttpExceptionFilter());
  if (configService.get('ENABLE_CORS') === 'true') {
    const ORIGINS: string[] = configService.get<string>('ORIGIN').split(',');
    const CORS_METHODS: string[] = configService
      .get<string>('CORS_METHODS')
      .split(',');
    app.enableCors({
      origin: ORIGINS,
      methods: CORS_METHODS,
      credentials: true,
      preflightContinue: false,
    });
  }
  if (configService.get<string>('USE_AUTH') === 'true') {
    const authService = app.get(AuthService);
    app.useGlobalGuards(new JwtAuthGuard(authService));
  }
  const appPort = configService.get<number>('PORT');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appPort);
}
bootstrap();
