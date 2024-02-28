import { Module } from '@nestjs/common';
import { Logger } from './services/logger/logger.service';

@Module({
    providers: [Logger],
    exports: [Logger],
})
export class LoggerModule {}
