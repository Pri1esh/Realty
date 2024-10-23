import { Carousel, CustomImage } from '@components';
import { IAboutUsTimelineCarousel, IAboutUsTimelineCarouselData } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import styles from './AboutUsTimelineCarousel.module.scss';

const AboutUsTimelineCarousel = (props: IAboutUsTimelineCarousel) => {
  const { data } = props;
  const eventyear = data?.map((item) => item?.year)?.filter((i) => i !== undefined || i !== '');
  const { deviceType } = useDeviceType();
  return (
    <div className={styles.timelineCarousel}>
      <div className={styles.timelineCarouselWrap}>
        <Carousel
          className=""
          classes=""
          settings={{
            arrows: true,
            autoplay: false,
            autoplaySpeed: 2000,
            dots: true,
            infinite: false,
            pauseOnHover: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            fade: true,
            responsive: [
              {
                breakpoint: 1199,
                settings: { slidesToShow: 3 },
              },
              {
                breakpoint: 991,
                settings: { slidesToShow: 2, arrows: false },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, arrows: false },
              },
              {
                breakpoint: 500,
                settings: { slidesToShow: 1, infinite: false, autoplay: false, arrows: false },
              },
            ],
            swipe: true,
            appendDots: (
              dots: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined,
            ) => (
              <div>
                <ul> {dots} </ul>
              </div>
            ),
            customPaging: (i: string | number | any) => (
              <div>
                <span>{eventyear[i]}</span>
              </div>
            ),
          }}
        >
          <React.Fragment>
            {data?.map((item: IAboutUsTimelineCarouselData, key: number) => (
              <div key={`${item?.src + key}`}>
                <div className={styles.timeline}>
                  <div className={styles.timeline_thumb}>
                    {item?.imgType && <span className={styles.imgType}>{item?.imgType}</span>}
                    <CustomImage
                      src={deviceType !== 'desktop' && item?.mobileImage ? item?.mobileImage : item?.src}
                      alt={item?.name}
                      width={1200}
                      height={600}
                      itemProp="image"
                      className="imgBackground"
                    />
                  </div>
                  <div className={styles.timeline_content}>
                    <span itemProp="sdDatePublished">{item.year}</span>
                    <h3 itemProp="text">{item.name}</h3>
                    <p itemProp="accessibilitySummary">{item.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        </Carousel>
      </div>
    </div>
  );
};
export default AboutUsTimelineCarousel;
