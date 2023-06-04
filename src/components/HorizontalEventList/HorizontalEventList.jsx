import React, { useEffect, useState } from 'react';
import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Pagination from '../Pagination/Pagination';

const HorizontalEventList = ({
  list,
  title,
  onCardClick,
  onLikeClick,
  elseButton,
}) => {
  const eventOnPage = 6;
  const totalPages = Math.floor(list.length / eventOnPage);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setEvents(list.slice((page - 1) * eventOnPage, page * eventOnPage));
  }, [list, page]);

  return (
    <section className={`${styles.section}`}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={`${styles.list}`}>
        {events.map((event) => (
          <VerticalEventCard
            key={event.id}
            event={event}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
          />
        ))}
        {elseButton && (
          <button className={styles.elseButton} type="button">
            Показать все
          </button>
        )}
      </ul>
      <div className={styles.navigationContainer}>
        {page < totalPages && (
          <ShowMoreButton handleShowMore={handleShowMore} />
        )}
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default HorizontalEventList;
