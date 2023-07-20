import React, { useEffect } from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

const EventPage = ({
  recommendedEvents,
  onCardClick,
  onLikeClick,
  selectedEvent,
  setSelectedEvent,
}) => {
  if (selectedEvent === null && !selectedEvent) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route
        path={`/${selectedEvent.id}`}
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
    </Routes>
  );
};

export default EventPage;
