import { Document, Schema } from 'mongoose';
import { IPromotionDetail } from './promotion-detail.inteface';

export interface Promotion extends Document {
  readonly name: string;
  readonly initialDate: Date;
  readonly finishDate: Date;
  readonly active: boolean;
  readonly createBy: string;
  readonly updateBy: string;
  readonly description: string;
  readonly promotionDetails: IPromotionDetail[];
  readonly promotionRules: { type: Schema.Types.Mixed };
}
