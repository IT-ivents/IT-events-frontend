import React from 'react';
import Event from '../components/Event/Event';

const EventPage = ({ selectedEvent }) => {
  return <Event selectedEvent={selectedEvent} />;
};

export default EventPage;
