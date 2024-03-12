import { Document } from 'mongoose';
export interface RuleFact extends Document {
  readonly factId: string;
}
