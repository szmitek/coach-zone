import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import events from './Events'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { perPage } from '../config';
import {useMutation} from '@apollo/client';
import { UniqueInputFieldNamesRule } from 'graphql';


const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION (
    $title: String!
    $startdate: String
    $enddate: String
  ) {
    createEvent(
      data: {
        title: $title
        startdate: $startdate
        enddate: $enddate
      }
    ) {
      id
      title
      stardate
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
`


const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


export default function CalendarPage() {
  const { data } = useQuery(ALL_EVENTS_QUERY);
  const [ createEvent ] = useMutation(CREATE_EVENT_MUTATION)
  
  const event = data 
  console.log(event)

  const [myEvents2, setEvents] = useState(data)
  console.log(myEvents2);

  // Create event
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name, enter hours if needed')
      if (title) {

        createEvent({ variables: { 
          startdate: start,
          enddate: end,
          title: title
        } })

        //taka sugestia - to może zadziałać na odświeżaniu zmiennej stanu, zabezpieczam ifem bo u mnie z jakiegoś powodu lista w myEvents już zwraca na starcie undefined, ale może przez to, że jest po prostu pusta
        if(typeof myEvents2 !== 'undefined'){
          setEvents([...myEvents2.allEventsListItems, { start, end, title }])
        }
      }
    },
    [createEvent]
  )
 // Show event 
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )


  return (

    <div>
      <Calendar
        localizer={localizer}
        events={myEvents2}
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