import { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import SubmitButton from '../SubmitButton/SubmitButton';
import useAuth from '../../utils/hooks/useAuth';
import attention from '../../images/tooltip_attention.svg';

const height = {
  height: '44px',
};

const UserInfo = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const { currentUser } = useAuth();
  const {
    values,
    setValues,
    handleChange,
    handleBlur,
    errors,
    disabledButton,
  } = useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.username,
        email: currentUser.email,
      });
    }
  }, [currentUser, setValues]);

  console.log(currentUser);
  console.log(values);

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

  // const userName = 'Организация';

  return (
    <div className={styles.userInfo}>
      <h1 className={styles.title}>Персональная информация</h1>
      <span className={styles.edit}>
        Здесь Вы можете поменять свои данные указанные при регистарции.
      </span>
      <form>
        <h2 className={styles.subtitle}>Мой профиль</h2>
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
              // required
              minLength={2}
              maxLength={25}
              // value={values?.name ?? currentUser?.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              autoComplete="off"
              disabled={true}
            />
            {errors.name && <span className={styles.span}>{errors.name}</span>}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="organization" className={styles.label}>
              Организация{' '}
              <span>
                <img
                  src={attention}
                  alt="Предупреждение"
                  className={styles.attention}
                />
              </span>
            </label>
            <input
              className={`${styles.input} ${
                errors.name ? styles.inputError : ''
              }`}
              id="organization"
              name="organization"
              type="text"
              placeholder="Organizator777"
              // required
              minLength={2}
              maxLength={25}
              // value={values?.name ?? currentUser?.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              autoComplete="off"
            />
            <span className={styles.support}>
              Для смены названия организации, обратитесь в поддержку
              It@connect-event@ayndex.ru
            </span>
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
              // required
              minLength={6}
              maxLength={254}
              value={values?.email || currentUser?.email}
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
          <div className={styles.button}>
            <SubmitButton
              title="Сохранить изменения"
              disabled={disabledButton}
              style={height}
            />
          </div>
        </div>
      </form>
      <form>
        <h2 className={styles.subtitle}>Смена пароля</h2>
        <div className={styles.fieldsetContainer}>
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
                // required
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
                // required
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
                // required
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
        <div className={styles.button}>
          <SubmitButton
            title="Обновить"
            disabled={disabledButton || !isPrivacyChecked}
            style={height}
          />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
