import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEventsList from './useEventsList';

const useSearchEvents = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { eventsFromApi, favorites } = useEventsList();

  const searchEvents = (query) => {
    if (typeof query !== 'string') {
      return eventsFromApi;
    }
    const words = query.toLowerCase().trim().split(' ');
    // Разбиваем входящий запрос на отдельные слова и проверяем совпадение
    // хотя бы одного слова.
    const filteredEvents = [...eventsFromApi]
      .map((event) => {
        const isLiked = favorites.some((item) => item.id === event.id);
        // Установим релевантность
        return { ...event, isLiked, relevance: 0 };
      })
      .map((event) => {
        const { title, description, city, price, topic, tags, date_start } =
          event;

        words.forEach((word) => {
          const lowerCaseWord = word.toLowerCase().trim();

          if (
            title?.toLowerCase().trim().includes(lowerCaseWord) ||
            description?.toLowerCase().trim().includes(lowerCaseWord) ||
            city?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
            price?.toLowerCase().trim().includes(lowerCaseWord) ||
            topic?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
            tags.some((tag) =>
              tag.name.toLowerCase().trim().includes(lowerCaseWord)
            )
          ) {
            // При каждом совпадении увеличиваем релевантность конкретной карточки
            // filtered в консоли показывает результат нашего поиска
            event.relevance++;
          }
        });
        const startDate = new Date(date_start).getTime();
        event.startDate = startDate;

        return event;
      })
      .filter((event) => event.relevance > 0)
      // Сортируем по релевантности наши карточки и потом по дате от ближайшего
      .sort((a, b) => {
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance;
        } else {
          return a.startDate - b.startDate;
        }
      });
    return filteredEvents;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResult = searchEvents(query);
    setSearchResult(filteredResult);
    navigate('/results');
  };

  const handleFilterSearch = () => {
    setSearchResult(eventsFromApi);
    navigate('/results');
  };

  return {
    searchResult,
    setSearchResult,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleFilterSearch,
  };
};

export default useSearchEvents;
