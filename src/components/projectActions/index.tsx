import { Button, ModalPopup, Modalshare, Offcanvas, OffcanvasHeading } from '@components';
import { IProjectActions } from '@interfaces';
import { downloadLink, getIconFromIconName, useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Toast, ToastContainer, ToastHeader } from 'react-bootstrap';
import styles from './projectActions.module.scss';

const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const ProjectActions = (props: IProjectActions) => {
  const {
    projectActionData,
    download = true,
    eventAnalyticsHandler,
    projectNameData = '',
    propertyType = '',
    selectedTownship = '',
  } = props;
  const [showToast, setShowToast] = useState(false);
  const [show] = useState(false);
  const [showcanvasForm, setShowCanvasForm] = useState(false);
  const [showcanvasShare, setShowCanvasShare] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const { deviceType } = useDeviceType();
  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };

  const downloadBrochure = () => {
    downloadLink(projectActionData?.downloadPDFLink ?? projectActionData?.downloadurl ?? '');
    setShowToast(true);
    setShowCanvasForm(false);
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
            Brochure Downloaded Successfully!
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <ul className={styles.projectactions}>
        {download && projectActionData?.downloadBrochure && (
          <li className={styles.hideMobile}>
            <a
              itemProp="potentialAction"
              onClick={(e) => {
                e.preventDefault();
                setShowEnquiryForm(true);
                eventAnalyticsHandler('download_brochure', projectActionData?.downloadBrochure);
              }}
              href={projectActionData?.downloadPDFLink ?? projectActionData?.downloadurl}
            >
              {getIconFromIconName('Download')}
              {projectActionData?.downloadBrochure}
            </a>
          </li>
        )}
        <li>
          <Button
            variant=""
            aria-label="icon button"
            onClick={() => {
              setShowCanvasShare(!show);
              eventAnalyticsHandler('share_plan', projectActionData?.share);
            }}
            itemProp="potentialAction"
          >
            {getIconFromIconName('Share')}
            <span itemProp="text" className="hideMobile">
              {projectActionData?.share}
            </span>
          </Button>
          {(projectActionData?.modalShare?.titleHeading || projectActionData?.modalTitle) &&
            (deviceType === 'desktop' ? (
              <ModalPopup
                show={showcanvasShare}
                onHide={handleCloseShare}
                modalSize="md"
                modalTitle={projectActionData?.modalShare?.titleHeading ?? projectActionData?.modalTitle ?? ''}
                modalBody={<Modalshare modalShare={projectActionData?.modalShare || projectActionData} />}
              />
            ) : (
              <Offcanvas
                placement="bottom"
                show={showcanvasShare}
                onHide={handleCloseShare}
                bodySpacing={true}
                header={
                  <h2 itemProp="headline">
                    {projectActionData?.modalShare?.titleHeading ?? projectActionData?.modalTitle}
                  </h2>
                }
              >
                <Modalshare modalShare={projectActionData?.modalShare || projectActionData} />
              </Offcanvas>
            ))}
        </li>
        {projectActionData?.downloadBrochure && (
          <li className={styles.hideDesktop}>
            <Button
              variant="link"
              aria-label="icon button"
              className="px-0"
              onClick={() => {
                setShowCanvasForm(!showcanvasForm);
              }}
              itemProp="potentialAction"
            >
              <span className={styles.threeDot}>{getIconFromIconName('ThreeDot')}</span>
            </Button>
            {deviceType !== 'desktop' && (
              <Offcanvas
                placement="bottom"
                showCanvas={showcanvasForm}
                onHide={() => setShowCanvasForm(false)}
                closeButton={true}
                bodySpacing={false}
                titleProps={{ className: 'mobile-offcanvas-title' }}
                header={<OffcanvasHeading itemProp="name">{projectActionData?.downloadModalTitle}</OffcanvasHeading>}
              >
                <div className={styles.downloadCanvas} itemProp="name">
                  <a
                    itemProp="potentialAction"
                    onClick={(e) => {
                      e.preventDefault();
                      eventAnalyticsHandler('download_brochure', projectActionData?.downloadBrochure);
                      setShowEnquiryForm(true);
                      setShowCanvasForm(false);
                    }}
                    href={projectActionData?.downloadPDFLink ?? projectActionData?.downloadurl}
                  >
                    {projectActionData?.downloadBrochure || projectActionData?.downloadtext}{' '}
                    {getIconFromIconName('Download')}
                  </a>
                </div>
              </Offcanvas>
            )}
          </li>
        )}
      </ul>
      {showEnquiryForm && (
        <EnquiryFormHelper
          isPopup={true}
          setShow={setShowEnquiryForm}
          showForm={showEnquiryForm}
          doubleColumn={false}
          brochureForm={true}
          propertyType={propertyType}
          projectNameData={projectNameData}
          downloadBrochure={downloadBrochure}
          selectedTownship={selectedTownship}
        />
      )}
    </>
  );
};
export default ProjectActions;
