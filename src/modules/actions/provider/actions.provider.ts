import { Connection } from 'mongoose';
import { ActionsConstant } from '../constant';
import { ActionsSchema } from '../schemas/actions.schema';


export const acctionsProvider = [
  {
    provide: ActionsConstant.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(ActionsConstant.ModelName, ActionsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
