import { Connection } from 'mongoose';
import { CustomerPromotionConstant } from '../constants';
import { CustomerPromotionSchema } from '../schemas/customer-promotions.schema';
// import { CustomerPromotionSchema } from '../schemas/customer-promotions.schema';

export const customerProvider = [
    {
      provide: CustomerPromotionConstant.ProviderName,
      useFactory: (connection: Connection) =>
        connection.model(
          CustomerPromotionConstant.ModelName,
          CustomerPromotionSchema,
        ),
      inject: ['DATABASE_CONNECTION'],
    },
];
