import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
// import { permissions, rules } from '../access';

export const User = list({
  // access:
  ui: {
    // hide the backend UI from regular users
    // hideCreate: (args) => !permissions.canManageUsers(args),
    // hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    training: relationship({
      ref: 'TrainingItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    team: relationship({ ref: 'Team.user' }),
    event: relationship({ ref: 'EventsListItem.user' }),
    // Todo: add roles
  },
});
