import { Logger } from './../logger/services/logger/logger.service';
import { Module } from '@nestjs/common';
import { RabbitService } from './services/rabbit/rabbit.service';
import { RabbitListenerService } from './services/rabbit/rabbitListenService.service';

@Module({
    providers: [RabbitService,Logger],
    exports:[RabbitService]
})
export class RabbitModule {}
