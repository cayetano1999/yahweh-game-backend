import {
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class ContactabilityService {
  constructor(private readonly httpService: HttpService) {}

  getTemplates(): Promise<any> {
    const url = process.env.CONTATABILITY_URL_API;
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



