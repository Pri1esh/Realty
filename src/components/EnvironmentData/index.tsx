import { IconButton, ModalPopup, Offcanvas } from '@components';
import { IEnviromentComponent, IEnviromentData } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import React, { useState } from 'react';
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap';
import useGTM from 'src/utils/useGTM';
import styles from './environmentData.module.scss';

const EnvironmentData = (props: IEnviromentComponent) => {
  const [showcanvasShare, setShowCanvasShare] = React.useState(false);
  const { deviceType } = useDeviceType();
  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };
  const [showToast, setShowToast] = useState(false);
  const { envInfo, pageUrl, projectType } = props;
  const [show] = React.useState(false);
  const { sendEvent } = useGTM();

  const eventAnalyticsHandler = (event: string, clickedText: string) => {
    const eventVal = {
      event: event,
      category: 'realty',
      sub_category: 'environment_certificate',
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
            {envInfo?.downloadEnv || 'Environment Certificate Downloaded Successfully!'}
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <a
        className={styles.heading}
        onClick={() => {
          setShowCanvasShare(!show);
        }}
      >
        {envInfo?.envHeading || ''}
        <IconButton>{getIconFromIconName('arrowdown')}</IconButton>
      </a>
      {deviceType === 'desktop' ? (
        <ModalPopup
          className={styles.envModalWrapper}
          show={showcanvasShare}
          onHide={handleCloseShare}
          modalSize="lg"
          modalTitle={envInfo?.envHeading || ''}
          modalBody={envInfo?.envModal?.map((data: IEnviromentData, key: number) => (
            <div key={key} className={styles.envModal}>
              <a
                onClick={() => {
                  setShowToast(true);
                  eventAnalyticsHandler('environment_certificate_download', `${data?.envMonth}`);
                }}
                href={data?.downloadurl}
                download
              >
                <p>{data?.envMonth}</p>
                <span>
                  <IconButton>{getIconFromIconName('Download')}</IconButton>
                </span>
              </a>
            </div>
          ))}
        />
      ) : (
        <Offcanvas
          placement="bottom"
          showCanvas={showcanvasShare}
          bodySpacing={false}
          onHide={() => setShowCanvasShare(false)}
          header={<h2> {envInfo?.envHeading}</h2>}
        >
          {envInfo?.envModal?.map((data: IEnviromentData, key: number) => (
            <div key={key} className={styles.envModal}>
              <a itemProp="potentialAction" onClick={() => setShowToast(true)} href={data?.downloadurl} download>
                <p>{data?.envMonth}</p>
                <IconButton>{getIconFromIconName('Download')}</IconButton>
              </a>
            </div>
          ))}
        </Offcanvas>
      )}
    </>
  );
};

export default EnvironmentData;
