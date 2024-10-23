import { Carousel, CustomImage } from '@components';
import { ITownshipCard, ITownshipCardItem } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './TownshipCard.module.scss';

const TownshipCard = (props: ITownshipCard) => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType == 'mobile';
  const { items } = props;
  const { sendEvent } = useGTM();

  const eventAnalyticsHandler = (title: string) => {
    const eventVal = {
      event: 'explore_more',
      category: 'realty',
      sub_category: 'Tonship Card',
      page_type: 'home',
      click_text: 'Explore',
      project_type: 'Township',
      property_type: title ? title : '',
    };
    sendEvent(eventVal);
  };

  return (
    <div itemScope itemType="https://schema.org/MediaObject">
      <Carousel
        className=""
        classes=""
        settings={{
          arrows: true,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: false,
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
              settings: { slidesToShow: 1, arrows: false, dots: false },
            },
            {
              breakpoint: 500,
              settings: { slidesToShow: 1, arrows: false, dots: false },
            },
          ],
        }}
      >
        <React.Fragment>
          {items?.map((item: ITownshipCardItem, index: number) => (
            <div itemProp="mainEntity" className={styles.townshipCard} key={`${item?.alt + index}`}>
              <Row className="align-items-center">
                <Col lg={5} sm={12} className={styles.townshipMobile}>
                  <a itemProp="contentUrl" href={item?.btnLink}>
                    <CustomImage
                      src={isMobile && item?.mobileimage ? item.mobileimage : item.src}
                      alt={item?.alt}
                      className="imgBackground"
                    />

                    <span itemProp="text" className={styles.imgTag}>
                      {item?.imgLabel}
                    </span>
                  </a>
                  <div className="hideDesktop">
                    <h2 itemProp="headline">{item?.title}</h2>
                    <Button
                      itemProp="url"
                      variant="primary"
                      href={item?.btnLink}
                      onClick={() => eventAnalyticsHandler(item?.title)}
                    >
                      {item?.btnText}
                    </Button>
                  </div>
                </Col>
                <Col lg={7} md={12} className={` ${styles.townshipInfo} hideMobile`}>
                  <h2 itemProp="headline">{item?.title}</h2>
                  <p itemProp="text" className="card-desc">
                    {item?.desc}
                  </p>
                  {item?.subDesc && <p itemProp="text">{item?.subDesc}</p>}
                  <Button
                    itemProp="url"
                    variant="primary"
                    href={item?.btnLink}
                    onClick={() => eventAnalyticsHandler(item?.title)}
                  >
                    {item?.btnText}
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </React.Fragment>
      </Carousel>
    </div>
  );
};

export default TownshipCard;
