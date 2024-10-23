import { Carousel, CustomImage } from '@components';
import { IPropertyListingSummary } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropertyListingCard from '../propertyListingCard';
import PropertyListingSummary from '../propertyListingSummary';
import styles from './PropertyListing.module.scss';

const PropertyListing = (props: IPropertyListingSummary) => {
  const { property, currID } = props;
  const [readMore, setReadMore] = useState(false);

  return (
    <div className={styles.propertyListingRow}>
      <Row itemScope itemType="https://schema.org/RealEstateListing" itemProp="mainEntityOfPage">
        <Col lg={6} md={6} className="mb-md-0 mb-3">
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
              swipe: true,
              responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 1,
                    arrows: false,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ],
            }}
          >
            <div itemProp="associatedMedia" className="propListingCard">
              {property?.carouselImages[0]?.items?.map(
                (item: { alt: string; src: string; imageDesc: string }, index: number) => (
                  <PropertyListingCard
                    key={`${item?.src + index}`}
                    alt={item.alt ? item.alt : 'Adani Realty'}
                    src={item.src}
                    // projectLogo={item.porjectLogo}
                    imageDesc={item.imageDesc}
                    link={property?.data?.link}
                    target={property?.data?.linktarget}
                  />
                ),
              )}
            </div>
          </Carousel>
          <a itemProp="url" className={styles.projectLogo} href={`${property?.data?.link}` || '#'}>
            <CustomImage
              itemProp="image"
              src={property?.carouselImages[0]?.items[0]?.porjectLogo}
              alt={
                property?.carouselImages[0]?.items[0]?.porjectLogoAlt
                  ? property?.carouselImages[0]?.items[0]?.porjectLogoAlt
                  : 'Adani Realty'
              }
            />
          </a>
        </Col>

        <Col lg={6} md={6}>
          <a
            itemProp="url"
            href={`${property?.data?.link}` || '#'}
            target={property?.data?.linktarget ? property?.data?.linktarget : '_self'}
            rel={property?.data?.target == '_blank' ? 'noopener noreferrer' : ''}
            className={`${styles.subText} ${
              readMore && property?.data.propertyID === currID ? styles.subTextLess : styles.subTextMore
            }`}
          >
            <PropertyListingSummary property={property} />
          </a>

          {property?.data?.areaDetail.length >= 30 ? (
            <a
              href="javascript: void(0)"
              onClick={() => {
                currID === property?.data.propertyID ? setReadMore(!readMore) : setReadMore(true);
              }}
              className={styles.btnReadMore}
            >
              {readMore && property?.data.propertyID === currID ? (
                <>
                  Less
                  {getIconFromIconName('ArrowUp')}
                </>
              ) : (
                <>
                  More
                  {getIconFromIconName('arrowdown')}
                </>
              )}
            </a>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PropertyListing;
