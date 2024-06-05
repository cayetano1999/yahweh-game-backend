import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionHelper {

  // Clave secreta para cifrado y descifrado
  private secretKey = 'TuClaveSecreta'; //TODO: COLOCAR EN FIREBASE

  constructor() { }

  // Método para encriptar texto
  encryptText(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  // Método para desencriptar texto
  decryptText(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
