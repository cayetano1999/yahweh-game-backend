import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            timeout: config.get<number>('http.timeout'),
            maxRedirects: config.get<number>('http.maxRedirects'),
          }),
          inject: [ConfigService]
        }),
      ],
      exports:[HttpModuleConfig]
})
export class HttpModuleConfig {}
