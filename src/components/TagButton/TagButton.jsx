import styles from './TagButton.module.css';
import Cross from './../../images/Actions/Close.svg';
import { useFiltersContext } from '../../utils/context/SearchFilterContext';

const TagButton = ({ value, handleChange, disabled }) => {
  const { values } = useFiltersContext();

  const handleClick = (value) => {
    handleChange({ tags: value });
  };

  return (
    <button
      onClick={() => handleClick(value)}
      className={`${styles.tagElement} ${
        values.tags.includes(value) ? styles.clicked : ''
      }`}
      disabled={disabled}
    >
      {value}
      {values.tags.includes(value) && <img src={Cross} alt="Cross" />}
    </button>
  );
};

export default TagButton;
