import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpRequestMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['requestId'] == null) {
      req.headers['requestId'] = '123213123'
      console.log(JSON.stringify({
        requestId: req.headers['requestId'] as any,
        serviceName: 'yahweh-backend',
        description: `Se ha generado el  requestId ${req.headers['requestId']}`,
      }));
    }
    next();
  }
}
