import { RabbitService } from './../common/rabbit/services/rabbit/rabbit.service';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RabbitListenerService } from '../common/rabbit/services/rabbit/rabbitListenService.service';

@Module({
    providers: [AuthService,RabbitService]
})
export class AuthModule {}
