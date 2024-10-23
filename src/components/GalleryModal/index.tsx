import {
  IconButton,
  ModalPopup,
  Modalshare,
  Offcanvas,
  OffcanvasHeading,
  VideoCarouselWithThumbnails,
} from '@components';
import { IGalleryModalData } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './GalleryModal.module.scss';

const GalleryModal = (props: IGalleryModalData) => {
  const [show, setShow] = React.useState(false);
  const { deviceType } = useDeviceType();
  return (
    <>
      <Modal
        className={styles.galleryCarousel}
        show={props?.show}
        fullscreen={true}
        onHide={props?.handleClose}
        backdrop={false}
      >
        <div itemProp="hasPart" className={styles.galleryModal}>
          <a
            itemProp="potentialAction"
            href="javascript: void(0)"
            className={styles.closeModal}
            onClick={props?.handleClose}
          ></a>
          <Modal.Header bsPrefix={styles.modalHeader}>
            <Modal.Title itemProp="headline" onClick={props?.handleClose}>
              {props?.title}
            </Modal.Title>
            <IconButton
              itemProp="potentialAction"
              className={styles.share}
              onClick={() => {
                setShow(!show);
              }}
            >
              {getIconFromIconName('Share')}

              <span itemProp="text">{props?.share}</span>
            </IconButton>
          </Modal.Header>

          {deviceType === 'desktop' ? (
            <ModalPopup
              className={styles.galleryShareModal}
              modalTitle="Share with friends & family"
              modalSize="md"
              show={show}
              onHide={() => {
                setShow(!show);
                props?.eventAnalyticsHandler && props?.eventAnalyticsHandler('share_plan', props?.share);
              }}
              modalBody={<Modalshare modalShare={props?.modalShare} />}
            />
          ) : (
            <Offcanvas
              placement="bottom"
              showCanvas={show}
              onHide={() => setShow(false)}
              closeButton={true}
              bodySpacing={true}
              titleProps={{ className: 'mobile-offcanvas-title' }}
              header={<OffcanvasHeading>Share with friends & family </OffcanvasHeading>}
            >
              <Modalshare modalShare={props?.modalShare} />
            </Offcanvas>
          )}
          <div itemProp="mainEntity" className={styles.galleryContent}>
            <VideoCarouselWithThumbnails
              modalslidesData={props?.videoCarouselData?.modalSlidesData}
              galleryTabs={props?.videoCarouselData?.galleryTabs}
              activeTab={props?.activeTab}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GalleryModal;
