import { useState } from 'react';
import styles from './UserInfo.module.css';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import SubmitButton from '../SubmitButton/SubmitButton';

const UserInfo = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const { values, handleChange, handleBlur, errors, disabledButton } =
    useFormWithValidation();

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePrivacyChecked = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.userInfo}>
      <h1>Персональная информация</h1>
      <span>Профиль</span>
      <h2>Редактирование личных данных</h2>
      <div className={styles.userLogo}>
        <img src="" alt="Аватар" className={styles.avatar} />
        <span>Организация</span>
      </div>
      <form>
        <div className={styles.fieldsetContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <input
              className={`${styles.input} ${
                errors.name ? styles.inputError : ''
              }`}
              id="name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              minLength={2}
              maxLength={25}
              value={values.name || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {errors.name && <span className={styles.span}>{errors.name}</span>}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="email" className={styles.label}>
              Почта
            </label>
            <input
              className={`${styles.input} ${
                errors.email ? styles.inputError : ''
              }`}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              minLength={6}
              maxLength={254}
              value={values.email || ''}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2}"
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              onKeyDown={handleKeyPress}
            />
            {errors.email && (
              <span className={styles.span}>{errors.email}</span>
            )}
          </fieldset>
          <SubmitButton
            title="Сохранить изменения"
            disabled={disabledButton || !isPrivacyChecked}
          />
          <h2>Обновление пароля</h2>
          <fieldset className={styles.fieldset}>
            <label htmlFor="password" type="password" className={styles.label}>
              Старый пароль
            </label>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.input} ${
                  errors.password ? styles.inputError : ''
                }`}
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Введите пароль"
                required
                value={values.password || ''}
                minLength={6}
                maxLength={25}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="[^\s]+"
                autoComplete="off"
                onKeyDown={handleKeyPress}
              />
              <figure
                className={`${styles.inputFigure} ${
                  !isPasswordVisible ? styles.hidden : styles.visible
                }`}
                onClick={togglePasswordVisible}
              />
            </div>
            {errors.password && (
              <span className={styles.span}>{errors.password}</span>
            )}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="password" type="password" className={styles.label}>
              Новый пароль
            </label>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.input} ${
                  errors.password ? styles.inputError : ''
                }`}
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Введите пароль"
                required
                value={values.password || ''}
                minLength={6}
                maxLength={25}
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="[^\s]+"
                autoComplete="off"
                onKeyDown={handleKeyPress}
              />
              <figure
                className={`${styles.inputFigure} ${
                  !isPasswordVisible ? styles.hidden : styles.visible
                }`}
                onClick={togglePasswordVisible}
              />
            </div>
            {errors.password && (
              <span className={styles.span}>{errors.password}</span>
            )}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="password_repeat" className={styles.label}>
              Подтвердите новый пароль
            </label>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.input} ${
                  errors.confirmPassword ? styles.inputError : ''
                }`}
                id="confirmPassword"
                name="confirmPassword"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Введите пароль"
                required
                value={values.confirmPassword || ''}
                maxLength={25}
                pattern="[^\s]+"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                onKeyDown={handleKeyPress}
              />
              <figure
                className={`${styles.inputFigure} ${
                  !isPasswordVisible ? styles.hidden : styles.visible
                }`}
                onClick={togglePasswordVisible}
              />
            </div>
            {errors.confirmPassword && (
              <span className={styles.spanConfirm}>
                {errors.confirmPassword}
              </span>
            )}
          </fieldset>
        </div>
        <SubmitButton
          title="Обновить"
          disabled={disabledButton || !isPrivacyChecked}
        />
      </form>
    </div>
  );
};

export default UserInfo;
