import { Carousel } from '@components';
import { IWhyInvest } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React from 'react';
import styles from './WhyInvest.module.scss';

const WhyInvest = (props: IWhyInvest) => {
  return (
    <div className={styles.investmentBenefits}>
      <Carousel
        className=""
        classes=""
        isMobSlider
        settings={{
          arrows: false,
          autoplay: false,
          autoplaySpeed: 2000,
          dots: false,
          infinite: false,
          pauseOnHover: false,
          slidesToScroll: 1,
          slidesToShow: 4,
          speed: 500,
          swipe: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: { slidesToShow: 4, arrows: false },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 3, arrows: false },
            },
            {
              breakpoint: 500,
              settings: { slidesToShow: 1, infinite: false, autoplay: false, arrows: false },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {props?.data?.map(
            (
              item: {
                icon: string;
                title: string;
              },
              index: number,
            ) => (
              <div className={styles.block} key={`${item?.title + index}`}>
                <span>{getIconFromIconName(item.icon)}</span>
                <h3 itemProp="headline">{item.title}</h3>
                {/* <p>{item.desc}</p> */}
              </div>
            ),
          )}
        </React.Fragment>
      </Carousel>
    </div>
  );
};

export default WhyInvest;
