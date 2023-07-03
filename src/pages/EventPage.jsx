import React from 'react';
import { useParams } from 'react-router-dom';
import Event from '../components/Event/Event';

const EventPage = ({
  onCardClick,
  onLikeClick,
  recommendedEvents,
  selectedEvent,
  setSelectedEvent,
}) => {
  const params = useParams();
  const { id } = params;

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
