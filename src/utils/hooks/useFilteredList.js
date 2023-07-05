import { useEffect, useState } from 'react';

export function useFilterdList({ values, searchResult }) {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    console.log('useFilterdList called'); // Отладочный вывод
  }, [values, searchResult]);

  //список городов из листа событий
  const cityDB = searchResult.map((item) => item.city).filter((item) => item);
  const filteredCityList = [...new Set(cityDB.map((item) => item.name))];

  //список тегов из листа событий
  const tagDB = searchResult.map(
    (item) => item.tags && item.tags.map((item) => item.name)
  );
  const filteredTagList = [...new Set(tagDB.flat())];

  useEffect(() => {
    const filteredEvents = filterArray(searchResult, values);
    setFilteredList(filteredEvents);
  }, [searchResult, values]);

  function filterArray(array, filterParams) {
    let { status, city, date, specialities, price, tags } = filterParams;
    let filteredArray = array;

    if (status.length === 1) {
      filteredArray = filteredArray.filter(
        (event) => event.format[0]?.name === status[0]
      );
    }
    if (city) {
      filteredArray = filteredArray.filter(
        (event) => event.city?.name?.toLowerCase() === city
      );
    }
    if (price && price === 'Бесплатно') {
      filteredArray = filteredArray.filter((event) => event.price === '0.00');
    }
    if (price && price === 'Платно') {
      filteredArray = filteredArray.filter((event) => event.price !== '0.00');
    }

    if (specialities.length > 0) {
      filteredArray = filteredArray.filter((event) => {
        return (
          event &&
          event.topic &&
          Array.isArray(event.topic) &&
          event.topic.some((topic) => specialities.includes(topic.name))
        );
      });
    }
    // добавляем дополнительную проверку Array.isArray(event.topic),
    // чтобы убедиться, что event.topic является массивом.
    // Затем мы используем метод some(), чтобы проверить,
    // совпадает ли хотя бы одно из event.topic[i].name с элементом списка specialities

    if (tags.length > 0) {
      filteredArray = filteredArray.filter((event) => {
        let { tags: tagsList } = event;
        tagsList = tagsList.map((tag) => tag.name.toLowerCase());
        const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
        return tagsList && tagsList.some((tag) => lowerCaseTags.includes(tag));
      });
    }

    if (date) {
      const today = new Date();
      const tomorrow = new Date().setDate(today.getDate() + 1);
      const afterTomorrow = new Date().setDate(today.getDate() + 2);
      const weekendStart = new Date().setDate(
        today.getDate() + (6 - today.getDay())
      );
      const weekendEnd = new Date().setDate(
        today.getDate() + (7 - today.getDay())
      );
      const weekStart = new Date().setDate(today.getDate() - today.getDay());
      const weekEnd = new Date().setDate(
        today.getDate() + (6 - today.getDay())
      );
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const nextMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
      );
      const nextMonthEnd = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0
      );

      if (date === 'Сегодня') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= today && date < tomorrow;
        });
      }

      if (date === 'Завтра') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= tomorrow && date < afterTomorrow;
        });
      }

      if (date === 'В эти выходные') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= weekendStart && date < weekendEnd;
        });
      }

      if (date === 'На этой неделе') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= weekStart && date < weekEnd;
        });
      }

      if (date === 'В этом месяце') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= monthStart && date <= monthEnd;
        });
      }

      if (date === 'В следующем месяце') {
        filteredArray = filteredArray.filter((event) => {
          const date = new Date(event.date_start);

          return date >= nextMonthStart && date <= nextMonthEnd;
        });
      }

      if (Date.parse(date)) {
        filteredArray = filteredArray.filter((event) => {
          const searchDate = new Date(date);
          const eventDate = new Date(event.date_start);

          return eventDate.toDateString() === searchDate.toDateString();
        });
      }
    }

    return filteredArray;
  }

  return {
    filteredCityList,
    filteredTagList,
    filteredList,
  };
}
