import styles from './VerticalEventCard.module.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  formatDate,
  formatPrice,
  handleCopyLink,
} from '../../utils/helperFunctions';
import { motion as m } from 'framer-motion';
import PopupLink from '../PopupLink/PopupLink';
import defaultImage from '../../images/default-image.png';

const VerticalEventCard = ({ event, index, onCardClick, onLikeClick }) => {
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

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
    const link = `${window.location.origin}/events/${event.id}/`;
    console.log('Ссылка скопирована в MainPage', link);
    handleCopyLink(link, setShowNotification);
  };

  return (
    <m.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${styles.card}`}
    >
      <div className={styles.imageContainer}>
        <span className={styles.price}>{formatPrice(event.price)}</span>
        <Link
          to={!location.pathname.includes('/edit') && `/events/${event.id}`}
        >
          <img
            src={
              event.image_small
                ? event.image_small
                : event.image
                ? event.image
                : defaultImage
            }
            alt="event_picture"
            className={styles.image}
            onClick={handleCardClick}
            onError={handleImageError}
          />
        </Link>
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
        <p className={styles.city}>
          {event.city !== '' && event.city !== ' ' ? event.city : 'Online'}
        </p>
        {/* <p>{event.city === ' ' ? 'Нет данных' : event.city}</p> */}
      </div>
    </m.li>
  );
};

export default VerticalEventCard;
