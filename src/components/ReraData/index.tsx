import { CustomImage, IconButton, ModalPopup, Offcanvas } from '@components';
import { IReraDataComponent, IReraModalData } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import React, { useState } from 'react';
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './reradata.module.scss';

const ReraData = (props: IReraDataComponent) => {
  const { deviceType } = useDeviceType();
  const { reraInfo, projectType, pageUrl } = props;
  const { sendEvent } = useGTM();
  const [show] = React.useState(false);
  const [showcanvasShare, setShowCanvasShare] = React.useState(false);
  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };
  const [showToast, setShowToast] = useState(false);

  const reraData = reraInfo?.reraModal || reraInfo?.rera;
  const heading = reraInfo?.reraHeading || reraInfo?.modalTitle;

  const eventAnalyticsHandler = (event: string, clickedText: string) => {
    const eventVal = {
      event: event,
      category: 'realty',
      sub_category: 'rera_certificate',
      project_type: projectType,
      page_type: pageUrl,
      click_text: clickedText,
    };
    sendEvent(eventVal);
  };

  return (
    <>
      <ToastContainer className={`position-fixed ${styles.toastContainer}`} position={'top-center'}>
        <Toast
          className={styles.toast}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide={true}
        >
          <ToastHeader className={styles.toastHeader} closeButton={false}>
            {reraInfo?.downloadRera || 'RERA Certificate Downloaded Successfully!'}
          </ToastHeader>
        </Toast>
      </ToastContainer>
      {reraInfo?.reraHeading && (
        <a
          className={styles.heading}
          onClick={() => {
            setShowCanvasShare(!show);
          }}
        >
          {reraInfo?.reraHeading}
          <IconButton>{getIconFromIconName('arrowdown')}</IconButton>
        </a>
      )}
      {!reraInfo?.reraHeading && (
        <div itemProp="disambiguatingDescription" className={styles.reraInfo}>
          <div className={styles.multiRera}>
            <a href={reraInfo?.reraWebsiteLink} target="_blank" rel="noreferrer">
              {reraInfo?.reraWebsite}
            </a>{' '}
            <b className="d-lg-inline d-none">| </b>
            <span
              itemProp="about"
              onClick={() => {
                setShowCanvasShare(!show);
              }}
            >
              {reraInfo?.reranumber}
            </span>{' '}
            <strong
              itemProp="identifier"
              onClick={() => {
                setShowCanvasShare(!show);
              }}
            >
              {reraInfo?.reraNumber}
            </strong>
            <IconButton
              onClick={() => {
                setShowCanvasShare(!show);
              }}
            >
              {getIconFromIconName('arrowdown')}
            </IconButton>
          </div>
        </div>
      )}
      {deviceType === 'desktop' ? (
        <ModalPopup
          className={styles.reraModalWrapper}
          show={showcanvasShare}
          onHide={handleCloseShare}
          modalSize="lg"
          modalTitle={heading || ''}
          modalBody={reraData?.map((data: IReraModalData, key: number) => (
            <div key={`${'reraNo' + key}`} className={styles.reraModal}>
              <a
                onClick={() => eventAnalyticsHandler('rera_certificate_view', data?.url || data?.title || '')}
                href={data?.reraWebsiteLink || data?.titleLink}
                target="_blank"
                rel="noreferrer"
              >
                {data?.url || data?.title}
              </a>{' '}
              <br />
              <a
                onClick={() => {
                  setShowToast(true);
                  eventAnalyticsHandler(
                    'rera_certificate_download',
                    `${reraInfo?.reranumber || data?.reraTitle}${data?.reraid || data?.reraNumber}`,
                  );
                }}
                href={data?.downloadLink || data?.downloadurl}
                download
              >
                <p>
                  {reraInfo?.reranumber || data?.reraTitle} <strong>{data?.reraid || data?.reraNumber}</strong>
                </p>
                <span>
                  <IconButton>{getIconFromIconName('Download')}</IconButton>
                </span>
              </a>
              {data?.qrCodeImage && <CustomImage className="imgBackground" src={data?.qrCodeImage} />}
            </div>
          ))}
        />
      ) : (
        <Offcanvas
          placement="bottom"
          showCanvas={showcanvasShare}
          bodySpacing={false}
          onHide={() => setShowCanvasShare(false)}
          header={<h2>{heading}</h2>}
        >
          {reraData?.map((data: IReraModalData, key: number) => (
            <div key={`${'reraNo' + key}`} className={styles.reraModal}>
              <a href={data?.reraWebsiteLink || data?.titleLink} target="_blank" rel="noreferrer">
                {data?.url || data?.title}
              </a>
              <a
                itemProp="potentialAction"
                onClick={() => setShowToast(true)}
                href={data?.downloadLink || data?.downloadurl}
                download
              >
                {reraInfo?.reranumber}
                <strong itemProp="identifier">{data?.reraid || data?.reraNumber}</strong>
                <IconButton>{getIconFromIconName('Download')}</IconButton>
              </a>
              {data?.qrCodeImage && <CustomImage className="imgBackground" src={data?.qrCodeImage} />}
            </div>
          ))}
        </Offcanvas>
      )}
    </>
  );
};

export default ReraData;
