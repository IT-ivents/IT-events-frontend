import styles from './ModalSignIn.module.css';
import { useEffect } from 'react';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import Fieldset from '../../Fieldset/Fieldset';
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
    preventInvalidPaste,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  const disabledButton =
    !isValid ||
    !values.email ||
    !values.password ||
    errors.email ||
    errors.password;

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
            <Fieldset
              name="email"
              label="Почта"
              type="email"
              placeholder="Email"
              minLength={6}
              maxLength={254}
              value={values.email}
              errors={errors.email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
              onPaste={preventInvalidPaste}
            />
            <Fieldset
              name="password"
              type="password"
              label="Пароль"
              placeholder="Введите пароль"
              minLength={6}
              maxLength={25}
              value={values.password}
              errors={errors.password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
              onPaste={preventInvalidPaste}
            />
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
