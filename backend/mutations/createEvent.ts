import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { EventsListItemCreateInput } from '../.keystone/schema-types';
import { EventsListItem } from '../schemas/EventsListItem';

const graphql = String.raw;

async function createEvent(
  root: any,
  context: KeystoneContext
): Promise<EventsListItemCreateInput> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  // 1.5 Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
        event{
            id
            title
            startdate
            enddate
        }
    `,
  });
  console.dir(user, { depth: null });
  // create event
  const eventList = user.filter((eventList) => eventList.event);
  const eventItem = eventList.map((eventList) => {
    const eventItem = {
      title: eventList.title,
      startdate: eventList.startdate,
      enddate: eventList.enddate,
    };
    return eventItem;
  });
  const event = await context.lists.EventsListItems.createOne({
    data: {
      user: { connect: { id: userId } },
      items: { create: eventItem },
    },
    resolveFields: false,
  });
  return event;
}

export default createEvent;
