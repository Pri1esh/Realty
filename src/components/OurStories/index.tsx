import { Carousel, CustomImage, SectionHeader } from '@components';
import { IOurStories } from '@interfaces';
import React from 'react';
import styles from './OurStories.module.scss';

const OurStories = (props: IOurStories) => {
  const { stories, heading } = props;
  return (
    <div className={` section-row ${styles.sectionStories}`}>
      <SectionHeader itemProp="headline" heading={heading} />
      <Carousel
        isMobSlider
        settings={{
          slidesToShow: 3,
          swipe: true,
          infinite: false,
          arrows: true,
          autoplay: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: { slidesToShow: 3 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2, arrows: false },
            },
            {
              breakpoint: 500,
              settings: { slidesToShow: 1.5, arrows: false },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {stories.map((item: any, index: number) => (
            <div key={`${index + item?.title}`}>
              <figure>
                <CustomImage itemProp="image" src={item?.src} alt={item?.title} className="imgBackground img-fluid" />
              </figure>
              <h3 className={styles.cardTitle}>{item?.title}</h3>
              <p className={styles.cardDesc}>{item?.desc}</p>
            </div>
          ))}
        </React.Fragment>
      </Carousel>
    </div>
  );
};

export default OurStories;
