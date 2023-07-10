import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const eventId = Number(id);
    const eventFromParams = eventsFromApi.find((event) => event.id === eventId);
    if (eventFromParams) {
      setSelectedEvent(eventFromParams);
      navigate(`/event/${eventId}`);
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
