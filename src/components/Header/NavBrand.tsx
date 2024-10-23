import { IconButton, Offcanvas, StickySearchProject } from '@components';
import { INavBrand } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import useGTM from 'src/utils/useGTM';
import Hamburger from './Hamburger';
import styles from './header.module.scss';
import Logo from './Logo';

const NavBrand = (props: INavBrand) => {
  const {
    menuData,
    buLogo,
    buLink,
    backIcon,
    handleBackIcon,
    buLogoAltText,
    pageName,
    searchData,
    reference,
    searchActive,
    isBordered = false,
  } = props;

  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const { deviceType } = useDeviceType();
  const { sendEvent } = useGTM();

  useEffect(() => {
    setMenu(true);
  }, []);

  const handleShow = () => {
    setShow(true);
    document.body.classList.add('menu-show');
  };

  const handleClose = () => {
    setShow(false);
    document.body.classList.remove('menu-show');
  };

  return (
    <>
      <div className="brand">
        {menuData && menuData.length > 0 && deviceType === 'desktop' && (
          <div
            className="menu hamburgerMenu"
            onClick={() => {
              handleShow();
              sendEvent({
                event: 'hamburger_icon',
                category: 'realty_hp',
                sub_category: 'top_navigation',
                page_type: pageName,
                click_text: 'Hamburger',
              });
            }}
          >
            <IconButton ariaLabel="hamburger menu">{getIconFromIconName('HamburgerIcon')}</IconButton>
          </div>
        )}
        {backIcon && deviceType !== 'desktop' && (
          <div className="menu backArrow" onClick={handleBackIcon}>
            <IconButton>
              <span>{getIconFromIconName('ArrowLeft')}</span>
            </IconButton>
          </div>
        )}

        {menu && (
          <Offcanvas show={show} onHide={handleClose} placement="start" className="menuOffcanvas">
            {menuData && menuData.length > 0 && deviceType === 'desktop' && (
              <Hamburger
                menuData={menuData}
                buLogo={buLogo}
                buLink={buLink}
                buLogoAltText={buLogoAltText}
                pageName={pageName}
              />
            )}
          </Offcanvas>
        )}

        {!menu && (
          <>
            <div className={`menuOffcanvas d-lg-block d-none ${styles.menu} ${show ? styles.show : ''}`}>
              <Hamburger
                menuData={menuData}
                buLogo={buLogo}
                buLink={buLink}
                buLogoAltText={buLogoAltText}
                pageName={pageName}
              />
            </div>
            {show && <div className="fade modal-backdrop show d-lg-block d-none" onClick={handleClose}></div>}
          </>
        )}

        <Logo buLogo={buLogo} buLink={buLink} buLogoAltText={buLogoAltText} />
      </div>

      {reference ? (
        <div className={searchActive ? 'd-lg-block d-none' : `${styles.defaulthidden}`} ref={reference}>
          <div className={`stickyMenu ${searchActive ? 'hidden' : ''}`}>
            <StickySearchProject searchData={searchData} />
          </div>
        </div>
      ) : (
        <div className={`stickyMenu ${isBordered ? 'searchOutline' : ''}`}>
          <StickySearchProject searchData={searchData} />
        </div>
      )}
    </>
  );
};

export default NavBrand;
