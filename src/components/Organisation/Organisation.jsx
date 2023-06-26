import { useEffect, useState } from 'react';
import styles from './Organisation.module.css';
import PageTitle from '../PageTitle/PageTitle';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { apiEvents } from '../../utils/api';

const Organisation = () => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    disabledButton,
    resetForm,
  } = useFormWithValidation();

  const [tags, setTags] = useState([]);

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
    <form className={styles.natasha}>
      <PageTitle title="Добавить событие" />
      <fieldset className={styles.fieldset}>
        <label htmlFor="title" className={styles.label}>
          Название мероприятия
        </label>
        <input
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
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
        <label htmlFor="description" className={styles.label}>
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description || ''}
          onChange={handleChange}
          rows="6"
          placeholder="Расскажите о событии подробнее"
          className={styles.textArea}
        ></textarea>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <label htmlFor="program" className={styles.label}>
          Программа
        </label>
        <textarea
          id="program"
          name="program"
          value={values.program || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Что будет в вашей программе?"
          className={styles.textArea}
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
          <select name="topic" className={styles.input}>
            <option value="hidden" hidden>
              Выберите тему
            </option>
            <option value="left">Тудым</option>
            <option value="right">Сюдым</option>
          </select>
        </fieldset>
      </div>

      <div className={styles.rowContainer}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="start" className={styles.label}>
            Дата и время начала
          </label>
          <input type="date" id="start" className={styles.input} />
          <input type="time" id="start" className={styles.input} />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="finish" className={styles.label}>
            Дата и время окончания
          </label>
          <input type="date" id="finish" className={styles.input} />
          <input type="time" id="finish" className={styles.input} />
        </fieldset>
      </div>

      <div className={styles.rowContainer}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="city" className={styles.label}>
            Город
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={values.city || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="Укажите город проведения"
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label htmlFor="address" className={styles.label}>
            Адрес
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={values.address || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="Укажите адрес"
          />
        </fieldset>
      </div>

      <div className={styles.rowContainer}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="partners" className={styles.label}>
            Партнеры
          </label>
          <input
            type="text"
            id="partners"
            className={styles.input}
            placeholder="Есть партнеры?"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label htmlFor="price" className={styles.label}>
            Цена
          </label>
          <input
            type="number"
            id="price"
            className={styles.input}
            placeholder="Укажите цену"
          />
        </fieldset>
      </div>

      <div className={styles.rowContainer}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="image" className={styles.label}>
            Добавьте баннер{' '}
            <span className={styles.recommendation}>
              Рекомендуемый размер: 608х380
            </span>
          </label>
          <input type="file" id="image" className={styles.input} />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label htmlFor="image" className={styles.label}>
            Добавьте баннер{' '}
            <span className={styles.recommendation}>
              Рекомендуемый размер: 296x240
            </span>
          </label>
          <input type="file" id="image" className={styles.input} />
        </fieldset>
      </div>

      <p className={styles.message}>
        <span className={styles.span}>Внимание!</span> Проверьте корректность
        заполненных данных. Карточка с Вашим мероприятием появится на сайте
        после проверки модератором.{' '}
      </p>
      <SubmitButton title="Отправить" />
    </form>
  );
};

export default Organisation;
