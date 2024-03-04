import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Integration } from '../interfaces/integration.interface';
import { Logger } from '../../common/logger/services/logger/logger.service';

@Injectable()
export class IntegrationService {
  constructor(
    @Inject('INTEGRATION_MODEL')
    private integrationModel: Model<Integration>,
    private readonly logger: Logger,
  ) {}

  async configure(): Promise<any> {
    try {
      this.logger.log({
        requestId: '',
        serviceName: 'micro-promotions',
        description:
          'Iniciada la configuracion del las integraciones, esto borrara y creara los datos.',
      });
      await this.integrationModel.deleteMany({});

      const defaultIntegrations = [
        {
          name: 'SOMOS',
          description: 'Integracion que incluye propiedades de somos',
          url: '',
          facts: [
            {
              name: 'nivel',
              active: true,
              type: 'number',
            },
          ],
        },
        {
          name: 'CRM',
          description: 'Integracion que incluye propiedades de CRM',
          url: '',
          facts: [
            {
              name: 'preaprobado',
              active: true,
              type: 'boolean',
            },
          ],
        },
      ];

      const createdIntegrations =
        this.integrationModel.insertMany(defaultIntegrations);

      this.logger.log({
        requestId: '',
        serviceName: 'micro-promotions',
        description: 'Configuracion finalizada, datos creadas correctamente.',
      });
      return createdIntegrations;
    } catch (error) {
      this.logger.error({
        requestId: '',
        serviceName: 'micro-promotions',
        description: JSON.stringify(error),
      });
    }
  }

  getAll(): Promise<Integration[]> {
    return this.integrationModel.find().exec();
  }
}
