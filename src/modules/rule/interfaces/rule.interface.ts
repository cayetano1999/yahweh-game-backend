import { Document } from 'mongoose';

export interface Rule extends Document {
  readonly name: string;
  readonly value: string;
}
