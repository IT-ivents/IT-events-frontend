import React from 'react';
import Event from '../components/Event/Event';

const EventPage = ({ selectedEvent, onCardClick }) => {
  return <Event selectedEvent={selectedEvent} onCardClick={onCardClick} />;
};

export default EventPage;
