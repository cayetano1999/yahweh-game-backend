import { TopLevelCondition } from 'json-rules-engine';
import { Document, Schema } from 'mongoose';

export interface Rule extends Document {
  readonly name: string;
  readonly description: string;
  readonly active: boolean;
  readonly conditions: TopLevelCondition;
  readonly creationDate: Date;
  readonly createBy: string;
  readonly updateBy: string;
  readonly ruleFacts: { type: Schema.Types.Mixed };
}
