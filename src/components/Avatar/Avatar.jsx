import React, { useMemo } from 'react';

const Avatar = ({ name, style }) => {
  const firstLetter = useMemo(() => name?.charAt(0).toUpperCase(), [name]);

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
      width: '88px',
      height: '88px',
      borderRadius: '50%',
      color: '#fff',
      fontSize: '32px',
      fontWeight: '700',
      cursor: 'default',
      ...style,
    };

    return <div style={avatarStyle}>{firstLetter ?? ''}</div>;
  }, [firstLetter, style]);

  return <div>{generateAvatar}</div>;
};

export default Avatar;
