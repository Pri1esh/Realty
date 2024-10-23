import { Carousel, OurLocation, SectionHeader } from '@components';
import { IOurLocationCarousel, IOurLocationCarouselData } from '@interfaces';
import React from 'react';
import styles from './ourLocationCarousel.module.scss';
const OurLocationCarousel = (props: IOurLocationCarousel) => {
  const { OurLocationlist } = props;
  return (
    <div className={`section-row arrow_pos ${styles.wrapper}`}>
      <SectionHeader
        heading={OurLocationlist?.params?.ComponentTitle || OurLocationlist?.fields.ourProjects?.heading}
        itemProp="name"
      />
      <Carousel
        className=""
        classes=""
        isMobSlider
        settings={{
          arrows: true,
          autoplay: false,
          autoplaySpeed: 2000,
          dots: false,
          infinite: false,
          pauseOnHover: false,
          slidesToScroll: 1,
          slidesToShow: 3,
          speed: 500,
          swipe: true,
          responsive: [
            {
              breakpoint: 1199,
              settings: { slidesToShow: 3 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 500,
              settings: { slidesToShow: 1.1, infinite: false, autoplay: false },
            },
          ],
        }}
      >
        <React.Fragment>
          {(OurLocationlist?.fields?.data || OurLocationlist?.fields.ourProjects?.data).map(
            (item: IOurLocationCarouselData, index: number) => (
              <OurLocation key={`${(item?.src ?? '') + index}`} location={item} />
            ),
          )}
        </React.Fragment>
      </Carousel>
    </div>
  );
};

export default OurLocationCarousel;
