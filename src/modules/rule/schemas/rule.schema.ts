import * as mongoose from 'mongoose';

export const RuleSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed,
});
