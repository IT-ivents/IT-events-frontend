import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: target.validationMessage,
    }));
    setIsValid(target.closest('form').checkValidity());
  };

  useEffect(() => {
    setDisabledButton(
      !isValid ||
        (Object.keys(errors).some((key) => errors[key]) &&
          Object.values(values).every((value) => value === '')) ||
        errors.confirmPassword !== ''
    );
  }, [errors, values]);

  const handleBlur = (event) => {
    const target = event.target;
    const { name } = target;
    setErrors({ ...errors, [name]: target.validationMessage });
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
    handleBlur,
    errors,
    isValid,
    resetForm,
    disabledButton,
  };
}
