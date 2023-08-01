import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
import defaultImage from '../../images/default-image.png';
import { useEventsContext } from '../../utils/context/EventsContext';

const Event = ({ selectedEvent }) => {
  const { handleCardClick, toggleFavorite, recommendedEvents, favoriteEvents } =
    useEventsContext();

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className={styles.eventContainer}>
      <>
        <EventDescription
          selectedEvent={selectedEvent}
          favoriteEvents={favoriteEvents}
          onLikeClick={toggleFavorite}
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
            onCardClick={handleCardClick}
            onLikeClick={toggleFavorite}
          />
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Event;

// useEffect(() => {
//   // Получение события с сервера при загрузке компонента
//   const url = window.location.href;
//   const eventId = extractEventIdFromUrl(url);

//   apiEvents
//     .getSelectedEvent(eventId)
//     .then((selectedEvent) => {
//       setSelectedEvent(selectedEvent.data);
//       // setTimeout(() => {
//       setIsLoading(false);
//       // console.log(selectedEvent)
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
//     return null;
//   }
// }
