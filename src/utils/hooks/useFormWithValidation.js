import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const inputTypeNumberValidation = (e) => {
    return (e.target.value =
      Math.max(0, parseInt(e.target.value.trim().slice(0, 8))) || '');
  };

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
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
      if (!validationPattern.test(value)) {
        error = 'Введите корректный пароль';
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

  useEffect(() => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    const hasOptionalFields = !!values.partners || !!values.url;
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
    handleBlur,
    errors,
    isValid,
    resetForm,
    disabledButton,
    inputTypeNumberValidation,
  };
}
