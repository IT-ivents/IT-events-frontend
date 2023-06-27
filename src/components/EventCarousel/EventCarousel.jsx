import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './EventCarousel.module.css';
import VerticalEventCard from '../VerticalEventCard/VerticalEventCard';

export default function EventCarousel({ mostAnticipatedEvents }) {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div className={styles.carousel}>
      <h1 className={styles.title}>Самые ожидаемые события года</h1>
      <Slider {...settings}>
        {mostAnticipatedEvents.map((event) => (
          <VerticalEventCard key={event.id} event={event} />
        ))}
      </Slider>
    </div>
  );
}
