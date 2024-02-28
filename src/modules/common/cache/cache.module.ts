import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis-cluster';
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('cache'),
      inject: [ConfigService],
    }),
  ]
})
export class CacheManagerModule {}
