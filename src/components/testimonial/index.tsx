import { Carousel, SectionHeader } from '@components';
import { ITestimonial, ITestimonialList } from '@interfaces';
import React, { useEffect, useState } from 'react';
import styles from './testimonial.module.scss';
import TestimonialData from './testimonialData';

const Testimonial = (props: ITestimonialList) => {
  const { testimonialList, heading } = props;
  const [current, setCurrent] = useState<number>(-1);
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', setTestimonialsDisplay);

    return () => {
      window.removeEventListener('scroll', setTestimonialsDisplay);
    };
  }, []);

  const setTestimonialsDisplay = () => {
    typeof window !== 'undefined' && window.scrollY > 20 && setDisplay(true);
  };

  const getTestimonialSrc = (src: string, key: number) => {
    if (display && key !== current) {
      return src;
    }
    return '';
  };

  return (
    <div className={styles.sectionTestimonial}>
      {heading && <SectionHeader itemProp="headline" heading={heading} />}
      {testimonialList && (
        <Carousel
          settings={{
            arrows: true,
            autoplay: false,
            autoplaySpeed: 2000,
            dots: true,
            pauseOnHover: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            swipe: true,
            beforeChange: function (prev: number, curr: number) {
              if (prev === curr) {
                return;
              } else {
                setCurrent(prev);
              }
            },
            responsive: [
              {
                breakpoint: 1199,
                settings: { slidesToShow: 1 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
              },
              {
                breakpoint: 500,
                settings: { slidesToShow: 1, arrows: false },
              },
            ],
          }}
        >
          <React.Fragment key=".0">
            {testimonialList.map((item: ITestimonial, key: number) => (
              <TestimonialData
                iframesrc={getTestimonialSrc(item?.iframesrc, key)}
                item={item}
                key={`${item?.iframesrc + key}`}
              />
            ))}
          </React.Fragment>
        </Carousel>
      )}
    </div>
  );
};
export default Testimonial;
