import { Button, Carousel, CustomImage } from '@components';
import { ICareerBanner } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import styles from './CareerBanner.module.scss';

const CareerBanner = (props: ICareerBanner) => {
  const { careerbannerdata } = props;
  const { deviceType } = useDeviceType();

  const getComponent = (item: any) => {
    if (item?.srcMobile && deviceType != 'desktop') {
      return (
        <div className={styles.innerBanner}>
          {item?.title && <span className={styles.imgType}>{item?.title}</span>}
          <CustomImage itemProp="image" src={item?.srcMobile} className="img-fluid imgBackground" alt={item?.alt} />
        </div>
      );
    } else {
      return (
        <div className={styles.innerBanner}>
          {item?.title && <span className={styles.imgType}>{item?.title}</span>}
          <CustomImage itemProp="image" src={item?.src} className="img-fluid imgBackground" alt={item?.alt} />
        </div>
      );
    }
  };
  return (
    <div className={`section-row ${styles.careerimages}`}>
      <Carousel
        className=""
        classes=""
        settings={{
          arrows: false,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          infinite: true,
          pauseOnHover: false,
          slidesToScroll: 1,
          slidesToShow: 1,
          speed: 500,
          swipe: true,
          responsive: [
            {
              breakpoint: 1199,
              settings: { slidesToShow: 1 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1, dots: false, arrows: false },
            },
            {
              breakpoint: 500,
              settings: { slidesToShow: 1, dots: true, arrows: false },
            },
          ],
        }}
      >
        <React.Fragment>
          {careerbannerdata?.map(
            (
              item: {
                src: string;
                alt: string;
                srcMobile?: string;
                headerdesc?: string;
                emailLink?: string;
                buttontext?: string;
                title?: string;
              },
              index: number,
            ) => (
              <div itemProp="primaryImageOfPage" className={styles.CareerHeader} key={`${item?.src + index}`}>
                {getComponent(item)}
                {deviceType === 'desktop' && (
                  <div className={styles.bannerOverlay}>
                    <div itemProp="description" className={styles.headerData}>
                      <h2 itemProp="headline">{item?.headerdesc}</h2>
                      <a itemProp="potentialAction" href={item?.emailLink}>
                        <Button className="btn-light">{item?.buttontext}</Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </React.Fragment>
      </Carousel>

      {deviceType !== 'desktop' && (
        <div className={styles.CareerHeader}>
          <div className={styles.bannerOverlay}>
            <div itemProp="about" className={styles.headerData}>
              <h2 itemProp="headline">{careerbannerdata[0]?.headerdesc}</h2>
              <a itemProp="potentialACtion" href={careerbannerdata[0]?.emailLink}>
                <Button className="btn-light">{careerbannerdata[0]?.buttontext}</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CareerBanner;
