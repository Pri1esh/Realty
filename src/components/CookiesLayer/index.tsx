import { Button, IconButton, Offcanvas } from '@components';
import { ICookiesLayer } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import styles from './cookiesLayer.module.scss';

const CookiesContent = (props: { setshowDecline: any; cookieHandler: any }) => {
  const { setshowDecline, cookieHandler } = props;

  return (
    <div className={styles.cookiesContent}>
      <p>Kindly accept cookies and continue using our website for a smoother experience.</p>
      <div>
        <Button rippleClass="primary_waves" variant="link" onClick={() => setshowDecline(false)}>
          Decline
        </Button>
        <Button rippleClass="primary_waves" variant="secondary" onClick={() => cookieHandler()}>
          Accept Cookies
        </Button>
      </div>
    </div>
  );
};
const CookiesLayer = (props: ICookiesLayer) => {
  const { deviceType } = useDeviceType();
  const { cookieHandler, setshowDecline } = props;

  return (
    <>
      {deviceType === 'desktop' ? (
        <div className={styles.cookiesLayer}>
          <div className={styles.closeIcon}>
            <IconButton onClick={() => cookieHandler()}>{getIconFromIconName('Close')}</IconButton>
          </div>
          <h3>This website uses cookies</h3>
          <CookiesContent setshowDecline={setshowDecline} cookieHandler={cookieHandler} />
        </div>
      ) : (
        <Offcanvas
          show={true}
          onHide={() => cookieHandler()}
          placement="bottom"
          closeButton={true}
          backdrop="static"
          title="This website uses cookies"
        >
          <CookiesContent setshowDecline={setshowDecline} cookieHandler={cookieHandler} />
        </Offcanvas>
      )}
    </>
  );
};

export default CookiesLayer;
