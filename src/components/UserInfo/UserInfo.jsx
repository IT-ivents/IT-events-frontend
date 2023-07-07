import { useState, useEffect } from 'react';
import styles from './UserInfo.module.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import SubmitButton from '../SubmitButton/SubmitButton';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';
import useAuth from '../../utils/hooks/useAuth';
import attention from '../../images/tooltip_attention.svg';
import AddImage from '../../images/Actions/Add.svg';

const height = {
  height: '44px',
};

const UserInfo = ({ onNewEventClick }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { currentUser, isLoading } = useAuth();
  const { values, setValues, isValid, handleChange, handleBlur, errors } =
    useFormWithValidation();

  const disabledButton =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || '',
        email: currentUser.email || '',
        organization_name: currentUser.organization_name || '',
      });
    }
  }, [currentUser, setValues]);

  // console.log(currentUser);
  // console.log(values);

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

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.userHeader}>
        <div>
          <h1 className={styles.title}>Персональная информация</h1>
          <span className={styles.edit}>
            Здесь Вы можете поменять свои данные указанные при регистарции.
          </span>
        </div>
        <Link
          to="/organization"
          className={styles.link}
          onClick={onNewEventClick}
        >
          <button title="Создать событие" className={styles.create}>
            <img src={AddImage} alt="Создать событие" />
            Создать событие
          </button>
        </Link>
      </div>
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
              value={values.name || ''}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={25}
              autoComplete="off"
            />
            {errors.name && <span className={styles.span}>{errors.name}</span>}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="organization" className={styles.label}>
              Организация{' '}
              {isTooltipVisible && (
                <Tooltip onClick={toggleTooltip} right={'-8%'} />
              )}
              <img
                className={styles.recommendation}
                alt="attention"
                src={attention}
                onClick={toggleTooltip}
              />
            </label>
            <input
              className={`${styles.input} ${
                errors.name ? styles.inputError : ''
              }`}
              id="organization_name"
              name="organization_name"
              type="text"
              value={values.organization_name || ''}
              disabled={true}
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
              required
              minLength={6}
              maxLength={254}
              value={values?.email || ''}
              pattern="^([\\w.%+-]+)@([\\w-]+\\.)+([\\w]{2,})$"
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
            <label
              htmlFor="newPassword"
              type="password"
              className={styles.label}
            >
              Новый пароль
            </label>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.input} ${
                  errors.newPassword ? styles.inputError : ''
                }`}
                id="newPassword"
                name="newPassword"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Введите пароль"
                // required
                value={values.newPassword || ''}
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
            {errors.newPassword && (
              <span className={styles.span}>{errors.newPassword}</span>
            )}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="confirmPassword" className={styles.label}>
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
