import React from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { useEventsContext } from '../utils/context/EventsContext';

const EventPage = () => {
  const { selectedEvent } = useEventsContext();

  return !selectedEvent ? <Loader /> : <Event />;
};

export default EventPage;
