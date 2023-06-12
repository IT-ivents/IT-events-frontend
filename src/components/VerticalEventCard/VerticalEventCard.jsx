import styles from './VerticalEventCard.module.css';
import { useState } from 'react';
import { formatDate, formatPrice } from '../../utils/helperFunctions';
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

  const handleCopyLink = () => {
    const link = event?.url;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 1500);
        })
        .catch((error) => {
          console.error('Не удалось скопировать ссылку:', error);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1500);
      } catch (error) {
        console.error('Не удалось скопировать ссылку:', error);
      }

      document.body.removeChild(textArea);
    }
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
          onClick={handleCopyLink}
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
