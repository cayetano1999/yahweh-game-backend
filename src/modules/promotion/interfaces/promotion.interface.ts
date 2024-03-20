import { Document, Schema } from 'mongoose';

export interface Promotion extends Document {
  readonly name: string;
  readonly initialDate: Date;
  readonly active: boolean;
  readonly createBy: string;
  readonly updateBy: string;
  readonly description: string;
  readonly promotionDetails: { type: Schema.Types.Mixed };
  readonly promotionRules: { type: Schema.Types.Mixed };
}
