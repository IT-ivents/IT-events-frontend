import React, { useMemo } from 'react';

const Avatar = ({ name }) => {
  const firstLetter = useMemo(() => name.charAt(0).toUpperCase(), [name]);

  const generateAvatar = useMemo(() => {
    const backgroundColors = [
      '#40337E',
      '#B53047',
      '#7290BD',
      '#E7DBF4',
      '#76841B',
      '#889AD3',
      '#5458AB',
      '#16191A',
      '#F04122',
      '#EFD885',
      '#D99445',
    ];
    const randomColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    const avatarStyle = {
      backgroundColor: randomColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      color: '#fff',
      fontSize: '38px',
      fontWeight: '700',
    };

    return <div style={avatarStyle}>{firstLetter}</div>;
  }, [firstLetter]);

  return <div>{generateAvatar}</div>;
};

export default Avatar;
