import { Connection } from 'mongoose';
import { RuleConstants } from '../constant';
import { RuleSchema } from '../schemas/rule.schema';

export const ruleProvider = [
  {
    provide: RuleConstants.ProviderName,
    useFactory: (connection: Connection) =>
      connection.model(RuleConstants.ModelName, RuleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
