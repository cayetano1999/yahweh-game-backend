import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  birthDate: Boolean,
  gender: String,
  customerPromotions: [],
});
