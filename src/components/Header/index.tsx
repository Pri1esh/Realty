import { IHeader } from '@interfaces';
import { useDeviceType } from '@utils';
import classnames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './header.module.scss';
import NavBar from './NavBar';
import TopBar from './TopBar';

const Header: FC<IHeader> = (props) => {
  const {
    isAbsolute = false,
    isStatic = false,
    addOnClass,
    buLogo,
    buLink,
    buLogoAltText = '',
    buPrimaryNavCallback,
    navData,
    topbarList,
    menuData,
    scrollOnAbsolute = false,
    stopHeaderAnimate = false,
    waitForSticky = true,
    searchData,
    reference,
    searchActive,
    isBordered,
  } = props;

  const [pageName, setPageName] = useState<string>('');
  const { deviceType } = useDeviceType();
  const [topNavHeight, setTopNavHeight] = useState<string | number>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path =
        window.location.pathname.includes('/') &&
        window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
      setPageName(path || 'home');
    }
  }, []);

  useEffect(() => {
    const topNav: any = document.getElementsByClassName('topNav');
    const mainNav: any = document.getElementsByClassName('mainNav')[0];
    const navPosition = mainNav.getBoundingClientRect().y + mainNav.offsetHeight;
    document.addEventListener('scroll', () => {
      scrollFunction(navPosition);
    });

    if (topNav[0] && !topNavHeight) {
      setTopNavHeight(topNav[0]?.offsetHeight ? `-${topNav[0].offsetHeight}px` : 0);
    }

    return () => {
      document.removeEventListener('scroll', () => {
        scrollFunction(mainNav.getBoundingClientRect.y + mainNav.offsetHeight);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType, waitForSticky, isAbsolute, scrollOnAbsolute]);

  const scrollFunction = (mainNavPosition: number) => {
    const mainHeaderParent = document.getElementsByClassName('headerMain');

    if (mainHeaderParent && mainHeaderParent.length > 0) {
      const mainHeader = mainHeaderParent[0];
      if (isAbsolute) {
        if (waitForSticky) {
          if (document.documentElement.scrollTop >= mainNavPosition) {
            mainHeader.classList.add('sticky');
          } else {
            mainHeader.classList.remove('sticky');
          }
        } else {
          if (document.documentElement.scrollTop > 0) {
            mainHeader.classList.add('sticky');
          } else {
            mainHeader.classList.remove('sticky');
          }
        }
      } else {
        if (document.documentElement.scrollTop > 0 && !isStatic) {
          mainHeader.classList.add('borderBottom');
        } else {
          mainHeader.classList.remove('borderBottom');
        }
      }
    }
  };

  function checkAbsolute() {
    if (isAbsolute) {
      return 'floatingHeader';
    } else if (isStatic) {
      return 'static';
    } else {
      return 'sticky';
    }
  }

  return (
    <header
      className={`headerMain ${styles.headerWrapper} ${checkAbsolute()}  ${classnames({
        scrollOnAbsolute: scrollOnAbsolute,
        noAnimate: stopHeaderAnimate,
      })} ${addOnClass}`}
      {...(isAbsolute && {
        style: { '--top-nav-height': topNavHeight || 0 } as React.CSSProperties,
      })}
    >
      <Container fluid>
        <TopBar topbarList={topbarList} pageName={pageName} />
        <NavBar
          navData={navData}
          menuData={menuData}
          buLogo={buLogo}
          buLogoAltText={buLogoAltText}
          buLink={buLink}
          buPrimaryNavCallback={buPrimaryNavCallback}
          pageName={pageName}
          searchData={searchData}
          reference={reference}
          searchActive={searchActive}
          isBordered={isBordered}
        />
      </Container>
    </header>
  );
};

export default Header;
