import { useState } from 'react';
import styles from './Fieldset.module.css';
import attention from '../../images/tooltip_attention.svg';
import Tooltip from '../Tooltip/Tooltip';

const Fieldset = ({
  name,
  label,
  type,
  value,
  errors,
  placeholder,
  minLength,
  maxLength,
  onKeyDown,
  onChange,
  onBlur,
  onPaste,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <fieldset className={styles.fieldset}>
      {isTooltipVisible && <Tooltip onClick={toggleTooltip} />}
      <label htmlFor={name} type={name} className={styles.label}>
        {label} <span className={styles.spanError}>*</span>
        {name === 'organization_name' && (
          <img
            className={styles.recommendation}
            alt="attention"
            src={attention}
            onClick={toggleTooltip}
          />
        )}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${errors ? styles.inputError : ''}`}
          id={name}
          name={name}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          required
          value={value || ''}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          autoComplete="off"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onPaste={onPaste}
        />
        {type === 'password' && (
          <figure
            className={`${styles.inputFigure} ${
              !isPasswordVisible ? styles.hidden : styles.visible
            }`}
            onClick={togglePasswordVisible}
          />
        )}
      </div>
      {errors && <span className={styles.span}>{errors}</span>}
    </fieldset>
  );
};

export default Fieldset;
