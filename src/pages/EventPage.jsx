import React from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';

const EventPage = ({
  recommendedEvents,
  onCardClick,
  onLikeClick,
  selectedEvent,
  setSelectedEvent,
}) => {
  // console.log(window.location.href);
  console.log(selectedEvent);

  if (selectedEvent === null && !selectedEvent) {
    return <Loader />;
  }
  return (
    <Event
      selectedEvent={selectedEvent}
      onCardClick={onCardClick}
      onLikeClick={onLikeClick}
      recommendedEvents={recommendedEvents}
      setSelectedEvent={setSelectedEvent}
    />
  );
};

export default EventPage;
