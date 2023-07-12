import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Event from '../components/Event/Event';

const EventPage = ({
  onCardClick,
  onLikeClick,
  recommendedEvents,
  selectedEvent,
  setSelectedEvent,
  upcomingEvents,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const eventId = Number(id);
  //   const eventFromParams = upcomingEvents.find((event) => event.id);
  //   if (eventFromParams) {
  //     setSelectedEvent(eventFromParams);
  //     navigate(`/event/${eventId}`);
  //   }
  // }, [id, setSelectedEvent, upcomingEvents]);

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
