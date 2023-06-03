import React from 'react';
import Event from '../components/Event/Event';

const EventPage = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  interestingEvents,
}) => {
  return (
    <Event
      selectedEvent={selectedEvent}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      interestingEvents={interestingEvents.slice(1, 5)}
    />
  );
};

export default EventPage;
