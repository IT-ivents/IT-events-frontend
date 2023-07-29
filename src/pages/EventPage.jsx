import React, { useEffect } from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { apiEvents } from '../utils/api';

const EventPage = ({
  recommendedEvents,
  onCardClick,
  onLikeClick,
  selectedEvent,
  setSelectedEvent,
}) => {
  // const { id } = useParams();

  // useEffect(() => {
  //   const fetchEvent = async (id) => {
  //     try {
  //       const response = await apiEvents.getSelectedEvent(id);
  //       const { data } = response;
  //       setSelectedEvent(data);
  //       console.log('Получили событие на EventPage', data);
  //     } catch (error) {
  //       console.error('Ошибка получения события с сервера', error);
  //     }
  //   };
  //   fetchEvent(id);
  // }, [id]);

  return !selectedEvent ? (
    <Loader />
  ) : (
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
