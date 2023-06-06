import styles from './HorizontalEventCard.module.css';
import { useNavigate } from 'react-router-dom';
import { parseEventDate } from '../../utils/helperFunctions';
import playIcon from '../../images/Actions/PlayCircle.svg';

const HorizontalEventCard = ({ event, onCardClick, onLikeClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    onCardClick(event);
    navigate('/event');
  };

  const handleLikeClick = () => {
    onLikeClick(event);
  };

  return (
    <li key={event.id} className={`${styles.card}`}>
      <div className={styles.imageContainer}>
        <img
          src={event.image}
          alt="event_picture"
          className={styles.image}
          onClick={handleCardClick}
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
            <time>{parseEventDate(event.date)}</time>
          </li>
          <li className={styles.rowItem}>
            <p>{event.location}</p>
          </li>
        </ul>
        <figure className={styles.eventFigure}>
          <img src={playIcon} alt="play-icon" />
          <figcaption>Online-трансляция</figcaption>
        </figure>
        {event.price !== 'Бесплатно' ? (
          <span className={styles.price}>{event.price}&ensp;&#8381;</span>
        ) : (
          <span className={styles.price}>{event.price}</span>
        )}
      </div>
    </li>
  );
};

export default HorizontalEventCard;
