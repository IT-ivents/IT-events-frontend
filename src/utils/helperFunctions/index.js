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
