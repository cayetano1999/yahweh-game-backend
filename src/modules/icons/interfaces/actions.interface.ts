import { Document, Schema } from 'mongoose';

export interface Icon extends Document {
  readonly iconName: string,
  readonly iconAppName: string,
  readonly file: any,
}
