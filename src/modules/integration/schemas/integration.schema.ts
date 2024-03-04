import * as mongoose from 'mongoose';

export const IntegrationSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
});
