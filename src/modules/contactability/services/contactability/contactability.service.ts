import {
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

const routes = {
  root: process.env.CONTATABILITY_URL_API,
  getAllTemplates: () => `https://contactability-service-programa-digitalizacion-dev.apps.x966bdcl.eastus2.aroapp.io/api/template?channelType=10`
}
@Injectable()
export class ContactabilityService {
  constructor(private readonly httpService: HttpService) {}

  getTemplates(): Promise<any> {
    const url = routes.getAllTemplates();
    return new Promise((resolve, rejects) => {
      this.httpService.get(url).subscribe({
        next: (value) => {
          resolve(value.data)
        },
        error: (err) => {
          rejects(err)
        },
      })
    })
  }
}



