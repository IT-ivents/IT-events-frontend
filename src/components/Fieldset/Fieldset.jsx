import { useState } from 'react';
import styles from './Fieldset.module.css';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={name} type={name} className={styles.label}>
        {label} <span className={styles.spanError}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${errors ? styles.inputError : ''}`}
          id={name}
          name={name}
          type={'text' || type}
          placeholder={placeholder}
          required
          value={value || ''}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          autoComplete="off"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        {type === 'password' && type === 'confirmPassword' && (
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
