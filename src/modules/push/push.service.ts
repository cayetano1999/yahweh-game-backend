import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import * as serviceAccount from '../../config/yahweh-game-firebase-adminsdk-u69mp-2d97ac32f3.json';

export const serviceAccount = {
  type: "",
  project_id: "",
  private_key_id: "",
  private_key: ``,
  client_email: "",
  client_id: "",
  auth_uri: "",
  token_uri: "",
  auth_provider_x509_cert_url: "",
  client_x509_cert_url: "",
  universe_domain: ""
};


@Injectable()
export class PushService {
  constructor() {
// console.log(serviceAccount.client_email)
//     if (!admin.apps.length) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//       });
//     }
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
