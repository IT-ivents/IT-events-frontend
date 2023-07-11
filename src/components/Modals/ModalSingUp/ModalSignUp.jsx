import styles from './ModalSignUp.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import attention from '../../../images/tooltip_attention.svg';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';
import Tooltip from '../../Tooltip/Tooltip';

const ModalSignUp = ({
  isOpen,
  handleClose,
  onSignUp,
  isLoading,
  loggedIn,
  serverError,
  setServerError,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const {
    values,
    handleChange,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    isValid,
    errors,
    disabledButton,
    resetForm,
  } = useFormWithValidation();

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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

  const postData = {
    name: values.username,
    password: values.password,
    email: values.email,
    organization_name: values.organization_name,
  };
  console.log(postData);

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
            <fieldset className={styles.fieldset}>
              <label htmlFor="name" className={styles.label}>
                Имя <span className={styles.spanError}>*</span>
              </label>
              <input
                className={`${styles.input} ${
                  errors.username ? styles.inputError : ''
                }`}
                id="username"
                name="username"
                type="text"
                placeholder="Ваше имя"
                required
                minLength={2}
                maxLength={50}
                value={values.username || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.username && (
                <span className={styles.span}>{errors.username}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              {isTooltipVisible && <Tooltip onClick={toggleTooltip} />}
              <label htmlFor="organization" className={styles.label}>
                Организация <span className={styles.spanError}>*</span>{' '}
                <img
                  className={styles.recommendation}
                  alt="attention"
                  src={attention}
                  onClick={toggleTooltip}
                />
              </label>
              <input
                className={`${styles.input} ${
                  errors.organization ? styles.inputError : ''
                }`}
                id="organization_name"
                name="organization_name"
                type="text"
                placeholder="Ваша организация"
                required
                minLength={2}
                maxLength={100}
                value={values.organization_name || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.organization_name && (
                <span className={styles.span}>{errors.organization_name}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label htmlFor="email" className={styles.label}>
                Почта <span className={styles.spanError}>*</span>
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
                onChange={handleEmailChange}
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
                  placeholder="Введите пароль"
                  required
                  value={values.password || ''}
                  minLength={6}
                  maxLength={25}
                  onChange={handlePasswordChange}
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
              {errors.password && (
                <span className={styles.span}>{errors.password}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label htmlFor="password_repeat" className={styles.label}>
                Повторите пароль <span className={styles.spanError}>*</span>
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
            title={isLoading ? 'Подождите...' : 'Регистрация'}
            disabled={disabledButton || !isPrivacyChecked}
            onClick={handleSignUp}
          />
          <p className={styles.formSubtext}></p>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
