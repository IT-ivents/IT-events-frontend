// const searchEvents = (query) => {
//   if (typeof query !== 'string') {
//     return upcomingEvents;
//   }
//   const words = query.toLowerCase().trim().split(' ');
//   // Разбиваем входящий запрос на отдельные слова и проверяем совпадение
//   // хотя бы одного слова.

//   const filteredEvents = [...upcomingEvents]
//     .map((event) => {
//       const isLiked = favorites.some((item) => item.id === event.id);
//       // Установим релевантность
//       return { ...event, isLiked, relevance: 0 };
//     })
//     .map((event) => {
//       const {
//         title,
//         description,
//         city,
//         price,
//         topic,
//         tags,
//         date_start,
//         program,
//       } = event;

//       words.forEach((word) => {
//         const lowerCaseWord = word.toLowerCase().trim();

//         if (
//           title?.toLowerCase().trim().includes(lowerCaseWord) ||
//           description?.toLowerCase().trim().includes(lowerCaseWord) ||
//           program?.toLowerCase().trim().includes(lowerCaseWord) ||
//           city?.toLowerCase().trim().includes(lowerCaseWord) ||
//           price?.toLowerCase().trim().includes(lowerCaseWord) ||
//           topic?.name?.toLowerCase().trim().includes(lowerCaseWord) ||
//           tags?.some((tag) =>
//             tag.name.toLowerCase().trim().includes(lowerCaseWord)
//           )
//         ) {
//           // При каждом совпадении увеличиваем релевантность конкретной карточки
//           // filtered в консоли показывает результат нашего поиска
//           event.relevance++;
//         }
//       });
//       const startDate = new Date(date_start).getTime();
//       event.startDate = startDate;
//       return event;
//     })
//     .filter((event) => event.relevance > 0)
//     // Сортируем по релевантности наши карточки и потом по дате от ближайшего
//     .sort((a, b) => {
//       if (a.startDate !== b.startDate) {
//         return a.startDate - b.startDate;
//       } else {
//         return b.relevance - a.relevance;
//       }
//     });

//   return filteredEvents;
// };

// const handleSearch = (query) => {
//   setSearchQuery(query);
//   const filteredResult = searchEvents(query);
//   setSearchResult(filteredResult);
//   navigate('/results');
// };
