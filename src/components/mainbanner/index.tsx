import { Carousel } from '@components';
import { IMainbanner, IMainbannerItem } from '@interfaces';
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import Banner from './banner';
import styles from './mainbanner.module.scss';

const Mainbanner = (props: IMainbanner) => {
  const getSpeedForSlide = (slide: any) => {
    if (slide === 0) {
      return 20000;
    } else {
      return 10000;
    }
  };
  const [speed, setSpeed] = useState<any>(20000);
  const handleAfterChange = (current: any) => {
    setSpeed(getSpeedForSlide(current));
  };
  const { bannerData, parent = '' } = props;
  return (
    <div className={styles.bannerWrapper}>
      <Carousel
        settings={{
          lazyLoad: 'ondemand',
          arrows: true,
          autoplay: true,
          autoplaySpeed: speed,
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: true,
          afterChange: (current: any) => handleAfterChange(current),
          responsive: [
            {
              breakpoint: 1199,
              settings: { slidesToShow: 1 },
            },
            {
              breakpoint: 768,
              settings: { arrows: false },
            },
            {
              breakpoint: 500,
              settings: { arrows: false },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {bannerData.fields.data.map((item: IMainbannerItem, index: number) => (
            <Banner key={`${(item?.srcMobile ?? '') + index}`} id={index} compData={item} parent={parent} />
          ))}
        </React.Fragment>
      </Carousel>
    </div>
  );
};
export default Mainbanner;
