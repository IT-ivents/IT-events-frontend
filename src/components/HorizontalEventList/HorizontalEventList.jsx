import React, { useEffect, useState, useCallback } from 'react';
import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import ShowAllButton from '../ShowAllButton/ShowAllButton';
// import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Pagination from '../Pagination/Pagination';
import SpanCard from '../SpanCard/SpanCard';
import { useLocation } from 'react-router-dom';

const HorizontalEventList = ({
  list,
  title,
  span,
  onCardClick,
  onLikeClick,
  eventOnPage,
}) => {
  const [page, setPage] = useState(1);
  const [isAllShown, setIsAllShown] = useState(false);
  const location = useLocation();
  const totalPages = Math.ceil(list.length / eventOnPage) || 0;
  const eventPage = location.pathname.includes('/event');

  const handleLikeClick = useCallback(
    (eventId) => {
      onLikeClick(eventId);
    },
    [] // Пустой массив зависимостей, чтобы сохранить этот экземпляр обратного вызова неизменным
  );

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleShowLess = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleShowAll = () => {
    setIsAllShown((prev) => !prev);
    setPage(1);
  };

  const getPageItems = () => {
    const startIndex = (page - 1) * eventOnPage;
    const endIndex = startIndex + eventOnPage;
    return list.slice(startIndex, endIndex);
  };

  // При нажатой кнопке "Показать все или на странице Event отображаем list : используем пагинацию"
  const listToRender = isAllShown || eventPage ? list : getPageItems();

  // useEffect(() => {
  //   setPage(1); // Сбросить страницу при смене списка
  // }, [isAllShown]);

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={styles.list}>
        {listToRender.map((event, index) =>
          index === 2 && span && page === 1 ? (
            <SpanCard key={event.id} />
          ) : (
            <VerticalEventCard
              key={event.id}
              index={index}
              event={event}
              onCardClick={onCardClick}
              onLikeClick={handleLikeClick}
            />
          )
        )}

        {totalPages > 1 && <ShowAllButton handleShowAll={handleShowAll} />}
      </ul>
      {totalPages > 1 && !isAllShown && (
        <div className={styles.navigationContainer}>
          {list.length && (
            <>
              <Pagination
                page={page}
                totalPages={totalPages}
                handleShowMore={handleShowMore}
                handleShowLess={handleShowLess}
              />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default HorizontalEventList;
