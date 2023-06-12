import React from 'react';
import Event from '../components/Event/Event';

const EventPage = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  recommendedEvents,
}) => {
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
