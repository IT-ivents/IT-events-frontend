import styles from './Pages.module.css';
import LeftFilterBar from './../components/LeftFilterBar/LeftFilterBar';
import VerticalEventList from '../components/VerticalEventList/VerticalEventList';

const SearchResultPage = ({ searchResult, onCardClick, onLikeClick }) => {
  if (!searchResult || searchResult.length === 0) {
    return <div>Ничего не найдено</div>;
  }

  return (
    <section className={styles.searchResultPageWrapper}>
      <LeftFilterBar />
      <VerticalEventList
        events={searchResult}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
      />
    </section>
  );
};

export default SearchResultPage;
