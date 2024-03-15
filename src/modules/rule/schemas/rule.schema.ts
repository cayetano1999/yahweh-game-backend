import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const RuleSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  value: { type: Schema.Types.Mixed },
  creationDate: Date,
  createBy: String,
  updateBy: String,
  description: String,
  ruleFacts: { type: Schema.Types.Mixed }

});
