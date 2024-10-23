import { Carousel, CustomImage } from '@components';
import { ICommunicationCornerDefaultArticles, ICommunicationCornerItem } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Col, Figure, Row } from 'react-bootstrap';
import styles from './communicationCornerDefaultArticles.module.scss';

const CommunicationCornerDefaultArticles = (props: ICommunicationCornerDefaultArticles) => {
  const { items } = props;
  const { deviceType } = useDeviceType();

  return (
    <>
      {deviceType !== 'desktop' ? (
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
            slidesToShow: 1,
            speed: 500,
            swipe: true,
            responsive: [
              { breakpoint: 1199, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2.2 } },
              { breakpoint: 500, settings: { slidesToShow: 1.2 } },
            ],
          }}
        >
          <React.Fragment key=".0">
            {items?.map((item: ICommunicationCornerItem, i: number) => (
              <div
                className={styles.newsupdatescard}
                key={`${(item?.src ?? '') + i}`}
                itemScope
                itemType="https://schema.org/Article"
              >
                <Figure>
                  <a href={`${item.link}`}>
                    {item?.imgTitle && <span className={styles.imgType}>{item?.imgTitle}</span>}
                    <CustomImage
                      src={item.src ? item?.src : ''}
                      className="imgBackground"
                      alt={item.title}
                      title={item.title}
                      itemProp="image"
                    />
                  </a>
                </Figure>
                <div className={styles.newsupdatescarddescription}>
                  <h3 itemProp="headline">
                    <a href={`${item.link}`} dangerouslySetInnerHTML={{ __html: item.title }} itemProp="url"></a>
                  </h3>
                  {item.subHeading && <p itemProp="alternativeHeadline">{item.subHeading}</p>}
                  <ul className={styles.blogDate}>
                    <li itemProp="sdDatePublished">{item.dateTime}</li>
                    <li>
                      <a
                        href={
                          item.categoryTitle === 'All'
                            ? `${process.env.NEXT_PUBLIC_STAGING_LINK}/blogs`
                            : item.categoryLink
                        }
                      >
                        <b itemProp="url">{item.categoryTitle}</b>
                      </a>
                    </li>
                    {/* <li>{readTime}</li> */}
                  </ul>
                </div>
              </div>
            ))}
          </React.Fragment>
        </Carousel>
      ) : (
        items?.map((item: ICommunicationCornerItem, i: number) =>
          item?.isDefault ? (
            <div
              className={styles.articlesmain}
              key={`${(item?.title || '') + i}`}
              itemScope
              itemType="https://schema.org/Article"
            >
              <Row>
                <Col lg={8}>
                  <div className={styles.newsupdatesthumb}>
                    <a href={`${item.link}`}>
                      {item?.imgTitle && <span className={styles.imgType}>{item?.imgTitle}</span>}
                      <CustomImage
                        src={item.src ? item.src : ''}
                        alt={item.title}
                        title={item.title}
                        itemProp="image"
                        className="imgBackground"
                      />
                    </a>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.newsupdatesdescription}>
                    <div>
                      <h3 itemProp="headline">
                        <a href={`${item.link}`} dangerouslySetInnerHTML={{ __html: item.title }} itemProp="url"></a>
                      </h3>
                      {item.subHeading && (
                        <div className={styles.defaultArticle}>
                          <p dangerouslySetInnerHTML={{ __html: item.subHeading }} itemProp="alternativeHeadline"></p>
                        </div>
                      )}
                      <ul className={styles.blogDate}>
                        <li itemProp="sdDatePublished">{item.dateTime}</li>
                        <li>
                          <a
                            href={
                              item.categoryTitle === 'All'
                                ? `${process.env.NEXT_PUBLIC_STAGING_LINK}/blogs`
                                : item.categoryLink
                            }
                            itemProp="url"
                          >
                            {item.categoryTitle}
                          </a>
                        </li>
                        {/* <li>{readTime}</li> */}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <Col lg={4} key={`${(item?.title || '') + i}`}>
              <div className={styles.newsupdatescard} itemScope itemType="https://schema.org/Article">
                <Figure>
                  <a href={`${item.link}`}>
                    {item?.imgTitle && <span className={styles.imgType}>{item?.imgTitle}</span>}
                    <CustomImage
                      className="imgBackground"
                      src={item.src ? item?.src : ''}
                      alt={item.title}
                      title={item.title}
                      itemProp="image"
                    />
                  </a>
                </Figure>
                <div className={styles.newsupdatescarddescription}>
                  <h3 itemProp="headline">
                    <a
                      title={item.title}
                      href={`${item.link}`}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                      itemProp="url"
                    ></a>
                  </h3>
                  {item.subHeading && (
                    <div className={styles.articleText}>
                      <p dangerouslySetInnerHTML={{ __html: item.subHeading }} itemProp="alternativeHeadline"></p>
                    </div>
                  )}

                  <ul className={styles.blogDate}>
                    <li itemProp="sdDatePublished">{item.dateTime}</li>
                    <li>
                      <a
                        href={
                          item.categoryTitle === 'All'
                            ? `${process.env.NEXT_PUBLIC_STAGING_LINK}/blogs`
                            : item.categoryLink
                        }
                      >
                        <b itemProp="url">{item.categoryTitle}</b>
                      </a>
                    </li>
                    {/* <li>{readTime}</li> */}
                  </ul>
                </div>
              </div>
            </Col>
          ),
        )
      )}
    </>
  );
};

export default CommunicationCornerDefaultArticles;
