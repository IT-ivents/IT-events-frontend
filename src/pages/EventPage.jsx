import React from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { useEventsContext } from '../utils/context/EventsContext';
import { apiEvents } from '../utils/api';
import { useLoaderData } from 'react-router-dom';

const EventPage = () => {
  const { event } = useLoaderData();

  return !event ? <Loader /> : <Event selectedEvent={event} />;
};

const eventLoader = async ({ params }) => {
  const id = params.id;
  console.log(params);
  const result = await apiEvents.getSelectedEvent(id);
  const event = result.data;
  console.log('Получено событие с сервера:', event);

  return { event };
};

export { EventPage, eventLoader };
