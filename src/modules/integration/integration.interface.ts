import { Document } from 'mongoose';

export interface Integration extends Document {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}
