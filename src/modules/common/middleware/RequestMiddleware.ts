import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../logger/services/logger/logger.service';

@Injectable()
export class HttpRequestMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['requestId'] == null) {
      req.headers['requestId'] = uuidv4();
      this.logger.log({
        requestId: req.headers['requestId'] as any,
        serviceName: `Se ha generado el  requestId ${req.headers['requestId']}`,
        error: '',
      });
    }
    next();
  }
}
