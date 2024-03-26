import { Injectable } from '@nestjs/common';
import { TokenValidator } from '@apap/token-manager';
import { EventManager } from '@apap/event-manager';
import { Encryptor } from '@apap/encryptor';
import { resolve } from 'path';
import { rejects } from 'assert';
import { CONTACTABILITY_EVENTS } from 'src/modules/common/events/contactability-events';

type EmitPayloadDataType = { data; action?: string; token?: string };

export type EmitPayloadParam = {
  data: EmitPayloadDataType | string;
  headers?: Record<string, any> | { token?: string };
  _metas?: Record<string, any>;
};

export type EmitOptionParam = { event: string; eventToReply?: string, extra?: { notifier: string } };

@Injectable()
export class RabbitService {
  public readonly tokenValidator: TokenValidator;
  public eventManager: EventManager;
  public readonly encryptor: Encryptor = new Encryptor({
    privateKey: process.env.APP_SECRET_KEY,
    publicKey: process.env.APP_PUBLIC_KEY
  });

  constructor() {
    this.eventManager = new EventManager({
      emitAndWaitTimeout: 10000,
      url: process.env.EVENT_MNG_URL,
      logLevel: 'debug',
      logTransportMode: 'console',
      application: process.env.APP_NAME,
      ttl: +process.env.RMQ_TTL || 0,
    });
    this.tokenValidator = new TokenValidator(process.env.APP_PUBLIC_KEY);
    this.configuration();
  }
  private configuration(): void {
    this.eventManager.use(
      async (message: any) => {
        const payload = this.encryptor.decrypt(message.data);
        payload._metas = message._metas;
        payload.token = message.token;
        const token = payload.token;
        const tokenIsValid = await this.tokenValidator.validate(token);
        payload.tokenIsValid = tokenIsValid;
        return payload;
      },
      { omit: ['MICRO_SSO_GET_ACCESS_TOKEN'] },
    );
  }


  async listenToEvents(event: string): Promise<any> {
    return new Promise((resolve, reject) => {
    
      const eventHandler = (data: any) => {
        resolve(data); // Resolver la promesa con los datos recibidos
      };
    
      this.eventManager.on(event, eventHandler);
  
    });
  }

   emit(
    payload: EmitPayloadParam,
    eventEmitter: string,
  ) {

    // await this.refreshToken();

    const token = 'test' //TODO: Obtener el token del request; 
    // set event to reply if is undefined

    // set data if this is unencrypted
    let data: any = typeof payload.data !== 'string' && {
      ...payload.data,
      token,
    };

    // encrypted data if payload isn't
    data =
      (typeof payload.data === 'string' && payload.data) ||
      this.encryptor.encrypt(data);
    // add metadata0
    payload = {
      data,
    };
  this.eventManager.emit(eventEmitter, payload as any);
 
    
  }
}
