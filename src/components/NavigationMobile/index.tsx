import { Modalshare } from '@components';
import { INavigationMobile } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import styles from './NavigationMobile.module.scss';

const NavigationMobile = (props: INavigationMobile) => {
  const {
    navigate,
    projectActionData,
    BackIcon = false,
    // downloadIcons = false,
    // shareIcons = false,
    BackIconwithText = false,
    BackIconMobileOnly = false,
    downloadandShare = false,
  } = props;
  const [show] = React.useState(false);

  const [showcanvasShare, setShowCanvasShare] = React.useState(false);
  const [showcanvasDownload, setshowcanvasDownload] = React.useState(false);
  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };
  const handleCloseForm = () => {
    setshowcanvasDownload(false);
  };
  return (
    <div className={styles.MobileNav}>
      <ul>
        {BackIcon && (
          <li>
            <a href={projectActionData?.backlink}>{getIconFromIconName('ArrowLeft')}</a>
          </li>
        )}
        {BackIconwithText && (
          <li>
            <Button variant="" href="#">
              {getIconFromIconName('ArrowLeft')}
              {navigate?.details}
            </Button>
          </li>
        )}
        {BackIconMobileOnly && (
          <li className="hideDesktop">
            <Button variant="" href="#">
              {getIconFromIconName('ArrowLeft')}
            </Button>
          </li>
        )}
        {downloadandShare && (
          <li className={`hideDesktop ${styles.mobileButtons}`}>
            <Button
              variant="link"
              onClick={() => {
                setshowcanvasDownload(!showcanvasDownload);
              }}
            >
              {getIconFromIconName('Download')}
            </Button>
            <Button
              variant=""
              className="px-0"
              onClick={() => {
                setShowCanvasShare(!show);
              }}
            >
              {getIconFromIconName('Share')}
            </Button>
            <Offcanvas placement="bottom" show={showcanvasShare} onHide={handleCloseShare}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Modalshare modalShare={projectActionData} />
              </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas placement="bottom" show={showcanvasDownload} onHide={handleCloseForm} closeButton={true}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body className={styles.formOffCanvas}>
                <div className={styles.downloadCanvas}>
                  <a href={projectActionData?.downloadurl} download>
                    {projectActionData?.downloadtext} {getIconFromIconName('Download')}
                  </a>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </li>
        )}
      </ul>
    </div>
  );
};
export default NavigationMobile;
