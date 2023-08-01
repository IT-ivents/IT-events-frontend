import React, { createContext, useContext } from 'react';
import useEvents from '../hooks/useEvents';

const EventsContext = createContext();

export function EventsProvider(props) {
  const events = useEvents();

  return <EventsContext.Provider value={events} {...props} />;
}

export function useEventsContext() {
  return useContext(EventsContext);
}
