import * as mongoose from 'mongoose';

export const CustomerPromotionSchema = new mongoose.Schema({
  promotionId: String,
  displayedCount: Number,
  customerId: String,
  customerActions: [],
});
