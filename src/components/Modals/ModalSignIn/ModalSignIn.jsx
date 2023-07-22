import styles from './ModalSignIn.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

const ModalSignIn = ({
  isOpen,
  handleClose,
  isRegister,
  onSignIn,
  serverError,
  setServerError,
  loggedIn,
}) => {
  const {
    values,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const disabledButton =
    !isValid ||
    !values.email ||
    !values.password ||
    errors.email ||
    errors.password;

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    resetForm();
    setServerError('');
  }, []);

  useEffect(() => {
    if (loggedIn) {
      handleClose();
    }
  }, [loggedIn, handleClose]);

  const handleSignIn = (e) => {
    e.preventDefault();
    onSignIn({
      email: values.email,
      password: values.password,
    });
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
            serverError ? styles.paddingError : styles.paddingNoError
          }`}
        >
          Чтобы создать своё событие, необходимо войти на сайт
        </p>
        {serverError && (
          <div className={styles.errorContainer}>
            <figure className={styles.serverErrorFigure} />
            <span className={styles.serverError}>{serverError}</span>
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
                Почта <span className={styles.spanError}>*</span>
              </label>
              <input
                className={`${styles.input} ${
                  errors.email && values.email ? styles.inputError : ''
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                minLength={6}
                maxLength={254}
                autoComplete="off"
                value={values.email || ''}
                onChange={handleEmailChange}
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
                Пароль <span className={styles.spanError}>*</span>
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
                  onChange={handlePasswordChange}
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
            <button type="button" className={styles.btnForgot}>
              Забыли пароль?
            </button>
            <div className={styles.checkboxContainer}>
              <CustomCheckbox />
              <span className={styles.checkboxText}>Запомнить</span>
            </div>
          </div>
          <SubmitButton
            type="submit"
            title="Войти"
            disabled={disabledButton}
            onClick={handleSignIn}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignIn;
