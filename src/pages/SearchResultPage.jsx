import { useContext, useState } from 'react';
import styles from './Pages.module.css';
import Pagination from '../components/Pagination/Pagination';
import LeftFilterBar from './../components/LeftFilterBar/LeftFilterBar';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import PageTitle from '../components/PageTitle/PageTitle';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';
import { useFilterdList } from '../utils/hooks/useFilteredList';
import SearchFilterContext from '../utils/context/SearchFilterContext';
import { useEventsContext } from '../utils/context/EventsContext';

const SearchResultPage = () => {
  const { values } = useContext(SearchFilterContext);
  const { popularEvents, searchResult } = useEventsContext();
  const { filteredList } = useFilterdList({ values, searchResult });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const isNothingFind = !filteredList || filteredList.length === 0;

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleShowLess = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getPageItems = () => {
    console.log(filteredList, 'filteredList');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredList.slice(startIndex, endIndex);
  };

  const filterBar = {
    margin: '32px 0',
  };

  return (
    <section className={styles.searchResultPageWrapper}>
      <LeftFilterBar />
      <div>
        <TopFilersBar style={filterBar} />
        {isNothingFind && (
          <PageTitle
            title="Ничего не нашлось"
            subtitle="Но нам есть, что предложить"
          />
        )}
        <div className={styles.searchResultListContainer}>
          <VerticalEventList events={getPageItems()} />
          {popularEvents.length > itemsPerPage &&
            filteredList.length <= itemsPerPage && (
              <VerticalEventList
                title="Популярное"
                events={popularEvents.slice(
                  0,
                  itemsPerPage - filteredList.length
                )}
              />
            )}
          {totalPages > 1 && (
            <div className={styles.navigationContainer}>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                handleShowMore={handleShowMore}
                handleShowLess={handleShowLess}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResultPage;
