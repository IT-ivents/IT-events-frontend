import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiEvents } from '../api';
import { getCurrentEvents, getRandomEvents } from '../helperFunctions';

function useEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [mostAnticipatedEvents, setMostAnticipatedEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [soonEvents, setSoonEvents] = useState([]);
  const [interestingEvents, setInterestingEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // ------------ ПОЛУЧЕНИЕ СОБЫТИЙ С СЕРВЕРА ------------ //
  useEffect(() => {
    const fetchDataAndSaveToLocalStorage = async () => {
      try {
        const data = await apiEvents.getEvents();
        const newData = data.data;
        updateEventArrays(newData);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };
    const updateEventArrays = (events) => {
      const updatedEvents = events.map((event) => {
        const isLiked = favoriteEvents.some((item) => item.id === event.id);
        return { ...event, isLiked };
      });
      // ДЕЛИМ НА ПРЕДСТОЯЩИЕ И ПРОШЕДШИЕ
      const upcomingEvents = getCurrentEvents([...updatedEvents]);
      //const pastEvents = getPastEvents([...eventsFromApi]);
      const recommended = getRandomEvents([...upcomingEvents], 4);
      console.log('Upcoming events:', upcomingEvents);
      setRecommendedEvents(recommended);
      setMostAnticipatedEvents(upcomingEvents);
      setPopularEvents(upcomingEvents.slice(9, 24));
      setInterestingEvents(upcomingEvents.slice(10, upcomingEvents.length - 1));
      setSoonEvents(upcomingEvents.slice(0, 6));
      setSearchResult(upcomingEvents);
      setUpcomingEvents(upcomingEvents);
      localStorage.setItem('eventsData', JSON.stringify(upcomingEvents));
    };

    const fetchData = async () => {
      try {
        const savedFavorites = localStorage.getItem('favoriteEvents');
        if (savedFavorites) {
          setFavoriteEvents(JSON.parse(savedFavorites));
        }
        const storagedEvents = localStorage.getItem('eventsData');
        if (!storagedEvents) {
          await fetchDataAndSaveToLocalStorage();
        } else {
          updateEventArrays(JSON.parse(storagedEvents));
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
    // ОБНОВЛЕНИЕ СОБЫТИЙ С СЕРВЕРА КАЖДЫЕ 7 МИНУТ
    const interval = setInterval(() => {
      localStorage.removeItem('eventsData');
      console.log('Обновились данные');
      fetchData();
    }, 420000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Сохранение избранных событий в локальное хранилище
  useEffect(() => {
    if (favoriteEvents.length >= 0) {
      localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
      //console.log('Favorites saved:', favorites);
    }
  }, [favoriteEvents]);

  // Cохранение текущего события в локальное хранилище чтобы не терять контекст.
  useEffect(() => {
    if (selectedEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    }
  }, [selectedEvent]);

  useEffect(() => {
    const savedSelectedEvent = localStorage.getItem('selectedEvent');
    if (savedSelectedEvent) {
      setSelectedEvent(JSON.parse(savedSelectedEvent));
    }
  }, []);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  // Функция обновления массива избранных событий
  const updateFavorites = (event) => {
    setFavoriteEvents((prevFavorites) => {
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
  // MAIN LIKE UPDATE FUNCTION
  const toggleFavorite = (event) => {
    updateFavorites(event);
    // Обновление isLiked у selectedEvent
    const updatedSelectedEvent = { ...selectedEvent };
    if (selectedEvent && selectedEvent.id === event.id) {
      updatedSelectedEvent.isLiked = !updatedSelectedEvent.isLiked;
    }
    setSelectedEvent(updatedSelectedEvent);
  };

  // Функция обновления массивов событий при изменении избранных
  useEffect(() => {
    setMostAnticipatedEvents((prevEvents) => updateEvents(prevEvents));
    setPopularEvents((prevEvents) => updateEvents(prevEvents));
    setSoonEvents((prevEvents) => updateEvents(prevEvents));
    setInterestingEvents((prevEvents) => updateEvents(prevEvents));
    setSearchResult((prevEvents) => updateEvents(prevEvents));
    setRecommendedEvents((prevEvents) => updateEvents(prevEvents));
    //setEventsFromApi((prevEvents) => updateEvents(prevEvents));
    setUpcomingEvents((prevEvents) => updateEvents(prevEvents));
  }, [favoriteEvents]);

  // Функция обновления массивов событий
  function updateEvents(events) {
    return events.map((event) => {
      const isLiked = favoriteEvents.some((item) => item.id === event.id);
      return { ...event, isLiked };
    });
  }

  // RESERVE SearchEvents in reserveFuntions.js

  const handleSearch = (request) => {
    setSearchQuery(request);
    apiEvents
      .searchRequest(request)
      .then((response) => {
        const filteredResult = response.data;
        const newResult = updateEvents(filteredResult);
        setSearchResult(newResult);
        navigate('/results');
      })
      .catch((error) => {
        console.error('Ошибка при получении результатов поиска', error);
      });
  };

  const handleFilterSearch = () => {
    //setSearchQuery(query)
    setSearchResult(upcomingEvents);
    navigate('/results');
  };

  return {
    recommendedEvents,
    mostAnticipatedEvents,
    popularEvents,
    interestingEvents,
    soonEvents,
    searchResult,
    selectedEvent,
    setSelectedEvent,
    favoriteEvents,
    handleCardClick,
    toggleFavorite,
    handleSearch,
    handleFilterSearch,
    searchQuery,
  };
}

export default useEvents;
