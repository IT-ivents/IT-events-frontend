import React from 'react';
import Event from '../components/Event/Event';

const EventPage = ({
  onCardClick,
  onLikeClick,
  recommendedEvents,
  selectedEvent,
  setSelectedEvent,
}) => {
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

// const { id } = useParams();
// const navigate = useNavigate();

// useEffect(() => {
//   const eventId = Number(id);
//   const eventFromParams = upcomingEvents.find((event) => event.id);
//   if (eventFromParams) {
//     setSelectedEvent(eventFromParams);
//     navigate(`/event/${eventId}`);
//   }
// }, [id, setSelectedEvent, upcomingEvents]);
