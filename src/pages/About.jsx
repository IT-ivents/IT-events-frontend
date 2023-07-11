import AboutUs from '../components/AboutUs/AboutUs';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';

const About = ({ toggleModalSignUp }) => {
  return (
    <>
      <AboutUs toggleModalSignUp={toggleModalSignUp} />
      <ScrollToTopButton />
    </>
  );
};

export default About;
