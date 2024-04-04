import {
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ContactabilityResponse } from '../../dtos/contactability-response.dto';

const routes = {
  root: process.env.CONTATABILITY_URL_API,
  getAllTemplates: () => `https://contactability-service-programa-digitalizacion-dev.apps.x966bdcl.eastus2.aroapp.io/api/template?channelType=10`,
  byId: (ids: string[]) => `${routes.root}/api/template?${ids.map(id => `ids=${id}`).join('&')}`
}
@Injectable()
export class ContactabilityService {
  constructor(private readonly httpService: HttpService) { }

  async getTemplates(): Promise<any> {
    const url = routes.getAllTemplates();
    return this.httpService.axiosRef.get<any>(url);
  }

  async getFilledTemplates(ids: string[], payload: any) {
    const url = routes.byId(ids);
    const params = this.convertToTemplateParams(payload);
    return this.httpService.axiosRef.get(url, { data: params });
  }

  convertToTemplateParams(payload) {
    const newObject = {};
    for (let property in payload) {
      if (payload.hasOwnProperty(property)) {
        newObject['@' + property] = payload[property];
      }
    }
    return newObject;
  }
}