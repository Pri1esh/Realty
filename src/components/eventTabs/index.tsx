import { Carousel, CustomImage } from '@components';
import { IEventTabGalleryData, IEventTabs } from '@interfaces';
import React, { useState } from 'react';
import { Figure, Modal } from 'react-bootstrap';
import styles from './eventTabs.module.scss';
const EventTabs = (props: IEventTabs) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.eventTab}>
      <div className={styles.card}>
        <div
          className={styles.cardthumb}
          onClick={() => {
            setShow(!show);
          }}
          itemProp="potentialAction"
        >
          <Figure>
            <CustomImage
              src={props.src ? props.src : ''}
              alt={props.imgalt ? props.imgalt : 'Adani Realty'}
              title={props.imgtitle}
              itemProp="image"
              className="imgBackground"
            />
            <span>{props.imgtype}</span>
          </Figure>
          <div className={styles.cardName} itemProp="headline">
            {props.title}
          </div>
        </div>
      </div>

      <Modal
        className={`${styles.galleryCarousel} eventCarousel`}
        show={show}
        fullscreen={true}
        onHide={() => setShow(!show)}
      >
        <div className={styles.galleryModal}>
          <a
            href="javascript: void(0)"
            itemProp="potentialAction"
            className={styles.closeModal}
            onClick={() => setShow(!show)}
          ></a>
          <Modal.Header bsPrefix={styles.modalHeader}>
            <Modal.Title itemProp="headline">{props.title}</Modal.Title>
          </Modal.Header>

          <div className={styles.galleryContent}>
            <Carousel
              className=""
              classes=""
              settings={{
                arrows: true,
                autoplay: false,
                autoplaySpeed: 2000,
                dots: false,
                infinite: false,
                pauseOnHover: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                speed: 500,
                swipe: true,
                lazyLoad: 'progressive',
                responsive: [
                  {
                    breakpoint: 1199,
                    settings: { slidesToShow: 1, arrows: true },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 1 },
                  },
                  {
                    breakpoint: 500,
                    settings: { slidesToShow: 1, infinite: false, autoplay: false },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {props?.galleryData?.map((item: IEventTabGalleryData, index: number) => (
                  <div className={styles.eventGalleryCarousel} key={`${(item.src ?? '') + index}`}>
                    <div className={styles.eventGalleryContainer}>
                      {item.imgType && <span>{item.imgType}</span>}
                      <CustomImage
                        src={item.src ? item.src : ''}
                        alt={item.imgalt}
                        className={styles.galleryImg}
                        itemProp="image"
                      />
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
export default EventTabs;
