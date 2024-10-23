import { Carousel, CustomImage } from '@components';
import { IGalleryDataItem, INewsCoverage } from '@interfaces';
import { getIconFromIconName, openPDFInBrowser } from '@utils';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './MediaCoverageTile.module.scss';

const MediaCoverageTile = (props: INewsCoverage) => {
  const [show, setShow] = useState(false);
  const { data, galleryData, id } = props;
  const [activeTab, setActiveTab] = React.useState<any>(0);

  return (
    <>
      <div
        className={styles.blockMedia}
        onClick={() => {
          if (data?.pdfSrc) return;
          setActiveTab(id);
          setShow(!show);
        }}
      >
        <div className={`${styles.blockMediaThumb} ${data?.pdfSrc ? styles.pdfWrapper : ''}`}>
          {data?.pdfSrc ? (
            <a
              href={data?.pdfSrc}
              target="_blank"
              onClick={(e: any) => {
                e.preventDefault();
                data?.pdfSrc && openPDFInBrowser(data?.pdfSrc);
              }}
            >
              <p className={styles.tag}>PDF {getIconFromIconName('pdficon')}</p>
              <CustomImage
                itemProp="primaryImageOfPage"
                src={data?.posterSrc}
                className="imgBackground"
                alt={data?.posterAlt}
              />
            </a>
          ) : (
            <CustomImage
              itemProp="primaryImageOfPage"
              src={data?.posterSrc}
              className="imgBackground"
              alt={data?.posterAlt}
            />
          )}
        </div>
        <div className={styles.blockMediaDescription}>
          <h3>{data.title}</h3>
          <p>{data.date}</p>
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
            <Modal.Title itemProp="headline">{data?.modalTitle}</Modal.Title>
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
                infinite: true,
                pauseOnHover: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                speed: 500,
                swipe: true,
                initialSlide: activeTab,
                lazyLoad: 'progressive',
                responsive: [
                  {
                    breakpoint: 1199,
                    settings: { slidesToShow: 1, arrows: true, initialSlide: activeTab },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 1, initialSlide: activeTab },
                  },
                  {
                    breakpoint: 500,
                    settings: { slidesToShow: 1, autoplay: false, initialSlide: activeTab },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {galleryData?.fields?.map((item: IGalleryDataItem, index: number) => (
                  <div className={styles.eventGalleryCarousel} key={`${item.posterAlt + index}`}>
                    <div className={styles.eventGalleryContainer}>
                      {item.imgType && <span>{item.imgType}</span>}
                      <CustomImage
                        src={item.posterSrc}
                        alt={item.posterAlt}
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
    </>
  );
};

export default MediaCoverageTile;
