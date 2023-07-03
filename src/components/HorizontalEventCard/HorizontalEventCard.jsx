// import styles from './HorizontalEventCard.module.css';
// import { useNavigate } from 'react-router-dom';
// import { parseEventDate } from '../../utils/helperFunctions';
// import playIcon from '../../images/Actions/PlayCircle.svg';

// const HorizontalEventCard = ({ event, onCardClick, onLikeClick }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     onCardClick(event);
//     navigate('/event');
//   };

//   const handleLikeClick = () => {
//     onLikeClick(event);
//   };

//   return (
//     <li key={event.id} className={`${styles.card}`}>
//       <div className={styles.imageContainer}>
//         <img
//           src={event.image}
//           alt="event_picture"
//           className={styles.image}
//           onClick={handleCardClick}
//         />
//         <button
//           className={`${
//             event.isLiked ? styles.likeButtonActive : styles.likeButton
//           }`}
//           type="button"
//           onClick={handleLikeClick}
//         ></button>
//       </div>

//       <div className={`${styles.descriptionContainer}`}>
//         <div className={styles.titleContainer}>
//           <h3 className={styles.title}>{event.title}</h3>
//         </div>
//         <ul className={styles.rowContainer}>
//           <li className={styles.rowItem}>
//             <time>{parseEventDate(event.date_start)}</time>
//           </li>
//           <li className={styles.rowItem}>
//             <p>{event.city?.name}</p>
//           </li>
//         </ul>
//         <figure className={styles.eventFigure}>
//           <img src={playIcon} alt="play-icon" />
//           <figcaption>Online-трансляция</figcaption>
//         </figure>
//         {event.price !== 'Бесплатно' ? (
//           <span className={styles.price}>{event.price}&ensp;&#8381;</span>
//         ) : (
//           <span className={styles.price}>{event.price}</span>
//         )}
//       </div>
//     </li>
//   );
// };

// export default HorizontalEventCard;

import styles from './HorizontalEventCard.module.css';
import {
  parseEventDate,
  formatPrice,
  formatTimeRange,
} from '../../utils/helperFunctions';
import defaultImage from '../../images/default-image.png';
import PlaceImage from '../../images/EventInfo/place.svg';
import CalendarImage from '../../images/EventInfo/calendar.svg';
import TimeImage from '../../images/EventInfo/time.svg';

const HorizontalEventCard = ({ event, onCardClick, onLikeClick }) => {
  const handleCardClick = () => {
    onCardClick(event);
  };

  const handleLikeClick = () => {
    onLikeClick(event);
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const eventStartDate = parseEventDate(event.date_start);
  const eventEndDate = parseEventDate(event.date_end);
  const eventDate =
    eventStartDate === eventEndDate
      ? eventStartDate
      : `${eventStartDate} - ${eventEndDate}`;

  return (
    <li key={event.id} className={`${styles.card}`}>
      <div className={styles.imageContainer}>
        <img
          src={event.image}
          alt="event_picture"
          className={styles.image}
          onClick={handleCardClick}
          onError={handleImageError}
        />
        <button
          className={`${
            event.isLiked ? styles.likeButtonActive : styles.likeButton
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>

      <div className={`${styles.descriptionContainer}`}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{event.title}</h3>
        </div>
        <ul className={styles.rowContainer}>
          <li className={styles.rowItem}>
            <img src={CalendarImage} alt="Календарь" />
            <time>{eventDate}</time>
          </li>
          <li className={styles.rowItem}>
            <img src={TimeImage} alt="Время" />
            <time>{formatTimeRange(event.date_start, event.date_end)}</time>
          </li>
          <li className={styles.rowItem}>
            <img src={PlaceImage} alt="Место проведения" />
            <p>{event.city?.name || 'Нет данных об адресе'}</p>
          </li>
          <li className={styles.rowItem}>
            <span className={styles.price}>{formatPrice(event.price)}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default HorizontalEventCard;
