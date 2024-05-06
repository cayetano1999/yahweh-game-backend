import { Connection } from 'mongoose';
import { IconConstant } from '../constant';
import { IconSchema } from '../schemas/icon.schema';


export const iconProvider = [
  {
    provide: IconConstant.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(IconConstant.ModelName, IconSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
