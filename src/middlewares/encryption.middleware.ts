import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionMiddleware implements NestMiddleware {
  private secretKey = 'TuClaveSecreta'; // TODO: usar variable de entorno

  private decrypt(encryptedText: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

 use(req: Request, res: Response, next: NextFunction) {
  if (req.body?.data) {
    try {
      req.body = JSON.parse(this.decrypt(req.body.data));
    } catch (error) {
      console.error('Error al desencriptar request:', error);
      return res.status(400).json({ message: 'Invalid encrypted data' });
    }
  }

  next();
}

}
