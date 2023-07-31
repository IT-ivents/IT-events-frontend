import styles from './ModalSignIn.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';
import { useAuthContext } from '../../../utils/context/AuthContext';
import { useModalContext } from '../../../utils/context/ModalContext';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import Fieldset from '../../Fieldset/Fieldset';

const ModalSignIn = () => {
  const {
    values,
    setValues,
    handleEmailChange,
    handlePasswordChange,
    preventInvalidPaste,
    errors,
    resetForm,
  } = useFormWithValidation();
  const { isModalSignInOpen, toggleModalSignIn, toggleModalSignUp } =
    useModalContext();
  const { handleLogin, serverError, setServerError, loggedIn } =
    useAuthContext();
  const [isRememberMe, setIsRemebmerMe] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const disabledButton =
    !Object.values(values).every((value) => value !== '') ||
    Object.values(errors).some((error) => error !== '');

  useEffect(() => {
    resetForm();
    setServerError('');
    setValues(initialValues);
  }, [isModalSignInOpen]);

  useEffect(() => {
    if (loggedIn) {
      toggleModalSignIn();
      navigate('/account');
    }
  }, [loggedIn]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: values.email,
      password: values.password,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const toggleRemebmerCheckbox = () => {
    if (localStorage.getItem('remembered') !== 'true') {
      setIsRemebmerMe(true);
      localStorage.setItem('remembered', true);
    } else {
      setIsRemebmerMe(false);
      localStorage.setItem('remembered', false);
    }
  };

  return (
    <Modal isOpen={isModalSignInOpen} onClose={toggleModalSignIn}>
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
              onClick={toggleModalSignUp}
              className={styles.registerBtn}
            >
              Регистрация
            </button>
          </div>
          <div className={styles.fieldsetContainer}>
            <Fieldset
              name="email"
              label="Почта"
              //type="email"
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
              <CustomCheckbox
                checked={isRememberMe}
                handleChange={toggleRemebmerCheckbox}
              />
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
