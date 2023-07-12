import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: target.validationMessage,
    }));
    setIsValid(target.closest('form').checkValidity());
  };

  const handleEmailChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    let validationPattern;
    let error = '';
    if (name === 'email') {
      validationPattern = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!validationPattern.test(value)) {
        error = 'Введите корректный email';
      }
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(target.closest('form').checkValidity());
  };

  const handlePasswordChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    let validationPattern;
    let error = '';
    if (name === 'password') {
      validationPattern =
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/u;
      if (!validationPattern.test(value)) {
        error = target.validationMessage;
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(target.closest('form').checkValidity());
  };

  const handlePriceChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    let validationPattern;
    let error = '';
    if (name === 'price') {
      validationPattern = /^\d{0,6}$/;
      if (!validationPattern.test(value)) {
        error = 'Введите корректное значение';
      }
      // Запрет отрицательных значений
      const numberValue = parseInt(value, 10);
      if (numberValue < 0) {
        error = 'Значение не может быть отрицательным';
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(target.closest('form').checkValidity());
  };

  const handleUrlChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    let error = '';

    if (name === 'url') {
      // Паттерн для валидации URL
      const validationPattern =
        /^(https?:\/\/)?([^\s.]+\.\S{2}|localhost)(\/[^\s]*)?$/;

      if (!validationPattern.test(value)) {
        error = 'Введите корректный URL с полным доменом';
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(target.closest('form').checkValidity());
  };

  const handleDateChange = (date, name) => {
    let error = '';

    if (name === 'date_start' || name === 'date_end') {
      const startDate =
        name === 'date_start' ? date : new Date(values.date_start);
      const endDate = name === 'date_end' ? date : new Date(values.date_end);
      const currentDate = new Date();

      if (startDate && endDate && startDate > endDate) {
        error = 'Дата окончания должна быть позже даты начала';
      }

      if (startDate && startDate < currentDate.setHours(0, 0, 0, 0)) {
        error = 'Выберите дату начала, которая больше или равна текущей дате';
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: date,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(true);
  };

  useEffect(() => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    // const hasOptionalFields = !!values.partners && !!values.url;
    const hasOptionalFields = !!values.partners && !!values.url;
    setDisabledButton(
      !isValid ||
        (hasErrors && !hasOptionalFields) ||
        (values.confirmPassword ? errors.confirmPassword !== '' : false)
    );
  }, [isValid, errors, values]);

  //&& values.partners !== '' && values.url !== ''

  const handleBlur = (event) => {
    const target = event.target;
    const { name } = target;
    if (name === 'partners' || name === 'url') {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };

  const validatePasswordMatch = useCallback(() => {
    if (values.password !== values.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Пароли не совпадают',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
  }, [values.password, values.confirmPassword]);

  useEffect(() => {
    validatePasswordMatch();
  }, [values.confirmPassword]);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    setValues,
    handleChange,
    handleEmailChange,
    handlePasswordChange,
    handleUrlChange,
    handleDateChange,
    handlePriceChange,
    handleBlur,
    errors,
    isValid,
    resetForm,
    disabledButton,
  };
}
