import React from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { Route, Routes } from 'react-router-dom';

const EventPage = ({
  recommendedEvents,
  onCardClick,
  onLikeClick,
  selectedEvent,
  setSelectedEvent,
}) => {
  if (!selectedEvent) {
    return <Loader />;
  }
  return (
    <Routes>
      {selectedEvent === null ? (
        <Loader />
      ) : (
        <Route
          path={`${selectedEvent.id}`}
          element={
            <Event
              selectedEvent={selectedEvent}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
              recommendedEvents={recommendedEvents}
              setSelectedEvent={setSelectedEvent}
            />
          }
        />
      )}
    </Routes>
  );
};

export default EventPage;
