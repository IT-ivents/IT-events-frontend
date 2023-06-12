import { useContext } from 'react';
import styles from './Pages.module.css';
import LeftFilterBar from './../components/LeftFilterBar/LeftFilterBar';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import PageTitle from '../components/PageTitle/PageTitle';
import TopFilersBar from '../components/TopFilersBar/TopFilersBar';
import { useFilterdList } from '../utils/hooks/useFilteredList';
import SearchFilterContext from '../utils/context/SearchFilterContext';

const SearchResultPage = ({
  searchResult,
  popularEvents,
  onCardClick,
  onLikeClick,
}) => {
  const { values } = useContext(SearchFilterContext);
  const { filteredList } = useFilterdList({ values, searchResult });
  const isNothingFind = !filteredList || filteredList.length === 0;
  console.log('filtered', filteredList);

  return (
    <section className={styles.searchResultPageWrapper}>
      <LeftFilterBar />
      {isNothingFind ? (
        <div>
          <TopFilersBar></TopFilersBar>
          <div className={styles.searchResultContainer}>
            <PageTitle
              title="Ничего не нашлось"
              subtitle="Но нам есть, что предложить"
            />
            <VerticalEventList
              title="Популярное"
              events={popularEvents}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.topFilterContainer}>
            <TopFilersBar></TopFilersBar>
          </div>
          <div className={styles.searchResultListContainer}>
            <VerticalEventList
              events={filteredList}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
            />
            <VerticalEventList
              title="Популярное"
              events={popularEvents}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResultPage;
