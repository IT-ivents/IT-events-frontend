import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';

const Event = ({
  selectedEvent,
  onCardClick,
  onLikeClick,
  interestingEvents,
}) => {
  // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
  // и приложение крашится
  if (!selectedEvent) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.eventContainer}>
      <EventDescription selectedEvent={selectedEvent} />
      <aside>
        <img
          className={styles.eventImage}
          src={selectedEvent.image}
          alt={selectedEvent.title}
        />
      </aside>
      <HorizontalEventsList
        title="Смотрите также"
        list={interestingEvents}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
      />
    </div>
  );
};

export default Event;
