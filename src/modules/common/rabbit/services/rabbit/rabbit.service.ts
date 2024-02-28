import { Injectable } from '@nestjs/common';
import { TokenValidator } from '@apap/token-manager';
import { EventManager } from '@apap/event-manager';
import { TweetNaclEncrytor } from '@apap/encryptor';
@Injectable()
export class RabbitService {
    public readonly tokenValidator: TokenValidator;
    public eventManager: EventManager;
    public readonly encryptor: TweetNaclEncrytor = new TweetNaclEncrytor({
        PRIVATE_KEY: process.env.APP_SECRET_KEY,
        PUBLIC_KEY: process.env.APP_PUBLIC_KEY,
      });
      /**
       *
       */
      constructor() {
        this.eventManager = new EventManager({
            emitAndWaitTimeout: 10000,
            url: process.env.EVENT_MNG_URL,
            logLevel: 'debug',
            logTransportMode: 'console',
            application: process.env.APP_NAME,
            ttl:+process.env.RMQ_TTL || 0
          });
          this.tokenValidator = new TokenValidator(
            this.eventManager as any,
            this.encryptor,
          );
          this.configuration();
        
      }
      private configuration(): void {

    
        this.eventManager.use(
          async (message: any) => {
            const payload = this.encryptor.decrypt(message.data);
            payload._metas = message._metas;
            payload.token = message.token;
            const token = payload.token;
            const tokenIsValid = await this.tokenValidator.validateToken(token);
            payload.tokenIsValid = tokenIsValid;
            return payload;
          },
          { omit: ['MICRO_SSO_GET_ACCESS_TOKEN'] },
        );
      }
}
