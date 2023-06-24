import React, { useState, useEffect } from 'react';

const useScrollToTop = (scrollThreshold) => {
  const [isOnTopVisible, setIsOnTopVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > scrollThreshold) {
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
