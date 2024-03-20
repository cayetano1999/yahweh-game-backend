import { Connection } from 'mongoose';
import { PromotionConstant } from '../constant';
import { PromotionSchema } from '../schemas/promotion.schema';

export const promotionProvider = [
  {
    provide: PromotionConstant.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(PromotionConstant.ModelName, PromotionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
