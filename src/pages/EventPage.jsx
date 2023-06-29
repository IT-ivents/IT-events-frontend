import React from 'react';
import { useParams } from 'react-router-dom';
import Event from '../components/Event/Event';

const EventPage = ({
  onCardClick,
  onLikeClick,
  recommendedEvents,
  selectedEvent,
}) => {
  const params = useParams();
  const { id } = params;
  console.log(id);

  return (
    <Event
      selectedEvent={selectedEvent}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      recommendedEvents={recommendedEvents}
    />
  );
};

export default EventPage;
