import {
  integer,
  text,
  select,
  relationship,
  timestamp,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const EventsListItem = list({
  access: {
    create: isSignedIn,
    read: rules.canEvents,
    update: rules.canEvents,
    delete: rules.canEvents,
  },
  ui: {
    listView: {
      initialColumns: ['title', 'user'],
    },
  },
  fields: {
    title: text({ isRequired: true }),
    user: relationship({ ref: 'User.event', isRequired: true, many: false }),
    startdate: timestamp(),
    enddate: timestamp(),
  },
});
