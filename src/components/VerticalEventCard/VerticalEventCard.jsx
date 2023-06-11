import styles from './VerticalEventCard.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatPrice } from '../../utils/helperFunctions';
import defaultImage from '../../images/default-image.png';

const VerticalEventCard = ({ event, onCardClick, onLikeClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    onCardClick(event);
    navigate('/event');
  };

  const handleLikeClick = () => {
    onLikeClick(event);
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <li key={event.id} className={`${styles.card}`}>
      <div className={styles.imageContainer}>
        <span className={styles.price}>{formatPrice(event.price)}</span>
        <img
          src={event.image ? event.image : defaultImage}
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
        <h3 className={styles.title}>{event.title}</h3>
        <button className={styles.linkButton} type="button"></button>
      </div>
      <div className={styles.rowContainer}>
        <time>{formatDate(event.date_start)}</time>
        <span>&bull;</span>
        <p>{event.city?.name}</p>
      </div>
    </li>
  );
};

export default VerticalEventCard;
