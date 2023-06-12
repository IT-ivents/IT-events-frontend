export const parsePrice = (priceString) => {
  const price = priceString.replace(/\D/g, '');
  return parseInt(price);
};

export const formatPrice = (price) => {
  if (price === '0.00') {
    return 'Бесплатно';
  } else {
    const formattedPrice = parseFloat(price).toFixed(2);
    return `${formattedPrice.replace('.00', '')} ₽`;
  }
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

// Функция для получения случайных элементов из массива
export const getRandomEvents = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const handleCopyLink = (link, setShowNotification) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1500);
      })
      .catch((error) => {
        console.error('Не удалось скопировать ссылку:', error);
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 1500);
    } catch (error) {
      console.error('Не удалось скопировать ссылку:', error);
    }
    document.body.removeChild(textArea);
  }
};
