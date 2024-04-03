import { Document } from 'mongoose';
import { CustomerPromotion } from './customer-promotion.interface';

export interface Customer extends Document {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: boolean;
  gender: string;
  customerPromotions: CustomerPromotion[];
}
