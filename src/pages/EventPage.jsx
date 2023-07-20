import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiEvents } from '../utils/api';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';

const EventPage = ({
  recommendedEvents,
  onCardClick,
  onLikeClick,
  selectedEvent,
  setSelectedEvent,
}) => {
  const { id } = useParams();
  console.log(window.location.href);

  // //const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiEvents.getSelectedEvent(id);
        const { data } = response;
        setSelectedEvent(data);
        console.log('Получили событие на странице Event', data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка получения события с сервера', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
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
