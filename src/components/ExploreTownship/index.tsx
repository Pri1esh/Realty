import { Button, Carousel, CustomImage } from '@components';
import { IExploreTownship, IExploreTownshipData } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './ExploreTownship.module.scss';

const ExploreTownship = (props: IExploreTownship) => {
  const [show, setShow] = React.useState(false);
  const { exploreData, exploreTownship, seeallkeyword } = props;
  const { deviceType } = useDeviceType();
  const [activeTab, setActiveTab] = React.useState<any>(0);
  return (
    <div className={styles.TownshipCard}>
      {deviceType === 'desktop' ? (
        <div className={styles.gallery_row}>
          {exploreData.map(
            (item: IExploreTownshipData, index: number) =>
              index < 5 && (
                <div
                  className={styles.gallery_row_col}
                  data-columns={item?.dataCols}
                  key={item?.id}
                  onClick={() => {
                    const id = exploreData?.indexOf(item);
                    setActiveTab(id);
                    setShow(!show);
                  }}
                >
                  <CustomImage
                    src={item?.src ? item?.src : ''}
                    className="img-fluid imgBackground"
                    alt={item?.imgAlt}
                    itemProp="image"
                  />
                  {item?.imgtitle && <span itemProp="alternateName">{item?.imgtitle}</span>}
                </div>
              ),
          )}
          {exploreData.length > 5 && (
            <div className={styles.gallery_row_col} data-columns="6">
              <div className={styles.gallery_row_col_seeall}>
                <Button
                  onClick={() => {
                    setActiveTab(0);
                    setShow(!show);
                  }}
                  itemProp="potentialAction"
                >
                  {seeallkeyword}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.gallery_row}>
          {exploreData.map(
            (item: IExploreTownshipData, index: number) =>
              index < 4 && (
                <div
                  className={styles.gallery_row_col}
                  data-columns={item?.dataCols}
                  key={item?.id}
                  onClick={() => {
                    const id = exploreData?.indexOf(item);
                    setActiveTab(id);
                    setShow(!show);
                  }}
                >
                  <CustomImage
                    src={item?.src ? item?.src : ''}
                    className="img-fluid"
                    alt={item?.imgAlt}
                    itemProp="image"
                  />
                  {item?.imgtitle && <span itemProp="alternateName">{item?.imgtitle}</span>}
                </div>
              ),
          )}
          {exploreData.length > 4 && (
            <div className={styles.gallery_row_col} data-columns="6">
              <div className={styles.gallery_row_col_seeall}>
                <Button
                  onClick={() => {
                    setShow(!show);
                  }}
                  itemProp="potentialAction"
                >
                  {seeallkeyword}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        className={`${styles.galleryCarouselModal} eventCarousel`}
        show={show}
        fullscreen={true}
        onHide={() => setShow(!show)}
        itemProp="potentialAction"
      >
        <div className={styles.galleryModal}>
          <a href="javascript: void(0)" className={styles.closeModal} onClick={() => setShow(!show)}></a>
          <Modal.Header bsPrefix={styles.modalHeader}>
            <Modal.Title itemProp="name">{exploreTownship?.params?.ComponentTitle}</Modal.Title>
          </Modal.Header>
          <div className={styles.galleryContent}>
            <Carousel
              className=""
              settings={{
                arrows: true,
                autoplay: false,
                autoplaySpeed: 2000,
                dots: false,
                infinite: true,
                pauseOnHover: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                initialSlide: activeTab,
                speed: 500,
                swipe: true,
                accessibility: true,
                responsive: [
                  {
                    breakpoint: 1199,
                    settings: { slidesToShow: 1 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 1, initialSlide: activeTab },
                  },
                  {
                    breakpoint: 500,
                    settings: { slidesToShow: 1, infinite: true, autoplay: false, initialSlide: activeTab },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {exploreData.map((item: any, index: number) => (
                  <div className={styles.galleryCarousel} key={`${item.src + index}`}>
                    <div className={styles.galleryCarouselContainer}>
                      <CustomImage
                        src={item.src}
                        alt={item.imgAlt}
                        className={` imgBackground ${styles.galleryImg}`}
                        itemProp="image"
                      />
                      {item?.imgtitle && <span itemProp="alternateName">{item?.imgtitle}</span>}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            </Carousel>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ExploreTownship;
