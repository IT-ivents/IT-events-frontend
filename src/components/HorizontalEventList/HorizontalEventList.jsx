import React, { useEffect, useState } from 'react';
import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import ShowAllButton from '../ShowAllButton/ShowAllButton';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Pagination from '../Pagination/Pagination';
import SpanCard from '../SpanCard/SpanCard';

const HorizontalEventList = ({
  list,
  title,
  span,
  onCardClick,
  onLikeClick,
  elseButton,
}) => {
  const [events, setEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isAllShown, setIsAllShown] = useState(false);
  const eventOnPage = 12;
  const totalPages = Math.ceil(list.length / eventOnPage);

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleShowAll = () => {
    if (isAllShown) {
      setEvents(previousEvents); // Возвращаем предыдущие события
      setIsAllShown(false);
      setPage(page);
    } else {
      setPreviousEvents(events); // Сохраняем текущие события
      setEvents(list);
      setIsAllShown(true);
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
        {events.map((event, index) =>
          index === 2 && span ? (
            <SpanCard key={index} />
          ) : (
            <VerticalEventCard
              key={event.id}
              event={event}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
            />
          )
        )}
        {elseButton && <ShowAllButton handleShowAll={handleShowAll} />}
      </ul>
      {elseButton && (
        <div className={styles.navigationContainer}>
          {page < totalPages && (
            <ShowMoreButton handleShowMore={handleShowMore} />
          )}
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
};

export default HorizontalEventList;
