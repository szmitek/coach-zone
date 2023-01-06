import {
  integer,
  text,
  select,
  relationship,
  timestamp,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const EventsListItem = list({
  ui: {
    listView: {
      initialColumns: ['title', 'user'],
    },
  },
  fields: {
    title: text({ isRequired: true }),
    user: relationship({ ref: 'User.event' }),
    startdate: timestamp(),
    enddate: timestamp(),
  },
});
