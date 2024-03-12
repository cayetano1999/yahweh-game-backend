import { Connection } from 'mongoose';
import { IntegrationSchema } from '../schemas/integration.schema';
import { IntegrationConstats } from '../constant';

export const integrationProviders = [
  {
    provide: IntegrationConstats.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(IntegrationConstats.ModelName, IntegrationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
