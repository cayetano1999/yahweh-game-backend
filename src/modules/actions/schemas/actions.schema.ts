import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ActionsSchema = new mongoose.Schema({
  pageName: String,
  url: String,
  module: String,
  requeredState: Boolean,

});
