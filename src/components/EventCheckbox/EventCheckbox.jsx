import { useState } from 'react';
import styles from './EventCheckbox.module.css';

const EventCheckbox = ({ event, checked, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onCheckboxChange(event, e.target.checked);
  };

  return (
    <label htmlFor={event.id}>
      <input
        onChange={handleChange}
        id={event.id}
        name={event.id}
        value={event.id}
        type="checkbox"
        className={styles.checkboxButton}
        checked={isChecked}
      />
      <span className={styles.checkboxLabel}></span>
    </label>
  );
};

export default EventCheckbox;
