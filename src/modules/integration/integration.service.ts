import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Integration } from './integration.interface';

@Injectable()
export class IntegrationService {
  constructor(
    @Inject('INTEGRATION_MODEL')
    private integrationModel: Model<Integration>,
  ) {}

  async create(): Promise<Integration> {
    try {
      const createdCat = new this.integrationModel({
        name: 'prueba',
        description: 'descripcion',
        url: 'https://saname.com',
      });
      return createdCat.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Integration[]> {
    return this.integrationModel.find().exec();
  }
}
