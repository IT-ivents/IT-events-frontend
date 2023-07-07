import { useEffect, useState } from 'react';
import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
import defaultImage from '../../images/default-image.png';
import Loader from '../Loader/Loader';

const Event = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  recommendedEvents,
  setSelectedEvent,
}) => {
  // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
  // и приложение крашится
  // if (!selectedEvent) {
  //   return <Loader />;
  // }
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, []);

  return (
    <div className={styles.eventContainer}>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default Event;
