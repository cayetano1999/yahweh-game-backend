import { Document } from 'mongoose';
import { Fact } from './fact.inteface';

export interface Integration extends Document {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly facts: Fact[];
}
