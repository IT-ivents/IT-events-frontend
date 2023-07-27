import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  // Функция для обработки ввода в поле
  const sanitizeInput = (name, value) => {
    // Регулярное выражение для проверки наличия эмодзи и двух пробелов подряд
    const emojiAndDoubleSpaceRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F0}\u{23F3}\u{24C2}\u{200D}\u{FE0F}\u{20E3}\u{FE0F}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}\u{E01F0}-\u{E0FFF}]/gu;
    const doubleSpaceRegex = /\s{2,}/g;

    // Удалить пробел в начале строки
    if (value.startsWith(' ')) {
      value = value.trimStart();
    }

    // Удалить двойные пробелы подряд
    value = value.replace(doubleSpaceRegex, ' ');

    // Удалить эмодзи
    value = value.replace(emojiAndDoubleSpaceRegex, '');

    return value;
  };

  const preventInvalidPaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;

    if (!clipboardData) {
      // Если clipboardData не существует, то вставка не может быть проверена, разрешаем вставку
      return false;
    }

    const pastedText = clipboardData.getData('text/plain');

    // Регулярное выражение для проверки допустимых символов
    const validCharactersRegex =
      /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\S]+$/;

    if (!validCharactersRegex.test(pastedText)) {
      event.preventDefault();
      return true; // Возвращаем true, чтобы обозначить, что вставка была предотвращена
    }
    return false; // Возвращаем false, если вставка была успешной
  };

  const handleBlur = (event) => {
    const target = event.target;
    const { name } = target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // const handleChange = (event) => {
  //   const target = event.target;
  //   const { name, value } = target;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: target.validationMessage,
  //   }));
  //   setIsValid(target.closest('form').checkValidity());
  // };

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    // Вызов функции для очистки входных данных
    const sanitizedValue = sanitizeInput(name, value);

    // Обновить значение поля после очистки
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue,
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
    const sanitizedValue = sanitizeInput(name, value);
    let validationPattern;
    let error = '';
    if (name === 'email') {
      validationPattern =
        /^[a-zA-Z0-9_%+-]+(\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      if (!validationPattern.test(sanitizedValue)) {
        error = 'Введите корректный email';
      }
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue,
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

    const sanitizedValue = sanitizeInput(name, value);

    let validationPattern;
    let error = '';
    if (name === 'password') {
      validationPattern =
        /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/u;
      if (!validationPattern.test(sanitizedValue)) {
        error = target.validationMessage;
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue,
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
      validationPattern = /^\d{0,8}$/;
      if (!validationPattern.test(value)) {
        error = 'Введите корректное значение';
      }
      // Запрет отрицательных значений
      const numberValue = parseInt(value, 10);
      if (numberValue < 0) {
        error = 'Значение не может быть отрицательным';
      } else {
        error = '';
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
      } else {
        error = '';
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

  const handlePartnersChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    let error = '';

    // Паттерн для валидации partners
    const validationPattern = /^.{0,1000}$/;

    if (!validationPattern.test(value)) {
      error = 'Введите от 0 до 1000 символов';
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

  const handleOrganizationChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    const sanitizedValue = sanitizeInput(name, value);
    let error = '';

    const validationPattern =
      /^[a-zA-Zа-яА-Я0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,100}$/;

    if (!validationPattern.test(sanitizedValue)) {
      error =
        'Введите корректные данные. Допустимая длина поля от 2 до 100 символов';
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setIsValid(target.closest('form').checkValidity());
  };

  const handleNameChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    const sanitizedValue = sanitizeInput(name, value);
    let error = '';
    // Паттерн для валидации имени (допускаются русские, английские буквы, цифры и спецсимволы)
    const validationPattern =
      /^[a-zA-Zа-яА-Я0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,50}$/;
    // Проверка на наличие хотя бы одного нецифрового символа
    const hasNonNumericCharacter = /\D/.test(sanitizedValue);
    // Проверка на строку, состоящую только из цифр
    if (!validationPattern.test(sanitizedValue) || !hasNonNumericCharacter) {
      error =
        'Введите корректные данные. Допустимая длина поля от 2 до 50 символов.';
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue,
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
    //const hasOptionalFields = !!values.partners || !!values.url;
    setDisabledButton(
      !isValid ||
        hasErrors ||
        (values.confirmPassword ? errors.confirmPassword !== '' : false)
      //!hasOptionalFields
    );
  }, [isValid, errors, values]);

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
  }, [values.confirmPassword, values.password]);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    setValues,
    handleBlur,
    handleChange,
    handleNameChange,
    handleOrganizationChange,
    handleEmailChange,
    handlePasswordChange,
    handleUrlChange,
    handleDateChange,
    handlePriceChange,
    handlePartnersChange,
    preventInvalidPaste,
    errors,
    isValid,
    resetForm,
    disabledButton,
  };
}
