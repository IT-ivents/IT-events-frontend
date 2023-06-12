import styles from './VerticalEventCard.module.css';
import { useState } from 'react';
import {
  formatDate,
  formatPrice,
  handleCopyLink,
} from '../../utils/helperFunctions';
import PopupLink from '../PopupLink/PopupLink';
import defaultImage from '../../images/default-image.png';

const VerticalEventCard = ({ event, onCardClick, onLikeClick }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleCardClick = () => {
    onCardClick(event);
  };

  const handleLikeClick = () => {
    onLikeClick(event);
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const handleCopyButtonClick = () => {
    const link = event?.url;
    handleCopyLink(link, setShowNotification);
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
        <button
          className={styles.linkButton}
          type="button"
          onClick={handleCopyButtonClick}
        ></button>
        {showNotification && <PopupLink />}
      </div>
      <div className={styles.rowContainer}>
        <time>{formatDate(event.date_start)}</time>
        <span>&bull;</span>
        <p>{event.city?.name || 'Нет данных'}</p>
      </div>
    </li>
  );
};

export default VerticalEventCard;
