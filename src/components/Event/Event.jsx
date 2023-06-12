import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
import defaultImage from '../../images/default-image.png';

const Event = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  recommendedEvents,
}) => {
  // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
  // и приложение крашится
  if (!selectedEvent) {
    return <div>Loading...</div>;
  }

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className={styles.eventContainer}>
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
      <HorizontalEventsList
        title="Смотрите также"
        list={recommendedEvents}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
      />
    </div>
  );
};

export default Event;
