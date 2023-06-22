import styles from './ModalSignUp.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

const ModalSignUp = ({ isOpen, handleClose, onSignUp }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isServerError = false;
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    disabledButton,
    resetForm,
  } = useFormWithValidation();

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    onSignUp();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className={styles.modalContainer}>
        <Logo />
        <div className={styles.titleContainer}>
          <figure className={styles.figure} />
          <h3 className={styles.formTitle}>Новая регистрация</h3>
        </div>
        <p
          className={`${styles.formSubtext} ${
            isServerError ? styles.paddingError : styles.paddingNoError
          }`}
        >
          Для организаторов
        </p>
        {isServerError && (
          <div className={styles.errorContainer}>
            <figure className={styles.serverErrorFigure} />
            <span className={styles.serverError}>
              Пользователь с такой почтой уже зарегистрирован.
            </span>
          </div>
        )}
        <form className={styles.modalForm} noValidate>
          <div className={styles.fieldsetContainer}>
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
                pattern="[^\s]+@[^\s]+"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
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
                  placeholder="Введите пароль"
                  required
                  value={values.password}
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
                Повторите пароль
              </label>
              <div className={styles.inputContainer}>
                <input
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ''
                  }`}
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  required
                  value={values.passwordRepeat || ''}
                  minLength={6}
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
              <span className={styles.span}></span>
            </fieldset>
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.checkboxContainer}>
              <CustomCheckbox />
              <span className={styles.checkboxText}>
                Нажимая кнопку «Регистрация», вы соглашаетесь с{' '}
                <Link to="#" className={styles.linkPolicy}>
                  Политикой конфиденциальности.
                </Link>
              </span>
            </div>
          </div>
          <button
            className={styles.submitBtn}
            type="submit"
            onSubmit={handleSignUp}
            disabled={disabledButton}
          >
            Регистрация
          </button>
          <p className={styles.formSubtext}></p>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
