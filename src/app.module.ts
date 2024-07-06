import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
// import databaseConfig from './modules/common/database/config/database.config';
import httpConfig from './modules/common/http/config/htttp.config';
import cacheConfig from './modules/common/cache/config/cache.config';
import enviroment from './modules/common/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { SwaggerModule } from '@nestjs/swagger';
import { LevelModule } from './modules/level/level.module';
import { QuestionModule } from './modules/question/question.module';
import { FeedBackModule } from './modules/feedback/feedback.module';
import { PlayerModule } from './modules/player/player.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { TeamModule } from './modules/team/team.module';
import { ChurchModule } from './modules/church/church.module';
import { ShiftModule } from './modules/shift/shift.module';
import { GameModule } from './modules/game/game.module';
import { InningModule } from './modules/inning/inning.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        // databaseConfig,
        cacheConfig,
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'cayetano',
      password: process.env.DATABASE_PASSWORD || 'ada35111ff',
      database: process.env.DATABASE_NAME || 'yahweh-game',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // No usar en producción: puede perder datos.
    }),
    SwaggerModule,
    UsersModule,
    LevelModule,
    QuestionModule,
    FeedBackModule,
    PlayerModule,
    ChapterModule,
    TeamModule,
    ChurchModule,
    ShiftModule,
    GameModule,
    InningModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
 
}
