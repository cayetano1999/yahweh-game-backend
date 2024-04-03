import { Connection } from 'mongoose';
import { CustomerConstant } from '../constants';
import { CustomerSchema } from '../schemas/customer.schema';
// import { CustomerPromotionSchema } from '../schemas/customer-promotions.schema';

export const customerProvider = [
  {
    provide: CustomerConstant.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(CustomerConstant.ModelName, CustomerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  //   {
  //     provide: CustomerPromotionConstant.ProviderName,
  //     useFactory: (connection: Connection) =>
  //       connection.model(
  //         CustomerPromotionConstant.ModelName,
  //         CustomerPromotionSchema,
  //       ),
  //     inject: ['DATABASE_CONNECTION'],
  //   },
];
