import { useState, useCallback, useEffect } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Регулярные выражения для валидации
  const emailRegex =
    /^[a-zA-Z0-9_%+-]+(\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/u;
  const urlRegex = /^(https?:\/\/)?([^\s.]+\.\S{2}|localhost)(\/[^\s]*)?$/;
  const nameRegex =
    /^(?![0-9]+$)[a-zA-Zа-яА-ЯёЁ0-9]+(?:[-\s](?![ -])[a-zA-Zа-яА-ЯёЁ0-9]+)*$/;
  const organizationRegex =
    /^(?![0-9]*$)[a-zA-Zа-яА-Я0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,100}$/;
  const priceRegex = /^\d{0,8}$/;
  const partnersRegex = /^.{0,1000}$/;
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F0}\u{23F3}\u{24C2}\u{200D}\u{FE0F}\u{20E3}\u{FE0F}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}\u{E01F0}-\u{E0FFF}]/gu;
  const doubleSpaceRegex = /\s{2,}/g;

  // Функция для очистки значения поля от эмодзи и двойных пробелов
  const sanitizeFieldValue = (value) => {
    // Удалить пробел в начале строки
    if (value.startsWith(' ')) {
      value = value.trimStart();
    }
    // Удалить двойные пробелы подряд
    value = value.replace(doubleSpaceRegex, ' ');
    // Удалить эмодзи
    value = value.replace(emojiRegex, '');
    return value;
  };

  // Функция запрещающая вставку в поля
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

  const updateFieldValue = (name, value, validationRegex, errorMessage) => {
    const sanitizedValue = sanitizeFieldValue(value);

    setValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: sanitizedValue,
      };
      // Проверяем, нужно ли применять валидацию
      if (validationRegex) {
        // Проверяем значение по регулярному выражению
        if (!validationRegex.test(sanitizedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
          }));
        }
      } else {
        // Если validationRegex не предоставлен, считаем поле валидным, чтобы не учитывать его в проверке наличия ошибок
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
      // Проверяем все ли значения ошибок пустые, исключая необязательные поля
      const requiredFieldsErrors = Object.entries(errors).filter(
        ([fieldName]) => fieldName !== 'partners' && fieldName !== 'url'
      );
      const allErrorsEmpty = requiredFieldsErrors.every(
        ([, error]) => error === ''
      );

      // Проверяем все ли значения полей не пустые, исключая необязательные поля
      const requiredFieldsValues = Object.entries(updatedValues).filter(
        ([fieldName]) => fieldName !== 'partners' && fieldName !== 'url'
      );
      const allValuesFilled = requiredFieldsValues.every(
        ([, val]) => val !== ''
      );

      // Обновляем состояние валидности на основе обоих условий
      setIsValid(allErrorsEmpty && allValuesFilled);

      return updatedValues;
    });
  };

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    // Вызов функции для очистки входных данных
    const sanitizedValue = sanitizeFieldValue(value);

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

  // Обработчик для email
  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(name, value, emailRegex, 'Введите корректный email');
  };

  // Обработчик для пароля
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(
      name,
      value,
      passwordRegex,
      event.target.validationMessage
    );
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(name, value, priceRegex, 'Введите корректное значение');
  };

  const handleUrlChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(
      name,
      value,
      urlRegex,
      'Введите корректный URL с полным доменом'
    );
  };

  const handlePartnersChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(name, value, null, '');
  };

  // Обработчик для организации
  const handleOrganizationChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(
      name,
      value,
      organizationRegex,
      'Введите корректные данные. Допустимая длина поля от 2 до 100 символов.'
    );
  };

  // Обработчик для имени
  const handleNameChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(
      name,
      value,
      nameRegex,
      'Введите корректные данные. Допустимая длина поля от 2 до 50 символов.'
    );
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

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    setValues,
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
    validatePasswordMatch,
    errors,
    isValid,
    resetForm,
  };
}
