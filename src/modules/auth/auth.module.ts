import { RabbitService } from './../common/rabbit/services/rabbit/rabbit.service';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Module({
    providers: [AuthService,RabbitService]
})
export class AuthModule {}
