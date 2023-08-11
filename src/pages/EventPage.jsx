import React, { Suspense } from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { apiEvents } from '../utils/api';
import { useLoaderData, Await, useAsyncValue } from 'react-router-dom';

const EventFromApi = () => {
  const event = useAsyncValue();
  return <Event selectedEvent={event} />;
};

const EventPage = () => {
  const { event } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={event}>
        <EventFromApi />
      </Await>
    </Suspense>
  );
};

async function getEventById(id) {
  const result = await apiEvents.getSelectedEvent(id);
  const event = result;
  console.log('Получено событие с сервера:', event);
  return event;
}

const eventLoader = async ({ params }) => {
  const id = params.id;
  return { event: getEventById(id) };
};

export { EventPage, eventLoader };
