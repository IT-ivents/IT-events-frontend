import DSImage from './../../images/Preferences/DS.svg';
import DesignImage from './../../images/Preferences/design.svg';
import ManagementImage from './../../images/Preferences/management.svg';
import DevImage from './../../images/Preferences/dev.svg';

// Для главной страницы
export const tagsPopular = [
  'Python',
  'С++',
  'Java',
  'Go',
  'Data Science',
  'HR',
  'ML',
  'UX',
  'UX/UI',
  'Scala',
  'Product Design',
  'iOS',
  'Android',
];

// Для страницы предпочтений
export const tagsBlock = [
  {
    imageSrc: DSImage,
    altText: 'Tags Icons',
    caption: 'Анализ данных',
    tags: ['Машинное обучение', 'ML', 'ad', 'CatBoost', 'Data Science'],
  },
  {
    imageSrc: DesignImage,
    altText: 'Tags Icons',
    caption: 'Дизайн',
    tags: [
      'Data Science',
      'Продуктовый дизайн',
      'Графический дизайн',
      '3D',
      'AR/VR',
      'Game Design',
    ],
  },
  {
    imageSrc: ManagementImage,
    altText: 'Tags Icons',
    caption: 'Менеджмент',
    tags: ['Аналитика', 'HR', 'Управление веб-проектами и продуктом'],
  },
  {
    imageSrc: DevImage,
    altText: 'Tags Icons',
    caption: 'Разработка',
    tags: [
      'Backend',
      'Frontend',
      'QA',
      'Python',
      'Go',
      'C++',
      'Java',
      'DevOps',
      'SDG',
      'SpeechKit',
      'Scala',
      'iOS',
      'Android',
      'Информационная безопасность',
      'Базы данных',
      'Мобильная разработка',
      'Системное администрирование',
    ],
  },
];

// Если потребуется использовать отдельные массивы тегов
export const tagsDs = tagsBlock[0].tags;
export const tagsDesign = tagsBlock[1].tags;
export const tagsManagement = tagsBlock[2].tags;
export const tagsDev = tagsBlock[3].tags;
