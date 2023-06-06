import styles from './Pages.module.css';
import LeftFilterBar from './../components/LeftFilterBar/LeftFilterBar';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';
import PageTitle from '../components/PageTitle/PageTitle';

const SearchResultPage = ({
  searchResult,
  popularEvents,
  onCardClick,
  onLikeClick,
}) => {
  const isNothingFind = !searchResult || searchResult.length === 0;

  return (
    <section className={styles.searchResultPageWrapper}>
      <LeftFilterBar />
      {isNothingFind ? (
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
      ) : (
        <div className={styles.searchResultListContainer}>
          <VerticalEventList
            events={searchResult}
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
      )}
    </section>
  );
};

export default SearchResultPage;
