import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const PromotionSchema = new mongoose.Schema({
  name: String,
  initialDate: Date,
  finishDate: Date || null,
  active: Boolean,
  createBy: String,
  updateBy: String,
  description: String,
  promotionDetails: { type: Schema.Types.Mixed },
  promotionRules: { type: Schema.Types.Mixed },
});
