import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import * as serviceAccount from '../../config/yahweh-game-firebase-adminsdk-u69mp-2d97ac32f3.json';

export const serviceAccount = {
  type: "service_account",
  project_id: "yahweh-game",
  private_key_id: "2d97ac32f3ac0b4e11e7ad2dc9bd349b9ad957d6",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDxVlJn0xJ7BUjy
DXXAZGes22d3CsnRYlTr2z7l1FCqsZ/o8aw1WLP83wkeKFDNpscZIJ24hMh5/+3Y
PFy7BoSD3z/4LJoBRis2jx2Fb3Re4oVzGN0z8fDa/Buo2DYCXEhF+3vzf34/aPfx
chUZLhUwj4j9msWcYWWf9/P8Ngu/rS6HC/gIDuaOBhR+1ujNZSh/DO2hrIefuIx3
Sy4pq+apUx7qPcSfSU2uXfS3H+EkeF47u2I08g9hby7uGOjSe2kwvGeyrXLN5g5/
aORRGelkojgTjMSdHzujYI83x7lzrPz6DKA6qB6qzV5e7RKfRNfdSrk6M7SFtyq9
+rFUUfBpAgMBAAECggEABawyNZHXrrZHo7YVYewqQLA+jOTr+TGe9K7h879RrxVy
QHFpZOHP7aSlDCur7I2PQzCwUscL1ExKLNzZKPJxn0AaR5NuAkb1NJJygfF5Xx9j
Cu4w1hJjIPti8toA+P2IAfcaXII1ndI+9uxBmsz2jAscdl0saG0+P4XLQYIlG0Bj
guud2lXB57n77p/3o58vmTITziVXGfVGbcfX+RAsVKV+ADLcEqaTtaBrs+h73TZU
yK2YSt1PSmpDQSxqGFCIe8A6qKajC9w21NLeNgimiQtowfl6D4acLz6nAB8kydul
lOsr1Laf2FLdSJu3az6Z/zOnUGoUgVqilC8QQGAPtQKBgQD+LfwUl6Gqw+OVWzxJ
OGtjmX0xEurgLxXKzJHuu6PSlk4SiBQRMhQr1647qEL4i1s4T0Oj9ywVwBmdENjx
a8ePoIIMLN7SR4orctnA6XVHcO40UmhIgZ2b9tRHVDLt+ijLkVVqOIeeiNLNvxWA
bcqKVV203kDn5fmimiZV7BiznQKBgQDzEMqxgBAhQsMWmUnDfPDsueAag9BcpgsU
2ZWIsyHL7hbuLCjGZRkFMAwolIUEkVZRBbTc1Z3MikAlLnHeZvBXc4rUwhMtzKMM
f2bKgxhPm6aeqIy394g4NNBPPRstxd9ji2gGF2O0VPI6wtL0dO3NkVtWIKvPXmGe
G0OSFXx0PQKBgDyQuIAvoVYPVys/kh3gU7Zn3GzVFSJWFds844j/LQoAxpmj0yRF
yoin29xbO5n9mr7QJE3tl5OXMoM6gHcGN4cBt/sutellIoc31qsg9dEQF7Jf8HlW
aTfAmNRmO7x43z+iYbftwGMGNzTPU1BG2PwdWza9vrmDEvirwna2yywBAoGAXU95
8LBQAOTHTfqkxaZGOyqULLmjmJ2prWRmMmdKNyZ8qQxMzvTqqQIr+LwjYICG2W3O
Y+Shwm7kdyGgVxe/dmMFze1/PVrM0TRrepzfDVicm1XrR4iAQ8uKmJDFyUmoG2fe
FFCQVx8xKnu2TmBBFmSR4ruCGYaLBQ5EX2VeNKUCgYAtV94AWiGqySUuZ2sIkPY9
Fe1vFBdlFrXwT+hZcpCqR3XgH5ew6Muq70IYUHxrD9kcDA/+Irrq5K3GNEQ7ppQq
l71sC3nCtJ5tTUXTTs0r1LyP+VxLLck15L9h34M8J+DRXf7O8rVkayFN16miiF3h
5Z2kq4CrAbyYYA46lrM3vQ==
-----END PRIVATE KEY-----`,
  client_email: "firebase-adminsdk-u69mp@yahweh-game.iam.gserviceaccount.com",
  client_id: "114825849516904845575",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u69mp%40yahweh-game.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};


@Injectable()
export class PushService {
  constructor() {
console.log(serviceAccount.client_email)
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
  }

  async sendPushNotification(tokens: string[], title: string, body: string, data: any = {}) {
    const message = {
      notification: {
        title,
        body,
      },
      data,
      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    
    console.log('Push notification response:', JSON.stringify(response));
    return {
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses,
    };
  }
}
