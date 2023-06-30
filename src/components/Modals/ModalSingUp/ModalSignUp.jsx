import styles from './ModalSignUp.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Logo from '../../Logo/Logo';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';

const ModalSignUp = ({ isOpen, handleClose, onSignUp }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const togglePrivacyChecked = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
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

  const postData = {
    name: values.name,
    password: values.password,
    email: values.email,
    organization: values.organization,
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
        <form className={styles.modalForm} noValidate onSubmit={handleSignUp}>
          <div className={styles.fieldsetContainer}>
            <fieldset className={styles.fieldset}>
              <label htmlFor="name" className={styles.label}>
                Имя<span className={styles.spanError}>*</span>
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
              {errors.name && (
                <span className={styles.span}>{errors.name}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label htmlFor="organization" className={styles.label}>
                Организация<span className={styles.spanError}>*</span>{' '}
                <span className={styles.recommendation}>
                  Эти данные Вы изменить не сможете
                </span>
              </label>
              <input
                className={`${styles.input} ${
                  errors.organization ? styles.inputError : ''
                }`}
                id="organization"
                name="organization"
                type="text"
                placeholder="Ваша организация"
                required
                minLength={2}
                maxLength={254}
                value={values.organization || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.organization && (
                <span className={styles.span}>{errors.organization}</span>
              )}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label htmlFor="email" className={styles.label}>
                Почта<span className={styles.spanError}>*</span>
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
            <fieldset className={styles.fieldset}>
              <label
                htmlFor="password"
                type="password"
                className={styles.label}
              >
                Пароль<span className={styles.spanError}>*</span>
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
                Повторите пароль<span className={styles.spanError}>*</span>
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
            title="Регистрация"
            disabled={disabledButton || !isPrivacyChecked}
          />
          <p className={styles.formSubtext}></p>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
