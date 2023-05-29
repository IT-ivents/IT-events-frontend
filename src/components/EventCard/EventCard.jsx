import styles from './EventCard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import playIcon from '../../images/play.png';

const EventCard = ({ event, onCardClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const flexDirection = location.pathname === '/favorites' && styles.flexRow;
  const paddingContainer = location.pathname !== '/favorites' && styles.padding;

  const handleCardClick = () => {
    onCardClick(event);
    navigate('/event');
  };

  return (
    <li key={event.id} className={`${styles.li} ${flexDirection}`}>
      <div className={styles.imageContainer}>
        <img
          src={event.image}
          alt="event_picture"
          className={styles.image}
          onClick={handleCardClick}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.likeButton}></button>
        </div>
      </div>
      <div
        className={`${styles.container} ${flexDirection} ${paddingContainer}`}
      >
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>{event.location}</p>
        <time className={styles.date}>{event.date}</time>
        {location.pathname === '/favorites' && (
          <figure className={styles.eventFigure}>
            <img src={playIcon} alt="play-icon" />
            <figcaption>Online-трансляция</figcaption>
          </figure>
        )}
        <span className={styles.price}>{event.price}</span>
      </div>
    </li>
  );
};

export default EventCard;
