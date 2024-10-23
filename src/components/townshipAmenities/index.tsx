import { Carousel, CustomImage, ReadMore } from '@components';
import { ITownshipAmenities } from '@interfaces';
import { useDeviceType } from '@utils';
import React, { useState } from 'react';
import styles from './townshipAmenities.module.scss';

const TownshipAmenities = (props: { compData: ITownshipAmenities }) => {
  const { compData } = props;
  const [slideNumbering, setslideNumbering] = useState<number>(1);
  const { deviceType } = useDeviceType();
  return (
    <div className={styles.highlightWrapper} id={`${compData.id}`}>
      <h2>{compData?.mainHeading}</h2>
      <div className={styles.slideNumbering}>
        {slideNumbering} / {compData?.dataList?.length}
      </div>
      <Carousel
        className=""
        isMobSlider
        settings={{
          arrows: true,
          autoplay: deviceType !== 'desktop',
          autoplaySpeed: 6000,
          dots: false,
          infinite: true,
          pauseOnHover: false,
          slidesToScroll: 1,
          slidesToShow: 1,
          speed: 500,
          swipe: deviceType !== 'desktop',
          afterChange: (e: any) => {
            setslideNumbering(e + 1);
          },
          responsive: [
            {
              breakpoint: 1200,
              settings: { slidesToShow: 1 },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {compData?.dataList?.map((item, index) => (
            <div className={styles.cardblock} key={`${(compData.id || '') + index}`}>
              <div className={styles.cardBlockWrap}>
                {item.imageSource && (
                  <div className={styles.cardblockthumb}>
                    <CustomImage
                      src={item.imageSource}
                      alt={item.imageAlt}
                      itemProp="image"
                      className="imgBackground"
                    />
                  </div>
                )}
                <div className={styles.cardblockdescription}>
                  {item?.sectionHeading && (
                    <p className={styles.heading} itemProp="headline">
                      {item?.sectionHeading}
                    </p>
                  )}
                  {item?.subHeading && (
                    <p className={styles.subText} itemProp="text">
                      {item?.subHeading}
                    </p>
                  )}
                  {item?.description && (
                    <ReadMore data={item?.description} textLength={deviceType === 'desktop' ? 270 : 65} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      </Carousel>
    </div>
  );
};
export default TownshipAmenities;
