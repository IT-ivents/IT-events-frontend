import React, { useEffect, useState } from 'react';
import styles from './HorizontalEventList.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import ShowAllButton from '../ShowAllButton/ShowAllButton';
// import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Pagination from '../Pagination/Pagination';
import SpanCard from '../SpanCard/SpanCard';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const HorizontalEventList = ({
  list,
  title,
  span,
  onCardClick,
  onLikeClick,
  elseButton,
  eventOnPage,
}) => {
  const [events, setEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isAllShown, setIsAllShown] = useState(false);
  const location = useLocation();

  const totalPages = Math.ceil(list.length / eventOnPage);

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
  const getPageItems = () => {
    const startIndex = (page - 1) * eventOnPage;
    const endIndex = startIndex + eventOnPage;
    return list.slice(startIndex, endIndex);
  };

  const displayedList = location.pathname === '/event' ? list : getPageItems();

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <ul className={styles.list}>
        {displayedList.map((event, index) => (
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={event.id}
            className={styles.listItem}
          >
            {index === 2 && span && page === 1 ? (
              <React.Fragment key={event.id}>
                <SpanCard />
              </React.Fragment>
            ) : (
              <React.Fragment key={event.id}>
                <VerticalEventCard
                  event={event}
                  onCardClick={onCardClick}
                  onLikeClick={onLikeClick}
                />
              </React.Fragment>
            )}
          </motion.li>
        ))}

        {totalPages > 1 && <ShowAllButton handleShowAll={handleShowAll} />}
      </ul>
      {totalPages > 1 && (
        <div className={styles.navigationContainer}>
          {events.length <= list.length && events.length !== list.length && (
            // Если были показаны все события, то отображать пагинацию не нужно.
            <>
              {/* <ShowMoreButton handleShowMore={handleShowMore} /> */}
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
