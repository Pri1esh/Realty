import { SectionHeader, Testimonial } from '@components';
import { IHeroAtWork } from '@interfaces';
import { Container } from 'react-bootstrap';
import styles from './HeroAtWork.module.scss';

const HeroAtWork = (props: IHeroAtWork) => {
  const { testimonials } = props;
  return (
    <div className={styles.HeroatWork}>
      <Container>
        <SectionHeader itemProp="headline" heading={testimonials?.params?.ComponentTitle} />
        <p itemProp="alternateName">{testimonials?.params?.TestimonialsSubTitle}</p>
        <div className={styles.slickDots}>
          <Testimonial testimonialList={testimonials?.fields?.data} />
        </div>
      </Container>
    </div>
  );
};

export default HeroAtWork;
