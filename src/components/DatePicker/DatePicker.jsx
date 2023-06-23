import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

const MyDatePicker = ({ selectedDate, handleDateChange, onSelect }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onSelect={onSelect}
      onChange={handleDateChange}
      dateFormat="dd.MM.yyyy"
      locale={ru}
      placeholderText="Выберите дату"
    />
  );
};
export default MyDatePicker;
