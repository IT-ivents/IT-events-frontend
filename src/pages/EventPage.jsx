import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Event from '../components/Event/Event';

const EventPage = ({
  onCardClick,
  onLikeClick,
  recommendedEvents,
  selectedEvent,
  setSelectedEvent,
  eventsFromApi,
}) => {
  const { id } = useParams();

  useEffect(() => {
    const eventId = parseInt(id);
    const eventFromParams = eventsFromApi.find((event) => event.id === eventId);

    if (eventFromParams) {
      setSelectedEvent(eventFromParams);
    }
  }, [id, setSelectedEvent, eventsFromApi]);

  return (
    <Event
      selectedEvent={selectedEvent}
      setSelectedEvent={setSelectedEvent}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      recommendedEvents={recommendedEvents}
    />
  );
};

export default EventPage;
