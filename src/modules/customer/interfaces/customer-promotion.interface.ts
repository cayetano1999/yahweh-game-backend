import { CustomerAction } from './customer-action.interface';

export interface CustomerPromotion {
  promotionId: string;
  displayedCount: Date;
  customerId: Date;
  customerActions: CustomerAction[];
}
