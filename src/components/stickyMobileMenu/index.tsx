import { Button, ConnectBlock, CustomImage, Offcanvas, OffcanvasHeading, SearchProject } from '@components';
import { IStickyMobileMenu } from '@interfaces';
import { timeout, useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Hamburger from '../Header/Hamburger';
import styles from './stickyMobileMenu.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const StickyMobileMenu = (props: IStickyMobileMenu) => {
  const {
    defaultActive = '',
    setOpenSearch,
    propertyType = '',
    data,
    searchData,
    hamburgerData,
    connectData,
    buLogo,
    buLink,
    buLogoAltText,
    pageName,
  } = props;
  const [activeTab, setActiveTab] = useState('');
  const [showHeader, setShowHeader] = useState(false);
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [canvasPlacement, setCanvasPlacement] = useState<any>('');
  const [heading, setHeading] = useState<string>('');
  const [component, setComponent] = useState<string>('');

  const handleClose = () => {
    setShow(false);
    timeout(() => {
      setOpenSearch && setOpenSearch(false);
    }, 500);
  };

  useEffect(() => {
    handleClick({ desc: defaultActive });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActive]);

  const ConnectMenu = connectData?.filter((menu: any) => menu.headerText === 'Connect');
  const getCurrComponent = (clickedItem: any) => {
    switch (true) {
      case clickedItem === 'Home':
        return <></>;
      case clickedItem === 'Enquire':
        return <EnquiryFormHelper isPopup={true} setShow={setShow} propertyType={propertyType} />;
      case clickedItem === 'Search':
        return (
          <div>
            <SearchProject searchProjectData={searchData} />
          </div>
        );
      case clickedItem === 'Connect':
        return <ConnectBlock canvasIsActive={setIsActive} setOpen={setShow} data={ConnectMenu} />;
      case clickedItem === 'More':
        return (
          <Hamburger
            menuData={hamburgerData}
            buLogo={buLogo}
            buLink={buLink}
            buLogoAltText={buLogoAltText}
            pageName={pageName}
          />
        );
      default:
        return <></>;
    }
  };
  const handleHeading = (clickedItem: any) => {
    switch (true) {
      case clickedItem === 'Home':
        setHeading('');
        break;
      case clickedItem === 'Enquire':
        setHeading('Enquire Now');
        break;
      case clickedItem === 'Search':
        setHeading('Search');
        break;
      case clickedItem === 'Connect':
        setHeading('Connect');
        break;
      case clickedItem === 'More':
        setHeading('');
        break;
      default:
        setHeading('');
        break;
    }
  };
  const getCanvasPlacement = (clickedItem: any) => {
    if (clickedItem === 'Home' || clickedItem === 'Enquire' || clickedItem === 'Search' || clickedItem === 'Connect') {
      return 'bottom';
    } else if (clickedItem === 'More') {
      return 'start';
    } else {
      return '';
    }
  };

  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShowHeader(document.body.getBoundingClientRect().top > scrollPos);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const { deviceType } = useDeviceType();

  const handleClick = (item: { desc: React.SetStateAction<string> }) => {
    if (item?.desc === '') return;
    setActiveTab(item.desc);
    setIsActive(false);
    item?.desc === component ? setShow(!show) : setShow(true);
    show === false && setIsActive(false);
    show === false && setComponent('');
    setComponent(item?.desc);
    setCanvasPlacement(item?.desc);
    handleHeading(item?.desc);
  };

  return (
    <div className={styles.stickyMenuWrapper}>
      {component !== 'Home' && component.toLowerCase().includes('enquire') && show && (
        <>
          <EnquiryFormHelper isPopup={true} setShow={setShow} showForm={show} propertyType={propertyType} />
        </>
      )}
      {deviceType === 'desktop' ? (
        <></>
      ) : (
        <>
          <div
            itemScope
            itemType="https://schema.org/Menu"
            className={`${styles.stickymenu} && ${showHeader ? styles.menuvisible : styles.menuhidden}`}
          >
            <ul>
              {data?.map((item: object | any, index: number) => (
                <li key={`${item.link + index}`} itemProp="hasMenuItem">
                  {item.desc === 'Home' ? (
                    <Button
                      itemProp="thumbnailUrl"
                      href={item.link}
                      onClick={() => {
                        handleClick(item);
                      }}
                      className={`${activeTab === item?.desc ? styles.active : styles.inactive}`}
                    >
                      <span>
                        <CustomImage
                          itemProp="image"
                          src={`${activeTab === item?.desc ? item?.gifsrc : item.iconsrc}`}
                          alt={item.alt}
                          title={item.title}
                        />
                      </span>
                      {item.desc}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleClick(item);
                      }}
                      className={`${activeTab === item?.desc && show ? styles.active : styles.inactive}`}
                    >
                      <span>
                        <CustomImage
                          itemProp="image"
                          src={`${activeTab === item?.desc ? item?.gifsrc : item.iconsrc}`}
                          alt={item.alt}
                          title={item.title}
                        />
                      </span>
                      {item.desc}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {component !== 'Home' && !component.toLowerCase().includes('enquire') && (
            <Offcanvas
              className={`${styles.stickyMenuOffCanvas} && ${
                isActive ? styles.offCanvasActive : styles.offCanvasHidden
              }`}
              placement={getCanvasPlacement(canvasPlacement)}
              showCanvas={show}
              onHide={() => {
                handleClose();
                setActiveTab('Home');
              }}
              closeButton={true}
              bodySpacing={true}
              titleProps={{ className: 'mobile-offcanvas-title' }}
              header={<OffcanvasHeading>{heading} </OffcanvasHeading>}
            >
              <div className={styles.canvasBody}>{getCurrComponent(component)}</div>
            </Offcanvas>
          )}
        </>
      )}
    </div>
  );
};
export default StickyMobileMenu;
