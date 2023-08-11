import { useEffect, useState } from 'react';
import { apiEvents } from '../../utils/api';

const initialData = {
  topics: [
    'Backend',
    'Frontend',
    'QA',
    'UX/UI дизайн',
    'Web-разработка',
    'Data Science',
  ],
  city: [
    'владивосток',
    'смоленск',
    'москва',
    'екатеринбург',
    'санкт-Петербург',
    'дулепово',
    'сочи',
    'бердск',
  ],
  findTags: [
    'Architecture and patterns',
    'C++',
    'AI',
    'HR',
    'UX/UI',
    'Docker',
    'Kubernetes',
    'Python',
    'React',
    'Redis',
    'Cybersecurity',
    'Data Management',
    'Data Processing',
    'DataOps',
    'Product',
    'architecture of IT solutions',
    'Fintech',
    'Project Management',
    'C#',
    'Interface design',
    'Java',
    'JavaScript',
    'Rust',
    'Go',
    'Linux',
    'MeeGo',
    'MySQL',
    'NGINX',
    'PHP',
    'PostgreSQL',
    'SQL',
    'game-industry',
    '1C',
    'EDO',
    'XML',
    'VPN',
    'GPT',
    'ML',
    'b2c',
    'b2b',
    'ит в транспорте',
    'FrontOps',
    'FastAPI',
    'спутниковая связь',
    'animation',
    'game-design',
    'game-mechanics',
  ],
};

export function useInitialFilter() {
  const [dataLists, setDataLists] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await apiEvents.getTopics();
        setDataLists((prevDataLists) => ({
          ...prevDataLists,
          topics: response.map((item) => item.name),
        }));
      } catch (error) {
        console.log('Error fetching topics:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await apiEvents.getTags();
        setDataLists((prevDataLists) => ({
          ...prevDataLists,
          findTags: response.map((item) => item.name),
        }));
      } catch (error) {
        console.log('Error fetching tags:', error);
      }
    };

    const fetchSities = async () => {
      try {
        const response = await apiEvents.getSities();
        console.log(response);
        setDataLists((prevDataLists) => ({
          ...prevDataLists,
          city: response.map((item) => item.name),
        }));
      } catch (error) {
        console.log('Error fetching sities:', error);
      }
    };

    fetchTopics();
    fetchTags();
    fetchSities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dataLists,
  };
}
