import { useEffect, useState } from 'react';
import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
import defaultImage from '../../images/default-image.png';
import Loader from '../Loader/Loader';
import { apiEvents } from '../../utils/api';

const Event = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  recommendedEvents,
  setSelectedEvent,
}) => {
  // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
  // и приложение крашится

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 750);
  // }, []);

  // useEffect(() => {
  //   // Получение события с сервера при загрузке компонента
  //   const eventId = // Получите идентификатор события, например, из URL или из другого источника
  //   apiEvents.getSelectedEvent(eventId)
  //     .then((event) => {
  //       setSelectedEvent(event);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // }, [setSelectedEvent]);
  // useEffect(() => {
  //   // Получение события с сервера при загрузке компонента
  //   const url = window.location.href;
  //   const eventId = extractEventIdFromUrl(url);

  //   apiEvents
  //     .getSelectedEvent(eventId)
  //     .then((event) => {
  //       setSelectedEvent(event);
  //       // setTimeout(() => {
  //       setIsLoading(false);
  //       // }, 750)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // }, [setSelectedEvent]);

  // function extractEventIdFromUrl(url) {
  //   // Регулярное выражение для извлечения идентификатора события из URL
  //   const regex = /events\/(\d+)/;
  //   const match = url.match(regex);

  //   if (match && match[1]) {
  //     return match[1];
  //   } else {
  //     // Если идентификатор не найден, вернуть значение по умолчанию или обработать ошибку
  //     return null;
  //   }
  // }

  if (!selectedEvent) {
    return <Loader />;
  }

  return (
    <div className={styles.eventContainer}>
      <>
        <EventDescription
          selectedEvent={selectedEvent}
          onLikeClick={onLikeClick}
        />
        <aside>
          <img
            className={styles.eventImage}
            src={selectedEvent.image}
            alt={selectedEvent.title}
            onError={handleImageError}
          />
        </aside>
        <div className={styles.horizontalList}>
          <HorizontalEventsList
            title="Смотрите также"
            list={recommendedEvents}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </>
    </div>
  );
};

export default Event;
