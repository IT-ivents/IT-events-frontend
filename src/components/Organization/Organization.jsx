import { useEffect, useState, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styles from './Organization.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PageTitle from '../PageTitle/PageTitle';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { apiEvents } from '../../utils/api';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import { useLocation, useNavigate } from 'react-router-dom';

registerLocale('ru', ru);

const Organization = ({ selectedEvent }) => {
  const {
    values,
    setValues,
    handleChange,
    handleDateChange,
    handlePriceChange,
    handlePartnersChange,
    handleUrlChange,
    handleBlur,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  const [tags, setTags] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsCount, setSelectedTagsCount] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [imageSmall, setImageSmall] = useState('');
  const [newCardData, setNewCardData] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const currentDate = new Date();

  const location = useLocation();
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState({
    tags: false,
    topic: false,
    format: false,
  });

  const formatDisabled =
    selectedFormat.length === 1 && selectedFormat[0].value === 'online';

  const disabledButton =
    !isValid ||
    selectedFormat.length === 0 ||
    selectedTopics.length === 0 ||
    selectedTags.length === 0 ||
    !values.date_start ||
    !values.date_end ||
    !values.time_start ||
    !values.time_end ||
    console.log(!values.image);

  const dateStart =
    values?.date_start
      ?.toLocaleDateString('ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('.')
      .reverse()
      .join('-') || null;
  const timeStart = values.time_start;
  const dateEnd =
    values?.date_end
      ?.toLocaleDateString('ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('.')
      .reverse()
      .join('-') || null;
  const timeEnd = values.time_end;
  // Конвертация дат мероприятия в нужный формат
  const correctDateStartFormat = `${dateStart}T${timeStart}Z`;
  const correctDateEndFormat = `${dateEnd}T${timeEnd}Z`;

  const width = {
    width: '40%',
  };

  // ЗАПОЛНИТЬ ФОРМУ ЗНАЧЕНИЯМИ ИЗ SELECTED EVENT
  useEffect(() => {
    if (selectedEvent) {
      const currentTags = selectedEvent.tags?.map((tag) => ({
        value: tag.id,
        label: tag.name,
        slug: tag.slug,
      }));
      setSelectedTags(currentTags);
      const currentFormats = selectedEvent.format?.map((item) => ({
        id: item.id,
        value: item.slug,
        label: item.name,
      }));
      setSelectedFormat(currentFormats);
      const currentTopics = selectedEvent.topic?.map((item) => ({
        id: item.id,
        value: item.slug,
        label: item.name,
      }));
      setSelectedTopics(currentTopics);
      setValues((prev) => ({
        ...prev,
        title: selectedEvent.title || '',
        description: selectedEvent.description || '',
        program: selectedEvent.program || '',
        city: selectedEvent.city || '',
        url: selectedEvent.url || '',
        address: selectedEvent.address,
        partners: selectedEvent.partners || '',
        price: selectedEvent.price,
        image: selectedEvent.image || '',
        date_start: new Date(selectedEvent.date_start),
        time_start: selectedEvent.date_start.substring(11, 19),
        date_end: new Date(selectedEvent.date_end),
        time_end: selectedEvent.date_end.substring(11, 19),
      }));
    }
  }, [selectedEvent]);

  // ДАННЫЕ ДЛЯ ОТПРАВКИ НА СЕРВЕР
  useEffect(() => {
    const selectedTagsSlugs = selectedTags.map((tag) => tag.value);
    const selectedTopcsSlugs = selectedTopics.map((topic) => topic.id);
    const selectedFormatSlugs = selectedFormat.map((format) => format.id);
    setNewCardData((prevData) => ({
      ...prevData,
      tags: selectedTagsSlugs || [],
      topic: selectedTopcsSlugs || [],
      format: selectedFormatSlugs || [],
      title: values.title,
      description: values.description,
      program: values.program,
      partners: values.partners || '',
      price: values.price,
      city: !formatDisabled ? values.city : '',
      address: !formatDisabled ? values.address : '',
      date_start: correctDateStartFormat,
      date_end: correctDateEndFormat,
      url: values.url || '',
      //organization: currentUser.id
    }));
  }, [selectedTags, selectedTopics, selectedFormat, values]);

  // ОТЛАДКА - смотреть что готовится к отправке на сервер
  useEffect(() => {
    console.log('newCardData updated:', newCardData);
  }, [newCardData]);

  const handleTopicChange = (selectedOptions) => {
    setSelectedTopics(selectedOptions);
  };

  const handleTagChange = (selectedOptions) => {
    if (selectedOptions.length <= 25) {
      setSelectedTags(selectedOptions);
      setSelectedTagsCount(selectedOptions.length);
    }
  };

  const handleFormatChange = (selectedOptions) => {
    setSelectedFormat(selectedOptions);
  };

  // Для предпросмотра
  const eventDetails = {
    title: values.title,
    city: values.city || 'Invalid City',
    image: imageSmall || selectedEvent?.image,
    price: values.price || 0,
    date_start: values.date_start || selectedEvent?.date_start,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file?.size > 1048576) {
      setImageErrorMessage('Файл больше допустимого размера');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;

      if (event.target.name === 'image_large') {
        setNewCardData((prevData) => ({
          ...prevData,
          image: base64data,
        }));
      } else if (event.target.name === 'image_small') {
        setNewCardData((prevData) => ({
          ...prevData,
          image_small: base64data,
        }));
        setImageSmall(base64data);
      }
    };

    reader.readAsDataURL(file);
  };

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    slug: tag.slug,
  }));

  const formatOptions = [
    { id: 1, value: 'online', label: 'Online' },
    { id: 2, value: 'offline', label: 'Offline' },
  ];

  const topicOptions = [
    { id: 14, value: 'frontend', label: 'Frontend' },
    { id: 15, value: 'backend', label: 'Backend' },
    { id: 11, value: 'software-testing', label: 'Software Testing' },
    { id: 17, value: 'ux/ui', label: 'UX/UI' },
    { id: 6, value: 'big-data-and-analytics', label: 'Data analytics' },
    { id: 30, value: 'hr', label: 'HR' },
    { id: 12, value: 'management', label: 'Management' },
    { id: 10, value: 'devops', label: 'Devops' },
    {
      id: 5,
      value: 'artificial-intelligence-and-machine-learning',
      label: 'AI & ML',
    },
    { id: 34, value: 'information_security', label: 'Кибербезопасность' },
  ];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await apiEvents.getTags();
        setTags(response.data);
      } catch (error) {
        console.log('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const handleSelectFocus = (section) => {
    setIsFocused((prevState) => ({ ...prevState, [section]: true }));
  };

  const handleSelectBlur = (section) => {
    setIsFocused((prevState) => ({ ...prevState, [section]: false }));
  };

  const handlePostNewEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await apiEvents.postNewEvent(newCardData);
      console.log('Новое событие успешно создано', response.data);
      navigate('/account/events');
    } catch (error) {
      console.error('Ошибка при создании события', error);
    }
  };

  const handleEditEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await apiEvents.editEvent(selectedEvent.id, newCardData);
      console.log('Событие успешно изменено', response.data);
      navigate('/account/events');
    } catch (error) {
      console.error('Ошибка при редактировании события', error);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '20px',
      border: `2px solid ${
        (selectedTags.length > 0 && state.selectProps.name === 'tags') ||
        (selectedTopics.length > 0 && state.selectProps.name === 'topic') ||
        (selectedFormat.length > 0 && state.selectProps.name === 'format')
          ? '#27ae60'
          : state.isFocused
          ? '#674EAE'
          : 'rgba(0, 0, 0, 0.1)'
      }`,
      boxShadow: 'none',
      borderColor: 'transparent',
      padding: '3.5px 0 3.5px 6px',
      backgroundColor: `${
        state.isFocused ? '#fefefe' : 'rgba(255, 255, 255, 1);'
      }`,
      width: '100%',
      '&:hover': {
        borderColor: state.isFocused ? '#674EAE' : '',
      },
    }),
  };

  const animatedComponents = makeAnimated();

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <PageTitle
          title={selectedEvent ? 'Изменить событие' : 'Добавить событие'}
        />

        <div className={styles.rowContainer}>
          <div className={styles.columnContainer}>
            <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
              <label htmlFor="title" className={styles.label}>
                Название мероприятия<span className={styles.spanError}>*</span>{' '}
              </label>
              <input
                className={`${styles.input} ${
                  errors.title
                    ? styles.inputError
                    : values.title
                    ? styles.inputSuccess
                    : ''
                }`}
                type="text"
                id="title"
                name="title"
                value={values.title || ''}
                onChange={handleChange}
                placeholder="Ваше название"
                required
                minLength={2}
                maxLength={50}
              />
              <div className={styles.spanContainer}>
                <span className={styles.spanError}>{errors.title}</span>
                <span className={styles.recommendation}>
                  {values?.title?.length || 0}/
                  <span className={styles.spanError}>50</span>
                </span>
              </div>
            </fieldset>
            <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
              <label htmlFor="price" className={styles.label}>
                Ссылка на сайт
                <span className={styles.recommendation}> </span>
              </label>
              <input
                className={`${styles.input} ${
                  errors?.url
                    ? styles.inputError
                    : values?.url
                    ? styles.inputSuccess
                    : ''
                }`}
                type="url"
                id="url"
                name="url"
                value={values?.url || ''}
                onChange={handleUrlChange}
                placeholder="Ваша ссылка"
                minLength={4}
                maxLength={200}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <div className={styles.spanContainer}>
                <span className={styles.spanError}>{errors?.url}</span>
                <span className={styles.recommendation}>
                  {values?.url?.length || 0}/
                  <span className={styles.spanError}>200</span>
                </span>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <label htmlFor="description" className={styles.label}>
                Описание<span className={styles.spanError}>*</span>{' '}
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description || ''}
                onChange={handleChange}
                rows="6"
                required
                minLength={10}
                maxLength={1000}
                placeholder="Расскажите о событии подробнее"
                className={`${styles.textArea} ${
                  errors.description
                    ? styles.textAreaError
                    : values.description
                    ? styles.textAreaSuccess
                    : ''
                }`}
              />
              <div className={styles.spanContainer}>
                <span className={styles.spanError}>{errors.description}</span>
                <span className={styles.recommendation}>
                  {values?.description?.length || 0}/
                  <span className={styles.spanError}>1000</span>
                </span>
              </div>
            </fieldset>
          </div>

          <div className={styles.columnContainer}>
            <div className={styles.previewContainer}>
              <VerticalEventCard
                event={eventDetails}
                onLikeClick={() => {}}
                onCardClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="topic" className={styles.label}>
              Направление<span className={styles.spanError}>*</span>
            </label>
            <Select
              isMulti
              name="topic"
              options={topicOptions}
              onChange={handleTopicChange}
              components={animatedComponents}
              value={selectedTopics}
              styles={customSelectStyles}
              onFocus={() => handleSelectFocus('topic')}
              onBlur={() => handleSelectBlur('topic')}
              placeholder="Выберите тему"
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="format" className={styles.label}>
              Формат<span className={styles.spanError}>*</span>
            </label>
            <Select
              isMulti
              name="format"
              options={formatOptions}
              onChange={handleFormatChange}
              components={animatedComponents}
              value={selectedFormat}
              styles={customSelectStyles}
              required
              onFocus={() => handleSelectFocus('format')}
              onBlur={() => handleSelectBlur('format')}
              placeholder="Выберите формат"
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="tags" className={styles.label}>
              Теги<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>Максимум 25 тегов</span>
            </label>
            <Select
              isMulti
              name="tags"
              options={tagOptions}
              onChange={handleTagChange}
              components={animatedComponents}
              value={selectedTags}
              styles={customSelectStyles}
              required
              onFocus={() => handleSelectFocus('tags')}
              onBlur={() => handleSelectBlur('tags')}
              placeholder="Выберите теги"
            />
          </fieldset>
        </div>
        <fieldset className={styles.fieldset}>
          <label htmlFor="program" className={styles.label}>
            Программа<span className={styles.spanError}>*</span>{' '}
          </label>
          <textarea
            id="program"
            name="program"
            value={values.program || ''}
            required
            minLength={10}
            maxLength={3000}
            onChange={handleChange}
            rows="4"
            placeholder="Что будет в вашей программе?"
            className={`${styles.textArea} ${
              errors.program
                ? styles.textAreaError
                : values.program
                ? styles.textAreaSuccess
                : ''
            }`}
          ></textarea>
          <div className={styles.spanContainer}>
            <span className={styles.spanError}>{errors.program}</span>
            <span className={styles.recommendation}>
              {values?.program?.length || 0}/
              <span className={styles.spanError}>3000</span>
            </span>
          </div>
        </fieldset>

        <div className={styles.rowContainer}>
          <div className={styles.columnContainer}>
            <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
              <label htmlFor="start" className={styles.label}>
                Дата и время начала<span className={styles.spanError}>*</span>{' '}
              </label>
              <ReactDatePicker
                id="date_start"
                name="date_start"
                selected={values.date_start || ''}
                onChange={(date) => handleDateChange(date, 'date_start')}
                className={`${styles.input} ${
                  errors.date_start
                    ? styles.inputError
                    : values.date_start
                    ? styles.inputSuccess
                    : ''
                }`}
                dateFormat="yyyy-MM-dd"
                placeholderText="Выберите дату"
                autoComplete="off"
                onKeyDown={(e) => e.preventDefault()} // Запрещаем нажатие клавиш на поле ввода
                locale="ru" // Устанавливаем русскую локализацию
                minDate={currentDate}
                showMonthDropdown // Показываем выпадающий список с месяцами
                //showYearDropdown // Показываем выпадающий список с годами
                dropdownMode="select" // Режим выбора в выпадающих списках
                required
              />
              <span className={styles.spanError}>{errors?.date_start}</span>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <input
                type="time"
                id="time_start"
                name="time_start"
                required
                value={values.time_start || ''}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.time_start
                    ? styles.inputError
                    : values.time_start
                    ? styles.inputSuccess
                    : ''
                }`}
              />
              <span className={styles.spanError}>{errors.time_start}</span>
            </fieldset>
          </div>
          <div className={styles.columnContainer}>
            <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
              <label htmlFor="finish" className={styles.label}>
                Дата и время окончания
                <span className={styles.spanError}>*</span>{' '}
              </label>
              <ReactDatePicker
                id="date_end"
                name="date_end"
                selected={values.date_end || ''}
                onChange={(date) => handleDateChange(date, 'date_end')}
                className={`${styles.input} ${
                  errors.date_end
                    ? styles.inputError
                    : values.date_end
                    ? styles.inputSuccess
                    : ''
                }`}
                dateFormat="yyyy-MM-dd"
                placeholderText="Выберите дату"
                onKeyDown={(e) => e.preventDefault()} // Запрещаем нажатие клавиш на поле ввода
                locale="ru" // Устанавливаем русскую локализацию
                showMonthDropdown // Показываем выпадающий список с месяцами
                minDate={currentDate}
                //showYearDropdown // Показываем выпадающий список с годами
                dropdownMode="select" // Режим выбора в выпадающих списках
                autoComplete="off"
                required
              />
              <span className={styles.spanError}>{errors?.date_end}</span>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <input
                type="time"
                id="time_end"
                name="time_end"
                required
                value={values.time_end || ''}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.time_end
                    ? styles.inputError
                    : values.time_end
                    ? styles.inputSuccess
                    : ''
                }`}
              />
              <span className={styles.spanError}>{errors.time_end}</span>
            </fieldset>
          </div>
        </div>
        <div className={styles.rowContainer}>
          <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
            <label htmlFor="city" className={styles.label}>
              Город<span className={styles.spanError}>*</span>{' '}
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={!formatDisabled ? values.city || '' : ''}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.city
                  ? styles.inputError
                  : values.city
                  ? styles.inputSuccess
                  : ''
              }`}
              placeholder="Укажите город проведения"
              required
              disabled={formatDisabled}
              autoComplete="off"
              minLength={2}
              maxLength={25}
            />
            <div className={styles.spanContainer}>
              <span className={styles.spanError}>{errors.city}</span>
              <span className={styles.recommendation}>
                {!formatDisabled ? values?.city?.length || 0 : 0}/
                <span className={styles.spanError}>25</span>
              </span>
            </div>
          </fieldset>

          <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
            <label htmlFor="address" className={styles.label}>
              Адрес<span className={styles.spanError}>*</span>{' '}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={!formatDisabled ? values.address || '' : ''}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.address
                  ? styles.inputError
                  : values.address
                  ? styles.inputSuccess
                  : ''
              }`}
              placeholder="Укажите адрес"
              required
              disabled={formatDisabled}
              autoComplete="off"
              minLength={2}
              maxLength={130}
            />
            <div className={styles.spanContainer}>
              <span className={styles.spanError}>{errors.address}</span>
              <span className={styles.recommendation}>
                {!formatDisabled ? values?.address?.length || 0 : 0}/
                <span className={styles.spanError}>130</span>
              </span>
            </div>
          </fieldset>
        </div>

        <div className={styles.rowContainer}>
          <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
            <label htmlFor="partners" className={styles.label}>
              Партнеры{' '}
            </label>
            <input
              className={`${styles.input} ${
                errors?.partners
                  ? styles.inputError
                  : values?.partners
                  ? styles.inputSuccess
                  : ''
              }`}
              type="text"
              id="partners"
              name="partners"
              value={values?.partners || ''}
              onChange={handlePartnersChange}
              onBlur={handleBlur}
              placeholder="Есть партнеры?"
              autoComplete="off"
              minLength={0}
              maxLength={1000}
            />
            <div className={styles.spanContainer}>
              <span className={styles.spanError}>{errors?.partners}</span>
              <span className={styles.recommendation}>
                {values?.partners?.length || 0}/
                <span className={styles.spanError}>1000</span>
              </span>
            </div>
          </fieldset>
          <fieldset className={`${styles.fieldset} ${styles.regularHight}`}>
            <label htmlFor="price" className={styles.label}>
              Цена<span className={styles.spanError}>*</span>{' '}
            </label>
            <input
              className={`${styles.input} ${
                errors.price
                  ? styles.inputError
                  : values.price
                  ? styles.inputSuccess
                  : ''
              }`}
              type="number"
              id="price"
              name="price"
              value={values.price || ''}
              onChange={handlePriceChange}
              required
              autoComplete="off"
              minLength={2}
              maxLength={8}
              placeholder="Укажите цену"
            />
            <span className={styles.spanError}>{errors.price}</span>
          </fieldset>
        </div>

        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="image" className={styles.label}>
              Добавьте основной баннер
              <span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Рекомендуемый размер: 608х390, допустимые форматы .png, .jpeg,
                .bmp, до 1 МБ включительно.
              </span>{' '}
              <span className={styles.recommendation}>
                Перед тем как вставить изображение, обязательно убедитесь, что
                вы не нарушаете ничьих авторских прав.
              </span>
            </label>

            <input
              type="file"
              id="image_large"
              name="image_large"
              required
              className={`${styles.input} ${
                imageErrorMessage ? styles.inputError : ''
              }`}
              onChange={handleFileChange}
            />

            <span className={styles.spanError}>{imageErrorMessage}</span>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="image" className={styles.label}>
              Добавьте обложку<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Рекомендуемый размер: 296x240, допустимые форматы .png, .jpeg,
                .bmp, до 1 МБ включительно.
              </span>{' '}
              <span className={styles.recommendation}>
                Изображение попадет в шапку события и будет отображаться в ленте
                мероприятий.
              </span>
            </label>
            <input
              type="file"
              id="image_small"
              name="image_small"
              required
              onChange={handleFileChange}
              className={`${styles.input} ${
                imageErrorMessage ? styles.inputError : ''
              }`}
            />
            <span className={styles.spanError}>{imageErrorMessage}</span>
          </fieldset>
        </div>

        <div className={styles.bottomContainer}>
          <p className={styles.message}>
            <span className={styles.span}>Внимание!</span> Проверьте
            корректность заполненных данных. Карточка с Вашим мероприятием
            появится на сайте после проверки модератором.{' '}
          </p>
          {location.pathname === '/organization' ? (
            <SubmitButton
              title="Отправить"
              type="submit"
              disabled={disabledButton}
              style={width}
              onClick={handlePostNewEvent}
            />
          ) : (
            <SubmitButton
              title="Изменить"
              type="submit"
              disabled={disabledButton}
              style={width}
              onClick={handleEditEvent}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Organization;
