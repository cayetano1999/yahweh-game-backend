import { Injectable } from '@nestjs/common';
import { EventManager } from '@apap/event-manager';

@Injectable()
export class RabbitListenerService {
  constructor(private readonly eventManager: EventManager) {}

  async listenToEvents(): Promise<void> {
    await this.eventManager.on('CONTACTABILITY_GET_TEMPLATE_RESPONSE', async (data) => {
    });
  }
}