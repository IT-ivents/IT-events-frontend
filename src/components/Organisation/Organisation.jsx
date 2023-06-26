import { useEffect, useState } from 'react';
import styles from './Organisation.module.css';
import PageTitle from '../PageTitle/PageTitle';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { apiEvents } from '../../utils/api';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';
import HorizontalEventCard from '../HorizontalEventCard/HorizontalEventCard';

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
  const [smallImage, setSmallImage] = useState('');

  const eventDetails = {
    title: values.title,
    city: { name: values.city },
    image: values.url,
    price: values.price,
    date_start: values.date_start,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSmallImage(file);
    console.log(file);
  };

  const handleTopicChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(selectedOptions);
    setSelectedTopics((prevSelectedTopics) => [
      ...prevSelectedTopics,
      ...selectedOptions,
    ]);
  };
  console.log(selectedTopics);

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
              minLength={6}
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
              maxLength={200}
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
              Направление
            </label>
            <select name="tags" className={styles.input}>
              <option value="hidden" hidden>
                Выберите направление
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="format" className={styles.label}>
              Формат проведения
            </label>
            <select name="format" className={styles.input}>
              <option value="hidden" hidden>
                Выберите формат
              </option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label htmlFor="topic" className={styles.label}>
              Тема
            </label>
            <select
              name="topic"
              className={styles.input}
              onChange={handleTopicChange}
            >
              <option value="hidden" hidden>
                Выберите тему
              </option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="ux/ui">UX/UI</option>
              <option value="big-data-and-analytics">Data analytics</option>
              <option value="hr">HR</option>
              <option value="management">Management</option>
              <option value="devops">Devops</option>
              <option value="artificial-intelligence-and-machine-learning">
                AI & ML
              </option>
              <option value="information_security">Кибербезопасность</option>
            </select>
            {/* <ul className={styles.selectList}>
          {selectedTopics.map((item, index) => (
            <li key={index} className={styles.selectItem}>{item}</li>
          ))}
           </ul> */}
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
            />
            <span className={styles.spanError}>{errors.city}</span>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <label htmlFor="address" className={styles.label}>
              Адрес<span className={styles.spanError}>*</span>{' '}
              <span className={styles.recommendation}>
                Максимум 200 символов
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
              Партнеры<span className={styles.spanError}>*</span>{' '}
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
                Рекомендуемый размер: 608х380
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
                Рекомендуемый размер: 296x240
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
        <VerticalEventCard event={eventDetails} />
      </div>
    </div>
  );
};

export default Organisation;
