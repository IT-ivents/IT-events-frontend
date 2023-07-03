import { useState } from 'react';
import debounce from '../debounce';
import { useInitialFilter } from './useInitialFilter';

export function useFilter({ values, setValues, setFindValues }) {
  const { dataLists } = useInitialFilter();
  const [date, setDate] = useState(null);

  const handleFilter = ({ name, value }) => {
    console.log(dataLists);
    const searchList = dataLists[name]?.map((item) => item?.toLowerCase());
    const debouncedSetFindValues = debounce((data) => setFindValues(data), 500);

    if (searchList && value !== '') {
      const findValue = searchList.filter((el) => {
        return el.search(value.toLowerCase()) === 0;
      });

      if (findValue.length > 0) {
        debouncedSetFindValues({ [name]: findValue });
      } else debouncedSetFindValues(null);
    } else debouncedSetFindValues(null);
  };

  const handleInputChange = (event) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    if (name === 'specialities' || name === 'status') {
      const includes = values[name].includes(value);

      if (includes) {
        setValues({
          ...values,
          [name]: values[name].filter((el) => el !== value),
        });
      } else {
        setValues({ ...values, [name]: [...values[name], value] });
      }
    } else if (date && value === 'Выбрать дату') {
      setValues({ ...values, date: date });
    } else {
      setValues({ ...values, [name]: value });
      handleFilter({ name, value });
    }
  };

  const handleDateChange = (event) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    if (value !== '') {
      setDate(value);
      setValues({ ...values, [name]: value });
    } else {
      setDate(null);
      setValues({ ...values, [name]: null });
    }
  };

  const handleButtonChange = (data) => {
    const includes = values.tags.includes(data.tags);

    if (includes) {
      setValues({
        ...values,
        tags: values.tags.filter((el) => el !== data.tags),
      });
    } else {
      setValues({ ...values, tags: [...values.tags, data.tags] });
    }
  };

  const setItemOnClick = (item) => {
    setValues({ ...values, ...item });
    setFindValues(null);
  };

  const deleteValue = (item) => {
    if (item === 'status' || item === 'tags' || item === 'specialities') {
      setValues({ ...values, [item]: [] });
    } else setValues({ ...values, [item]: null });
  };

  const handleDateBlur = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const selectedDate = values.date;

    // Проверяем, выбрана ли дата до конца
    if (selectedDate === '') {
      // Дата не выбрана
      // Устанавливаем open в true, чтобы календарь не закрывался
      setValues({ ...values, date: '', open: true });
    } else if (selectedDate > currentDate) {
      // Выбранная дата позже текущей даты
      // Выполняем соответствующие действия
      console.log('Выбранная дата позже текущей даты:', selectedDate);
      setValues({ ...values, open: false });
    } else {
      // Выбранная дата до или равна текущей дате
      // Выполняем соответствующие действия
      console.log('Выбранная дата до или равна текущей дате:', selectedDate);
      setValues({ ...values, open: false });
    }
  };

  return {
    handleInputChange,
    handleButtonChange,
    setItemOnClick,
    deleteValue,
    handleDateChange,
    handleDateBlur,
  };
}
