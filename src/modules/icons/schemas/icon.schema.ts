import * as mongoose from 'mongoose';

export const IconSchema = new mongoose.Schema({
  iconName: String,
  iconAppName: String,
  file: { type: mongoose.Schema.Types.Mixed }

});
