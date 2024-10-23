import { Button, CustomImage, ModalPopup, Modalshare } from '@components';
import { ITownshipBanner } from '@interfaces';
import { downloadLink, getIconFromIconName, useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './townshipBanner.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const TownshipBanner = (props: ITownshipBanner) => {
  const { bannerData, ShantigramBanner, eventAnalyticsHandler, selectedTownship = '' } = props;
  const [show] = useState(false);
  const [showcanvasShare, setShowCanvasShare] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };
  const downloadBrochure = () => {
    downloadLink(bannerData?.projectActions?.downloadurl || '');
    setShowCanvasShare(false);
  };
  const getComponent = () => {
    if (ShantigramBanner?.isVideo == 'true') {
      if (isMobile) {
        return (
          <video
            muted
            autoPlay
            loop
            poster={ShantigramBanner?.videoposterMobile}
            className={styles.mainBanner}
            playsInline
            itemProp="video"
          >
            <source itemProp="contentUrl" src={ShantigramBanner?.videoMp4Mobile} type="video/mp4" />
            <source itemProp="contentUrl" src={ShantigramBanner?.videoOggMobile} type="video/ogg" />
            <meta itemProp="uploadDate" content={ShantigramBanner?.uploadDate} />
            <meta itemProp="thumbnailUrl" content={ShantigramBanner?.thumb} />
            <meta itemProp="description" content={ShantigramBanner?.seoDescription} />
            <meta itemProp="name" content={ShantigramBanner?.seoName} />
          </video>
        );
      } else {
        return (
          <video
            muted
            autoPlay
            loop
            poster={ShantigramBanner?.videoposter}
            className={styles.mainBanner}
            playsInline
            itemProp="video"
          >
            <source itemProp="contentUrl" src={ShantigramBanner?.videoMp4} type="video/mp4" />
            <source itemProp="contentUrl" src={ShantigramBanner?.videoOgg} type="video/ogg" />
            <meta itemProp="uploadDate" content={ShantigramBanner?.uploadDate} />
            <meta itemProp="thumbnailUrl" content={ShantigramBanner?.thumb} />
            <meta itemProp="description" content={ShantigramBanner?.seoDescription} />
            <meta itemProp="name" content={ShantigramBanner?.seoName} />
          </video>
        );
      }
    } else {
      return (
        <CustomImage
          src={ShantigramBanner?.logo}
          className={`${styles.mainBanner} "img-fluid" `}
          alt={ShantigramBanner?.logoalt}
          itemProp="image"
        />
      );
    }
  };
  return (
    <>
      <div
        className={styles.bannerWrapper}
        itemScope
        itemType="https://schema.org/VideoObject"
        key={isMobile?.toString()}
      >
        <span className={styles.imgType}>{ShantigramBanner?.imgtype}</span>
        {getComponent()}

        <div className={styles.pageheading}>
          <Container className="relative_pos">
            <ul>
              <li>
                <div className={styles.projectThumb}>
                  <CustomImage
                    src={ShantigramBanner?.thumb}
                    className="img-fluid"
                    alt={ShantigramBanner?.thumbalt}
                    itemProp="image"
                  />
                </div>
                <h1 itemProp="headline">{ShantigramBanner?.heading}</h1>
                <p itemProp="contentLocation">
                  {getIconFromIconName('LocationPin')}
                  {ShantigramBanner?.subheading}
                </p>
              </li>
              <li className={styles.ButtonSection}>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className={styles.downloadIcon}
                  onClick={() => {
                    ShantigramBanner?.heading !== '' ? setShowEnquiryForm(true) : downloadBrochure();
                    eventAnalyticsHandler('download_brochure', bannerData?.projectActions?.downloadtext);
                  }}
                  itemProp="contentUrl"
                >
                  {getIconFromIconName('Download')}
                  {bannerData?.projectActions?.downloadtext}
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className={styles.shareIcon}
                  onClick={() => {
                    setShowCanvasShare(!show);
                    eventAnalyticsHandler('share_plan', bannerData?.projectActions?.sharetext);
                  }}
                  itemProp="potentialAction"
                >
                  {getIconFromIconName('Share')}
                  {bannerData?.projectActions?.sharetext}
                </Button>
                <ModalPopup
                  show={showcanvasShare}
                  modalTitle={bannerData?.projectActions?.modalTitle}
                  onHide={handleCloseShare}
                  modalSize="md"
                  modalBody={<Modalshare modalShare={bannerData?.projectActions} />}
                />
              </li>
            </ul>
          </Container>
        </div>
      </div>
      {showEnquiryForm && (
        <EnquiryFormHelper
          isPopup={true}
          setShow={setShowEnquiryForm}
          showForm={showEnquiryForm}
          doubleColumn={false}
          brochureForm={true}
          downloadBrochure={downloadBrochure}
          selectedTownship={selectedTownship}
        />
      )}
    </>
  );
};
export default TownshipBanner;
