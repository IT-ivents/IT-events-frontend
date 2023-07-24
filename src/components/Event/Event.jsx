// import { useEffect, useState } from 'react';
// import styles from './Event.module.css';
// import EventDescription from '../EventDescription/EventDescription';
// import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
// import defaultImage from '../../images/default-image.png';
// import Loader from '../Loader/Loader';

// const Event = ({
//   selectedEvent,
//   onCardClick,
//   onLikeClick,
//   recommendedEvents,
//   setSelectedEvent,
// }) => {
//   // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
//   // и приложение крашится
//   // if (!selectedEvent) {
//   //   return <Loader />;
//   // }

//   const handleImageError = (e) => {
//     e.target.src = defaultImage;
//   };

//   return (
//     <div className={styles.eventContainer}>
//       <>
//         <EventDescription
//           selectedEvent={selectedEvent}
//           onLikeClick={onLikeClick}
//         />
//         <aside>
//           <img
//             className={styles.eventImage}
//             src={selectedEvent.image}
//             alt={selectedEvent.title}
//             onError={handleImageError}
//           />
//         </aside>
//         <div className={styles.horizontalList}>
//           <HorizontalEventsList
//             title="Смотрите также"
//             list={recommendedEvents}
//             onCardClick={onCardClick}
//             onLikeClick={onLikeClick}
//             setSelectedEvent={setSelectedEvent}
//           />
//         </div>
//       </>
//     </div>
//   );
// };

// export default Event

import { useEffect, useState } from 'react';
import styles from './Event.module.css';
import EventDescription from '../EventDescription/EventDescription';
import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
import defaultImage from '../../images/default-image.png';
import { apiEvents } from '../../utils/api';
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
  //const [isLoading, setIsLoading] = useState(true);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

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

  return (
    <div className={styles.eventContainer}>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
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
      {/* )} */}
    </div>
  );
};

export default Event;

// import { useEffect, useState } from 'react';
// import styles from './Event.module.css';
// import EventDescription from '../EventDescription/EventDescription';
// import HorizontalEventsList from '../HorizontalEventList/HorizontalEventList';
// import defaultImage from '../../images/default-image.png';
// import Loader from '../Loader/Loader';
// import { apiEvents } from '../../utils/api';

// const Event = ({
//   selectedEvent,
//   onCardClick,
//   onLikeClick,
//   recommendedEvents,
//   setSelectedEvent,
// }) => {
//   // Здесь нужен будет Loader потому что Event монтируется раньше того как приходит selectedEvent
//   // и приложение крашится
//   // if (!selectedEvent) {
//   //   return <Loader />;
//   // }
//   const [isLoading, setIsLoading] = useState(true);

//   const handleImageError = (e) => {
//     e.target.src = defaultImage;
//   };

//   useEffect(() => {
//     // Получение события с сервера при загрузке компонента
//     const url = window.location.href;
//     const eventId = extractEventIdFromUrl(url);

//     apiEvents
//       .getSelectedEvent(eventId)
//       .then((event) => {
//         setSelectedEvent(event.data);
//         // setTimeout(() => {
//         setIsLoading(false);
//         // }, 750)
//       })
//       .catch((error) => {
//         console.error(error);
//         setIsLoading(false);
//       });
//   }, [setSelectedEvent]);

//   function extractEventIdFromUrl(url) {
//     // Регулярное выражение для извлечения идентификатора события из URL
//     const regex = /events\/(\d+)/;
//     const match = url.match(regex);

//     if (match && match[1]) {
//       return match[1];
//     } else {
//       return null;
//     }
//   }

//   return (
//     <div className={styles.eventContainer}>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <EventDescription
//             selectedEvent={selectedEvent}
//             onLikeClick={onLikeClick}
//           />
//           <aside>
//             <img
//               className={styles.eventImage}
//               src={selectedEvent.image}
//               alt={selectedEvent.title}
//               onError={handleImageError}
//             />
//           </aside>
//           <div className={styles.horizontalList}>
//             <HorizontalEventsList
//               title="Смотрите также"
//               list={recommendedEvents}
//               onCardClick={onCardClick}
//               onLikeClick={onLikeClick}
//               setSelectedEvent={setSelectedEvent}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Event;
