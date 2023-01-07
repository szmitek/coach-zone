import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { UniqueInputFieldNamesRule } from 'graphql';
import { perPage } from '../config';
import events from './Events';
import { useUser } from './User';

const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $startdate: String
    $enddate: String
    $userId: ID!
  ) {
    createEventsListItem(
      data: {
        title: $title
        startdate: $startdate
        enddate: $enddate
        user: { connect: { id: $userId } }
      }
    ) {
      id
      title
      startdate
      enddate
    }
  }
`;

export const ALL_EVENTS_QUERY = gql`
  query ALL_EVENTS_QUERY($user: ID) {
    allEventsListItems(where: { user: { id: $user } }) {
      id
      title
      startdate
      enddate
    }
  }
`;

const locales = {
  'en-US': enUS,
};

const mapEvents = (_events) =>
  _events.map((event) => ({
    title: event.title,
    start: event.startdate,
    end: event.enddate,
  }));

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const me = useUser();
  if (!me) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error, refetch } = useQuery(ALL_EVENTS_QUERY, {
    variables: {
      user: me.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
    variables: { userId: me.id },
    refetchQueries: [{ query: ALL_EVENTS_QUERY }],
  });
  console.log(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const myEvents = useMemo(
    () => data?.allEventsListItems && mapEvents(data.allEventsListItems),
    [data]
  );

  // Create event
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name, enter hours if needed');
      if (title) {
        createEvent({
          variables: {
            startdate: start,
            enddate: end,
            title,
            userId: me.id,
          },
        }).then(() => refetch());
      }
    },
    [createEvent]
  );
  // Show event
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        allDayAccessor
        views={['month']}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
}
