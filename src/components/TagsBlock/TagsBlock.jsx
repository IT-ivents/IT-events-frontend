import { useState } from 'react';
import styles from './TagsBlock.module.css';
import Cross from './../../images/Actions/Close.svg';

const tagValues = [
  'Python',
  'С++',
  'Java',
  'Go',
  'Data Science',
  'HR',
  'ML',
  'UX',
  'UX/UI',
  'Scala',
  'Product Design',
  'iOS',
  'Android',
];

const TagsBlock = () => {
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleClick = (value) => {
    if (clickedButtons.includes(value)) {
      setClickedButtons(clickedButtons.filter((button) => button !== value));
    } else {
      setClickedButtons([...clickedButtons, value]);
    }
  };

  return (
    <ul>
      <h4 className={styles.tagsListTitle}>Популярные теги</h4>
      <div className={styles.tagsList}>
        {tagValues.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.tagElement} ${
                clickedButtons.includes(value) ? styles.clicked : ''
              }`}
              onClick={() => handleClick(value)}
            >
              {value}
              {clickedButtons.includes(value) && (
                <img src={Cross} alt="Cross" />
              )}
            </button>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default TagsBlock;
