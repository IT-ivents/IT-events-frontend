import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomEvents } from '../../utils/helperFunctions';
import useEventsList from './useEventsList';

const useFavorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const { eventsFromApi } = useEventsList();

  const recommendedList = useMemo(() => {
    if (!selectedEvent || !selectedEvent.tags) {
      return [];
    }
    const recommended = eventsFromApi.filter((event) => {
      return (
        // Исключаем попадание выбранной карточки в список рекомендаций
        event.id !== selectedEvent.id &&
        event.tags.some((tag) => {
          const tagName = tag.name.toLowerCase().trim();
          return selectedEvent.tags.some(
            (selectedTag) => selectedTag.name.toLowerCase().trim() === tagName
          );
        })
      );
    });
    if (recommended.length === 0) {
      const randomEvents = getRandomEvents(eventsFromApi, 4);
      setRecommendedEvents(randomEvents);
      return randomEvents; // Добавлен возврат значения
    } else {
      setRecommendedEvents(recommended.slice(0, 4));
      return recommended.slice(0, 4); // Добавлен возврат значения
    }
  }, [selectedEvent, eventsFromApi]);

  // Загрузка текущего события в локальное хранилище
  useEffect(() => {
    const savedSelectedEvent = JSON.parse(
      localStorage.getItem('selectedEvent')
    );
    if (savedSelectedEvent) {
      setSelectedEvent(savedSelectedEvent);
    }
  }, []);

  // Cохранение текущего события в локальное хранилище чтобы не терять контекст
  useEffect(() => {
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  }, [selectedEvent]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    navigate(`event/${event.id}`);
  };

  // Загрузка избранных событий из локального хранилища
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // Сохранение избранных событий в локальное хранилище
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Функция обновления массива избранных событий
  const updateFavorites = (event) => {
    setFavorites((prevFavorites) => {
      const isEventInFavorites = prevFavorites.some(
        (item) => item.id === event.id
      );
      if (!isEventInFavorites) {
        return [...prevFavorites, { ...event, isLiked: true }];
      } else {
        return prevFavorites.filter((item) => item.id !== event.id);
      }
    });
  };

  const toggleFavorite = (event) => {
    updateFavorites(event);
    // Обновление isLiked у selectedEvent
    const updatedSelectedEvent = { ...selectedEvent };

    if (selectedEvent && selectedEvent.id === event.id) {
      updatedSelectedEvent.isLiked = !updatedSelectedEvent.isLiked;
    }
    setSelectedEvent(updatedSelectedEvent);
  };

  return {
    favorites,
    handleCardClick,
    toggleFavorite,
    setSelectedEvent,
    recommendedEvents,
    setRecommendedEvents,
    selectedEvent,
  };
};

export default useFavorites;
