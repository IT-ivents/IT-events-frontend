import { useState, useEffect } from 'react';

const useScrollToTop = (scrollThreshold) => {
  const [isOnTopVisible, setIsOnTopVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const handleScroll = () => {
    if (window.pageYOffset > scrollThreshold) {
      setIsOnTopVisible(true);
    } else {
      setIsOnTopVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        const height = footerElement.offsetHeight;
        setFooterHeight(height);
      }
      const height = window.innerHeight;
      setWindowHeight(height);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Вызовите функцию измерения высоты при первой загрузке
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { isOnTopVisible, scrollToTop, footerHeight, windowHeight };
};
export default useScrollToTop;
