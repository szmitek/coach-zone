import { relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const Team = list({
  access: {
    create: isSignedIn,
    read: rules.canTeam,
    update: rules.canTeam,
    delete: rules.canTeam,
  },
  ui: {
    listView: {
      initialColumns: ['players', 'user'],
    },
  },
  fields: {
    user: relationship({ ref: 'User.team' }),
    players: relationship({ ref: 'Player.team', many: true }),
  },
});
