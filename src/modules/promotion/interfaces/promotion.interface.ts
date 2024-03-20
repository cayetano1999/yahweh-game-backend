import { Document, Schema } from 'mongoose';

export interface Promotion extends Document {
  readonly name: String,
  readonly initialDate: Date,
  readonly finishDate: Date,
  readonly active: Boolean,
  readonly createBy: String,
  readonly updateBy: String,
  readonly description: String,
  readonly promotionDetails: { type: Schema.Types.Mixed },
  readonly promotionRules: { type: Schema.Types.Mixed }
}

