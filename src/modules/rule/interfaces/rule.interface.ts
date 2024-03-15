import { Document, Schema } from 'mongoose';
import { RuleFact } from './rule-fact.interface';

export interface Rule extends Document {

  readonly name: string,
  readonly description: string;
  readonly active: boolean,
  readonly value: { type: Schema.Types.Mixed },
  readonly creationDate: Date,
  readonly createBy: string,
  readonly updateBy: string,
  readonly ruleFacts: { type: Schema.Types.Mixed }
}

