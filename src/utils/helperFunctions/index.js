export const parsePrice = (priceString) => {
  const price = priceString.replace(/\D/g, '');
  return parseInt(price);
};

export const parseDate = (dateString) => {
  const parts = dateString.split(' ');
  const day = parseInt(parts[0]);
  const month = parseMonth(parts[1]);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return new Date(year, month, day);
};

export const parseMonth = (monthString) => {
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return monthNames.indexOf(monthString);
};

export const parseEventDate = (dateString) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${day} ${month}`;
};

export const formatDate = (dateString) => {
  const options = { weekday: 'short', day: 'numeric', month: 'long' };
  const date = new Date(dateString);
  const formattedDay = date.toLocaleDateString('ru-RU', options).slice(0, 2);
  const capitalizedDay =
    formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
  const formattedDate = date
    .toLocaleDateString('ru-RU', options)
    .replace(formattedDay, capitalizedDay);
  return formattedDate;
};
