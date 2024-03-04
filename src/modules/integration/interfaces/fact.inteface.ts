import { Document } from 'mongoose';

export interface Fact extends Document {
  readonly name: string;
  readonly type: string;
  readonly active: boolean;
}
