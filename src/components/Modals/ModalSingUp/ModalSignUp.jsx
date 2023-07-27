import styles from './ModalSignUp.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import Fieldset from '../../Fieldset/Fieldset';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

const ModalSignUp = ({
  isOpen,
  handleClose,
  onSignUp,
  isLoading,
  loggedIn,
  serverError,
  setServerError,
}) => {
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const {
    values,
    handleChange,
    handleNameChange,
    handleOrganizationChange,
    handleEmailChange,
    handlePasswordChange,
    preventInvalidPaste,
    isValid,
    errors,
    resetForm,
  } = useFormWithValidation();

  const disabledButton =
    !isValid ||
    (values.confirmPassword ? errors.confirmPassword !== '' : false) ||
    errors.email ||
    errors.username ||
    errors.organization ||
    !isPrivacyChecked;

  const togglePrivacyChecked = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
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

  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (isValid) {
      onSignUp({
        username: values.username,
        email: values.email,
        password: values.password,
        organization_name: values.organization_name,
      });
    }
  };

  // --------------------- ОТЛАДКА | СМОТРЕТЬ ЧТО ОТПРАВЛЕМ НА СЕРВЕР
  // const postData = {
  //   name: values.username,
  //   password: values.password,
  //   email: values.email,
  //   organization_name: values.organization_name,
  // };
  //   console.log(postData);

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
            serverError ? styles.paddingError : styles.paddingNoError
          }`}
        >
          Для организаторов
        </p>
        {serverError && (
          <div className={styles.errorContainer}>
            <figure className={styles.serverErrorFigure} />
            <span className={styles.serverError}>{serverError}</span>
          </div>
        )}
        <form className={styles.modalForm} noValidate onSubmit={handleSignUp}>
          <div className={styles.fieldsetContainer}>
            <Fieldset
              name="username"
              label="Имя"
              placeholder="Ваше имя"
              minLength={2}
              maxLength={50}
              value={values.username}
              errors={errors.username}
              onChange={handleNameChange}
              //onBlur={handleBlur}
            />
            <Fieldset
              name="organization_name"
              label="Организация"
              placeholder="Ваша организация"
              minLength={2}
              maxLength={100}
              value={values.organization_name}
              errors={errors.organization_name}
              onChange={handleOrganizationChange}
              //onBlur={handleBlur}
            />
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
            <Fieldset
              name="confirmPassword"
              type="password"
              label="Повторите пароль"
              placeholder="Введите пароль"
              maxLength={25}
              value={values.confirmPassword}
              errors={errors.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              onPaste={preventInvalidPaste}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <CustomCheckbox
              checked={isPrivacyChecked}
              handleChange={togglePrivacyChecked}
            />
            <span className={styles.checkboxText}>
              Нажимая кнопку «Регистрация», вы соглашаетесь с{' '}
              <Link
                className={styles.policyBtn}
                type="button"
                target="_blank"
                to="/privacy"
              >
                Политикой конфиденциальности.
              </Link>
            </span>
          </div>
          <SubmitButton
            title={isLoading ? 'Регистрация...' : 'Регистрация'}
            disabled={disabledButton}
            onClick={handleSignUp}
          />
          <p className={styles.formSubtext}></p>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
