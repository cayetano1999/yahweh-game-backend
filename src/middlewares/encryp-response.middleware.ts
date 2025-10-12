import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptResponseMiddleware implements NestMiddleware {
  private secretKey = process.env.ENCRYPTION_KEY || 'TuClaveSecreta';

  private encrypt(plainObject: any): string {
    const plaintext = JSON.stringify(plainObject);
    return CryptoJS.AES.encrypt(plaintext, this.secretKey).toString();
  }

  use(_req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);

    res.send = (body: any): Response => {

      if (!body) {
        return originalSend(body);
      }

      const notEncrypt = ['/Player', '/Tournament', '/Chapter', '/Church', '/Team', '/Shift', '/Game', '/Inning'].some(route => _req.url.includes(route));
      if (notEncrypt) {
        console.log('No se encripta la respuesta para la ruta:', _req.url);
        return originalSend(body);
      }

      try {
        const payload = typeof body === 'object' ? body : JSON.parse(body);
        const encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.ENCRYPTION_KEY || 'TuClaveSecreta'
        ).toString();

        res.set('Content-Type', 'application/json');
        return originalSend(JSON.stringify({ data: encrypted }));
      } catch (error) {
        console.error('Error al encriptar response:', error);
        return originalSend(body);
      }
    };

    next();
  }

}
