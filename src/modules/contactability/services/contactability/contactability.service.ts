import {
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

const routes = {
  root: process.env.CONTATABILITY_URL_API,
  getAllTemplates: (chanelType) => `${routes.root}/template?channelType=${chanelType}`
}
@Injectable()
export class ContactabilityService {
  constructor(private readonly httpService: HttpService) {}

  getTemplates(): Promise<any> {
    const url = routes.getAllTemplates(10);
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



