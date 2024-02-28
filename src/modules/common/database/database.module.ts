import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
@Module({
      imports:[
        TypeOrmModule.forRootAsync({
            imports: [
              ConfigModule.forRoot({
                load: [databaseConfig],
              }),
            ],
            useFactory: async (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService],
          }),
      ],
      exports:[DatabaseModule]
})
export class DatabaseModule {}
