import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import SearchFilterContext from '../../utils/context/SearchFilterContext';

const MyDatePicker = () => {
  const { values, setValues } = useContext(SearchFilterContext);

  const handleDateChange = (selectedDate) => {
    setValues((prevValues) => ({
      ...prevValues,
      date: selectedDate,
    }));
  };

  return (
    <DatePicker
      selected={values.date}
      onChange={handleDateChange}
      dateFormat="dd.MM.yyyy"
      locale={ru}
      placeholderText="Выберите дату"
    />
  );
};

export default MyDatePicker;
