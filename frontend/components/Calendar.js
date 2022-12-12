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

const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $startdate: String
    $enddate: String
    
  ) {
    createEventsListItem(
      data: { 
        title: $title, 
        startdate: $startdate, 
        enddate: $enddate 
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
  query ALL_EVENTS_QUERY {
    allEventsListItems {
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
  const { data, refetch } = useQuery(ALL_EVENTS_QUERY);
  const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

  const myEvents = useMemo(
    () => data?.allEventsListItems && mapEvents(data.allEventsListItems),
    [data]
  );

  // Create event
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name, enter hours if needed');
      if (title) {
        createEvent({
          variables: {
            startdate: start,
            enddate: end,
            title,
          },
        }).then(() => refetch());
      }
    },
    [createEvent]
  );
  // Show event
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
