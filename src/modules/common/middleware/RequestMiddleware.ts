import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EncryptionHelper } from 'src/helpers/encryptor.helper';

@Injectable()
export class HttpRequestMiddleware implements NestMiddleware {
  constructor(private encryptor: EncryptionHelper) { }
  use(req: Request, res: Response, next: NextFunction) {
    console.log('ok')
    if (req.headers['requestId'] == null) {
      req.headers['requestId'] = '123213123'
      console.log(JSON.stringify({
        requestId: req.headers['requestId'] as any,
        serviceName: 'yahweh-backend',
        description: `Se ha generado el  requestId ${req.headers['requestId']}`,
      }));

      // console.log(req.body)
      // if (req.body) {
      //   req.body = JSON.parse(this.encryptor.decryptText(req.body))
      // }
    }
    next();
  }
}
