import { useEffect, useState } from 'react';
import styles from './Organisation.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PageTitle from '../PageTitle/PageTitle';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { apiEvents } from '../../utils/api';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';

const Organisation = () => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    disabledButton,
    resetForm,
  } = useFormWithValidation();
  console.log(values);

  const [tags, setTags] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsCount, setSelectedTagsCount] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [smallImage, setSmallImage] = useState('');
  const [isFocused, setIsFocused] = useState({
    tags: false,
    topic: false,
    format: false,
  });

  const dateStart = values.date_start;
  const timeStart = values.time_start;
  const dateEnd = values.date_end;
  const timeEnd = values.time_end;
  // Конвертация дат мероприятия в нужный формат
  const correctDateStartFormat = dateStart + 'T' + timeStart + ':00Z';
  const correctDateEndFormat = dateEnd + 'T' + timeEnd + ':00Z';

  const dataForServer = {
    title: values.title,
    description: values.description,
    program: values.program,
    partners: values.partners,
    price: values.price,
    city: values.city,
    address: values.address,
    date_start: correctDateStartFormat,
    date_end: correctDateEndFormat,
    url: values.url || '',
  };
  console.log(dataForServer);

  // Для предпросмотра
  const eventDetails = {
    title: values.title,
    city: { name: values.city },
    image: values.preview,
    price: values.price || 0,
    date_start: values.date_start,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSmallImage(file);
    //console.log(file);
  };

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

  // const handleTopicChange = (event) => {
  //   const selectedOptions = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   console.log(selectedOptions);
  //   setSelectedTopics((prevSelectedTopics) => [
  //     ...prevSelectedTopics,
  //     ...selectedOptions,
  //   ]);
  // };
  // console.log(selectedTopics);

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const formatOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
  ];

  const topicOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'ux/ui', label: 'UX/UI' },
    { value: 'big-data-and-analytics', label: 'Data analytics' },
    { value: 'hr', label: 'HR' },
    { value: 'management', label: 'Management' },
    { value: 'devops', label: 'Devops' },
    { value: 'artificial-intelligence-and-machine-learning', label: 'AI & ML' },
    { value: 'information_security', label: 'Кибербезопасность' },
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

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '8px',
      border: `2px solid ${state.isFocused ? '#674eae' : 'rgba(0, 0, 0, 0.4)'}`,
      boxShadow: 'none',
      borderColor: 'transparent',
      padding: '3.5px 0 3.5px 6px',
      backgroundColor: `${state.isFocused ? '#fefefe' : 'rgba(0, 0, 0, 0.03)'}`,
      width: '100%',
      '&:hover': {
        borderColor: state.isFocused ? '#674eae' : 'rgba(0, 0, 0, 0.4)',
      },
      ...((selectedTags.length > 0 ||
        selectedTopics.length > 0 ||
        selectedFormat.length > 0) && {
        border: '2px solid #789674',
      }),
    }),
  };

  const animatedComponents = makeAnimated();

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <PageTitle title="Добавить событие" />
        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="title" className={styles.label}>
              Название мероприятия<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Максимум 50 символов
              </span>
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
            <span className={styles.spanError}>{errors.title}</span>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="price" className={styles.label}>
              Ссылка на сайт
            </label>
            <input
              className={`${styles.input} ${
                errors.url
                  ? styles.inputError
                  : values.url
                  ? styles.inputSuccess
                  : ''
              }`}
              type="url"
              id="url"
              name="url"
              value={values.url || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ваша ссылка"
              minLength={4}
              maxLength={250}
              autoComplete="off"
            />
            <span className={styles.spanError}>{errors.url}</span>
          </fieldset>
        </div>

        <fieldset className={styles.fieldset}>
          <label htmlFor="description" className={styles.label}>
            Описание<span className={styles.spanError}>*</span>{' '}
            <span className={styles.recommendation}>
              Максимум 1000 символов
            </span>
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
          <span className={styles.spanError}>{errors.description}</span>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="program" className={styles.label}>
            Программа<span className={styles.spanError}>*</span>{' '}
            <span className={styles.recommendation}>
              Максимум 3000 символов
            </span>
          </label>
          <textarea
            id="program"
            name="program"
            value={values.program || ''}
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
        </fieldset>

        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="tags" className={styles.label}>
              Направление<span className={styles.spanError}>*</span>{' '}
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
              onFocus={() => handleSelectFocus('tags')}
              onBlur={() => handleSelectBlur('tags')}
              placeholder="Выберите направление"
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="topic" className={styles.label}>
              Тема<span className={styles.spanError}>*</span>
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
              onFocus={() => handleSelectFocus('format')}
              onBlur={() => handleSelectBlur('format')}
              placeholder="Выберите формат"
            />
          </fieldset>
        </div>

        <div className={styles.rowContainer}>
          <div className={styles.columnContainer}>
            <fieldset className={styles.fieldset}>
              <label htmlFor="start" className={styles.label}>
                Дата и время начала<span className={styles.spanError}>*</span>{' '}
              </label>
              <input
                type="date"
                id="date_start"
                name="date_start"
                required
                value={values.date_start}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.date_start
                    ? styles.inputError
                    : values.date_start
                    ? styles.inputSuccess
                    : ''
                }`}
              />
              <span className={styles.spanError}>{errors.date_start}</span>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <input
                type="time"
                id="time_start"
                name="time_start"
                required
                value={values.time_start}
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
            <fieldset className={styles.fieldset}>
              <label htmlFor="finish" className={styles.label}>
                Дата и время окончания
                <span className={styles.spanError}>*</span>{' '}
              </label>
              <input
                type="date"
                id="date_end"
                name="date_end"
                required
                value={values.date_end}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.date_end
                    ? styles.inputError
                    : values.date_end
                    ? styles.inputSuccess
                    : ''
                }`}
              />
              <span className={styles.spanError}>{errors.date_end}</span>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <input
                type="time"
                id="time_end"
                name="time_end"
                required
                value={values.time_end}
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
          <fieldset className={styles.fieldset}>
            <label htmlFor="city" className={styles.label}>
              Город<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Максимум 25 символов
              </span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={values.city || ''}
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
              minLength={2}
              maxLength={25}
            />
            <span className={styles.spanError}>{errors.city}</span>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="address" className={styles.label}>
              Адрес<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Максимум 70 символов
              </span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address || ''}
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
              maxLength={200}
            />
            <span className={styles.spanError}>{errors.address}</span>
          </fieldset>
        </div>

        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="partners" className={styles.label}>
              Партнеры{' '}
              <span className={styles.recommendation}>
                Максимум 200 символов
              </span>
            </label>
            <input
              className={`${styles.input} ${
                errors.partners
                  ? styles.inputError
                  : values.partners
                  ? styles.inputSuccess
                  : ''
              }`}
              type="text"
              id="partners"
              name="partners"
              value={values.partners || ''}
              onChange={handleChange}
              placeholder="Есть партнеры?"
              required
              maxLength={200}
            />
            <span className={styles.spanError}>{errors.partners}</span>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="price" className={styles.label}>
              Цена<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>Максимум 7 символов</span>
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
              onChange={handleChange}
              required
              minLength={1}
              maxLength={7}
              placeholder="Укажите цену"
            />
            <span className={styles.spanError}>{errors.price}</span>
          </fieldset>
        </div>

        <div className={styles.rowContainer}>
          <fieldset className={styles.fieldset}>
            <label htmlFor="image" className={styles.label}>
              Добавьте баннер<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Рекомендуемый размер: 608х380, допустимые форматы .png, .jpeg,
                .bmp, до 1 МБ включительно
              </span>
            </label>
            <input
              type="file"
              id="image_large"
              name="image_large"
              className={styles.input}
              onChange={handleFileChange}
              value={values.image_large}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="image" className={styles.label}>
              Добавьте баннер<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Рекомендуемый размер: 296x240, допустимые форматы .png, .jpeg,
                .bmp, до 1 МБ включительно
              </span>
            </label>
            <input
              type="file"
              id="src"
              name="src"
              value={values.src}
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
        </div>

        <p className={styles.message}>
          <span className={styles.span}>Внимание!</span> Проверьте корректность
          заполненных данных. Карточка с Вашим мероприятием появится на сайте
          после проверки модератором.{' '}
        </p>
        <SubmitButton title="Отправить" />
      </form>
      <div className={styles.previewContainer}>
        <PageTitle title="Предпросмотр" />

        <fieldset className={styles.fieldset}>
          <label htmlFor="price" className={styles.label}>
            Ссылка на изображение для демонстрации
          </label>
          <input
            className={styles.input}
            type="url"
            id="url"
            name="preview"
            value={values.preview || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваша ссылка"
            maxLength={200}
            autoComplete="off"
          />
        </fieldset>
        <VerticalEventCard event={eventDetails} />
      </div>
    </div>
  );
};

export default Organisation;
