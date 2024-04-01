import { Document, Schema } from 'mongoose';

export interface Actions extends Document {
  readonly pageName: string,
  readonly url: string,
  readonly module: string,
  readonly requeredState: boolean
}
