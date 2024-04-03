import { Document } from 'mongoose';
import { CustomerAction } from './customer-action.interface';

export interface CustomerPromotion extends Document{
  promotionId: string;
  displayedCount: number;
  customerId: string;
  customerActions: CustomerAction[];
}
