import styles from './ModalSignIn.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

const ModalSignIn = ({ isOpen, handleClose, isRegister, onSignIn }) => {
  const isServerError = false;
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    disabledButton,
    resetForm,
  } = useFormWithValidation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    onSignIn();
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className={styles.modalContainer}>
        <Logo />
        <div className={styles.titleContainer}>
          <figure className={styles.figure} />
          <h3 className={styles.formTitle}>Вход для организаторов</h3>
        </div>
        <p
          className={`${styles.formSubtext} ${
            isServerError ? styles.paddingError : styles.paddingNoError
          }`}
        >
          Чтобы создать своё событие, необходимо войти на сайт
        </p>
        {isServerError && (
          <div className={styles.errorContainer}>
            <figure className={styles.serverErrorFigure} />
            <span className={styles.serverError}>
              Логин или пароль не совпадают. Проверьте правильность введённых
              данных.
            </span>
          </div>
        )}
        <form className={styles.modalForm} onSubmit={handleSignIn} noValidate>
          <div className={styles.buttonsContainer}>
            <span className={styles.noAccount}>Нет аккаунта?</span>
            <button
              type="button"
              onClick={isRegister}
              className={styles.registerBtn}
            >
              Регистрация
            </button>
          </div>
          <div className={styles.fieldsetContainer}>
            <fieldset className={styles.fieldset}>
              <label htmlFor="email" className={styles.label}>
                Почта
              </label>
              <input
                className={`${styles.input} ${
                  errors.email && values.email ? styles.inputError : ''
                }`}
                id="email"
                name="email"
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2}"
                placeholder="Email"
                required
                minLength={6}
                maxLength={254}
                autoComplete="off"
                value={values.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
              />

              {errors.email && (
                <span className={styles.span}>{errors.email}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label
                htmlFor="password"
                type="password"
                className={styles.label}
              >
                Пароль
              </label>
              <div className={styles.inputContainer}>
                <input
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ''
                  }`}
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  pattern="[^\s]+"
                  placeholder="Введите пароль"
                  required
                  minLength={6}
                  maxLength={25}
                  autoComplete="off"
                  value={values.password || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
          </div>
          <div className={styles.linksContainerBottom}>
            <Link to="#" className={styles.linkForgot}>
              Забыли пароль?
            </Link>
            <div className={styles.checkboxContainer}>
              <CustomCheckbox />
              <span className={styles.checkboxText}>Запомнить</span>
            </div>
          </div>
          <SubmitButton title="Войти" disabled={disabledButton} />
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignIn;
