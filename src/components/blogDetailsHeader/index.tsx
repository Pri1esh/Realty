import { Button, ModalPopup, Modalshare, SectionHeader } from '@components';
import { IModalShare } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import styles from './blogDetailsHeader.module.scss';

const BlogDetailsHeader = (props: IModalShare) => {
  const { modalShare } = props;
  const [show] = useState(false);
  const [showcanvasShare, setShowCanvasShare] = useState(false);
  const { deviceType } = useDeviceType();

  const handleCloseShare = () => {
    setShowCanvasShare(false);
  };

  return (
    <div>
      {deviceType === 'desktop' ? (
        <div className={styles.blogDetails}>
          <ul>
            <li>
              <Button
                variant=""
                aria-label="icon button"
                className="px-0"
                onClick={() => {
                  setShowCanvasShare(!show);
                }}
              >
                {getIconFromIconName('Share')}
                <span className={styles.btnText}>Share</span>
              </Button>
              <ModalPopup
                show={showcanvasShare}
                onHide={handleCloseShare}
                modalSize="md"
                modalTitle={modalShare?.titleHeading ?? ''}
                modalBody={<Modalshare modalShare={modalShare} />}
              />
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className={styles.blogDetails}>
            <ul>
              <li>
                <SectionHeader heading="Communication Corner" />
              </li>
              <li>
                <Button
                  variant=""
                  aria-label="icon button"
                  className="px-0"
                  onClick={() => {
                    setShowCanvasShare(!show);
                  }}
                >
                  {getIconFromIconName('Share')}
                </Button>
                <Offcanvas placement="bottom" show={showcanvasShare} onHide={handleCloseShare}>
                  <Offcanvas.Header closeButton>
                    <h2>{modalShare?.titleHeading}</h2>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Modalshare modalShare={modalShare} />
                  </Offcanvas.Body>
                </Offcanvas>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetailsHeader;
