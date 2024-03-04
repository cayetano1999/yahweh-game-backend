import * as mongoose from 'mongoose';

export const IntegrationSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  facts: [
    {
      _id: { type: mongoose.Types.ObjectId, auto: true },
      name: String,
      type: {
        type: String,
        required: true,
      },
      active: Boolean,
    },
  ],
});
