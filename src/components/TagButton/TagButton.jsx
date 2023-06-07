import { useState } from 'react';
import styles from './TagButton.module.css';
import Cross from './../../images/Actions/Close.svg';

const TagButton = ({ value, handleChange }) => {
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleClick = (value) => {
    if (clickedButtons.includes(value)) {
      setClickedButtons(clickedButtons.filter((button) => button !== value));
    } else {
      setClickedButtons([...clickedButtons, value]);
    }
    handleChange({ tags: value });
  };

  return (
    <button
      onClick={() => handleClick(value)}
      className={`${styles.tagElement} ${
        clickedButtons.includes(value) ? styles.clicked : ''
      }`}
    >
      {value}
      {clickedButtons.includes(value) && <img src={Cross} alt="Cross" />}
    </button>
  );
};

export default TagButton;
