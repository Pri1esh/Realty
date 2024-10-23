import { Carousel, CustomImage } from '@components';
import { IFeaturedArticles, IFeaturedArticlesItem } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './featuredArticles.module.scss';

const FeaturedArticles = (props: IFeaturedArticles) => {
  const { items } = props;
  const { deviceType } = useDeviceType();
  return (
    <>
      {deviceType === 'desktop' ? (
        items?.map((item: IFeaturedArticlesItem, i: number) => (
          <Col lg={4} md={6} key={`${item.link + i}`}>
            <div className={styles.featuredarticles}>
              <div className={styles.articlescard}>
                <a href={`${item.link}`} className={styles.articlescardticker} itemProp="url">
                  {item?.category[0]?.categorytitle}
                </a>

                <div className={styles.articlescardthumb}>
                  <a href={`${item.link}`} itemProp="url">
                    <CustomImage
                      className="imgBackground"
                      src={item.src}
                      alt={item.imgalt}
                      title={item.imgalt}
                      itemProp="image"
                    />
                  </a>
                </div>
                <h3>
                  <a href={`${item.link}`} dangerouslySetInnerHTML={{ __html: item.title }} itemProp="url"></a>
                </h3>
              </div>
            </div>
          </Col>
        ))
      ) : (
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
              { breakpoint: 500, settings: { slidesToShow: 1.2, infinite: false, autoplay: false, arrows: false } },
            ],
          }}
        >
          <React.Fragment key=".0">
            {items?.map((item: IFeaturedArticlesItem, i: number) => (
              <div className={styles.featuredarticles} key={`${item.link + i}`}>
                <div className={styles.articlescard}>
                  <a className={styles.articlescardticker} href={`${item.link}`} itemProp="url">
                    <span itemProp="name">{item?.category[0]?.categorytitle}</span>
                  </a>
                  <div className={styles.articlescardthumb}>
                    <a href={`${item.link}`} itemProp="url">
                      <CustomImage
                        src={item.src}
                        className="imgBackground"
                        alt={item.imgalt}
                        title={item.alt}
                        itemProp="image"
                      />
                    </a>
                  </div>
                  <h3>
                    <a href={`${item.link}`} dangerouslySetInnerHTML={{ __html: item.title }} itemProp="url"></a>
                  </h3>
                </div>
              </div>
            ))}
          </React.Fragment>
        </Carousel>
      )}
    </>
  );
};
export default FeaturedArticles;
