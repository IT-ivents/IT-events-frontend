import React, { useState, useEffect } from 'react';

const useScrollToTop = () => {
  const [isOnTopVisible, setIsOnTopVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsOnTopVisible(true);
    } else {
      setIsOnTopVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { isOnTopVisible, scrollToTop };
};

export default useScrollToTop;
