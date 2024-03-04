import { Connection } from 'mongoose';
import { IntegrationSchema } from '../schemas/integration.schema';

export const integrationProviders = [
  {
    provide: 'INTEGRATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Integration', IntegrationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
