import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Integration } from '../interfaces/integration.interface';
import { Logger } from '../../common/logger/services/logger/logger.service';
import { IntegrationConstats as IntegrationConstants } from '../constant';

@Injectable()
export class IntegrationService {
  constructor(
    @Inject(IntegrationConstants.ProviderName)
    private integrationModel: Model<Integration>,
    private readonly logger: Logger,
  ) { }

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
        this.getAppMovilIntegraion(),
        this.getSomosIntegration(),
        this.getCrmIntegration(),
        this.getSystemIntegration(),
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


  getAppMovilIntegraion() {
    return {
      name: 'APP Movil',
      description:
        'Integracion que incluye propiedades de la aplicacion movil',
      url: '',
      facts: [
        {
          name: 'debidaDiligencia',
          active: true,
          type: 'boolean',
        },
        {
          name: 'tieneCuentaAhorroDigital',
          active: true,
          type: 'boolean',
        },
        {
          name: 'tieneTarjetaDebitoDigital',
          active: true,
          type: 'boolean',
        },
        {
          name: 'primerLogin',
          active: true,
          type: 'boolean',
        },
        {
          name: 'montoCuentas',
          active: true,
          type: 'number',
        },
        {
          name: 'tieneCertificado',
          active: true,
          type: 'number',
        },
        {
          name: 'tieneCertificadoDigital',
          active: true,
          type: 'number',
        },
        {
          name: 'AppVersion',
          active: true,
          type: 'string',
        },
      ],
    }
  }
  getSomosIntegration() {
    return {
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
    };
  }
  getCrmIntegration() {
    return {
      name: 'CRM',
      description: 'Integracion que incluye propiedades de CRM',
      url: '',
      facts: [
        {
          name: 'preAprobado',
          active: true,
          type: 'boolean',
        },
        {
          name: 'montoPreAprobado',
          active: true,
          type: 'number',
        },
      ],
    };
  }
  getSystemIntegration() {
    return {
      name: 'Accion promociones',
      description: 'Integracion que incluye informacion de interaccion con las promociones',
      url: '',
      facts: [
        {
          name: 'descartada',
          active: true,
          type: 'boolean',
        },
        {
          name: 'fechaDescarte',
          active: true,
          type: 'date',
        },
        {
          name: 'visualizaciones',
          active: true,
          type: 'number',
        },
        {
          name: 'verDespues',
          active: true,
          type: 'boolean',
        },
        {
          name: 'fechaVerDespues',
          active: true,
          type: 'date',
        },
        {
          name: 'completada',
          active: true,
          type: 'boolean',
        },
        {
          name: 'fechaCompletada',
          active: true,
          type: 'date',
        },
      ],
    };
  }
}
