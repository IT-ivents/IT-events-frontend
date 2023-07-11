import { useEffect, useState } from 'react';
import { events } from '../../utils/events';

const useEventsList = () => {
  const [eventsFromApi, setEventsFromApi] = useState([]);
  const [mostAnticipatedEvents, setMostAnticipatedEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [soonEvents, setSoonEvents] = useState([]);
  const [interestingEvents, setInterestingEvents] = useState([]);

  const fetchDataAndSaveToLocalStorage = async () => {
    try {
      const data = events;

      setEventsFromApi(data);
      localStorage.setItem('eventsData', JSON.stringify(data));
      // Разложить события по разным массивам
      if (data) {
        const mostAnticipated = data.slice(0, 6);
        const popular = data.slice(7, 19);
        const interesting = data.slice(19, 31);
        const soon = data.slice(32, data.length - 1);

        setMostAnticipatedEvents(mostAnticipated);
        setPopularEvents(popular);
        setInterestingEvents(interesting);
        setSoonEvents(soon);
      } else {
        throw new Error('Неверный формат данных eventsData:');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  // Если Events есть в сторадж, достаем оттуда
  useEffect(() => {
    const storagedEventsData = localStorage.getItem('eventsData');
    if (!storagedEventsData) {
      fetchDataAndSaveToLocalStorage();
    } else {
      try {
        const resultData = JSON.parse(storagedEventsData);
        setEventsFromApi(resultData);
        // Разложить события по разным массивам
        const mostAnticipated = resultData.slice(0, 6);
        const popular = resultData.slice(7, 19);
        const interesting = resultData.slice(19, 31);
        const soon = resultData.slice(32, resultData.length - 1);
        setMostAnticipatedEvents(mostAnticipated);
        setPopularEvents(popular);
        setInterestingEvents(interesting);
        setSoonEvents(soon);
      } catch (error) {
        console.error('Неверный формат данных eventsData:', error);
      }
    }
    // Обновление данных с сервера и сохранение в локальном хранилище
    fetchDataAndSaveToLocalStorage();
    // Устанавливаем интервал для периодического обновления данных
    const interval = setInterval(() => {
      fetchDataAndSaveToLocalStorage();
    }, 5 * 60 * 1000); // 5 минут в миллисекундах
    // Очищаем интервал при размонтировании компонента
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    eventsFromApi,
    soonEvents,
    popularEvents,
    interestingEvents,
    mostAnticipatedEvents,
    setMostAnticipatedEvents,
    setPopularEvents,
    setSoonEvents,
    setInterestingEvents,
    setEventsFromApi,
  };
};

export default useEventsList;
