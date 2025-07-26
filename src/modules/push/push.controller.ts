import { Body, Controller, Post } from '@nestjs/common';
import { PushService } from './push.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ example: ['fcm_token_1', 'fcm_token_2'] })
  tokens: string[];

  @ApiProperty({ example: 'Título de prueba' })
  title: string;

  @ApiProperty({ example: 'Este es el cuerpo del mensaje' })
  body: string;

  @ApiProperty({
    example: { tipo: 'alerta', id: '123' },
    required: false,
  })
  data?: any;
}

@Controller('push')
@ApiTags('Push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar notificación push' })
  @ApiResponse({ status: 201, description: 'Notificación enviada' })
  sendNotification(@Body() body: SendNotificationDto) {
    const { tokens, title, body: messageBody, data } = body;
    return this.pushService.sendPushNotification(tokens, title, messageBody, data);
  }
}
