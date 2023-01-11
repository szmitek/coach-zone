import { integer, text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const TrainingItem = list({
  access: {
    create: isSignedIn,
    read: rules.canTraining,
    update: rules.canTraining,
    delete: rules.canTraining,
  },
  ui: {
    listView: {
      initialColumns: ['exercise', 'user', 'quantity'],
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    exercise: relationship({ ref: 'Exercise' }),
    user: relationship({ ref: 'User.training' }),
  },
});
