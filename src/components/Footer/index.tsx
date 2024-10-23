import { IFooter } from '@interfaces';
import { getIconFromIconName, openLink, useDeviceType, useRipple } from '@utils';
import React, { FC, useEffect, useState } from 'react';
import useGTM from 'src/utils/useGTM';
import FooterDropdown from './FooterDropdown';
import PreFooter from './PreFooter';
import styles from './footer.module.scss';

const Footer: FC<IFooter> = ({
  seoContents,
  mainNavigations,
  socialLinks,
  download,
  copyRight,
  contactus,
  buCopyright = '',
  largeFooter = true,
  quickLinks,
}) => {
  const [pageName, setPageName] = useState('');
  const [isActive, setActive] = useState(-1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path =
        window.location.pathname.includes('/') &&
        window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
      setPageName(path || 'home');
    }
  }, []);

  const footerRes = {
    seoContents,
    mainNavigations,
    socialLinks,
    download,
    copyRight,
    contactus,
    quickLinks,
  };

  const { createRippleParam } = useRipple();
  const { deviceType } = useDeviceType();
  const { sendEvent } = useGTM();

  const toggleClass = (key: number) => {
    if (key === isActive) {
      setActive(-1);
    } else {
      setActive(key);
    }
  };

  return (
    <div className={styles.footerRealty}>
      <footer
        className={`footer_wrapper ${styles.footerWrapper} `}
        itemScope
        itemType="https://schema.org/WPFooter"
        auto-id="data_footer"
      >
        <div itemScope itemType="http://schema.org/SiteNavigationElement" className="container">
          {deviceType !== 'mobile' &&
            footerRes?.mainNavigations?.[0] &&
            footerRes?.mainNavigations?.[0].isSeoFooter && <PreFooter compData={footerRes?.mainNavigations?.[0]} />}

          {largeFooter && (
            <ul itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList" className={styles.footerNav}>
              {footerRes?.mainNavigations &&
                footerRes?.mainNavigations?.map((navigation: any, index: number) => {
                  return (
                    <React.Fragment key={`main_navigation_parent_${navigation?.heading + index}`}>
                      {deviceType !== 'mobile' && footerRes?.mainNavigations?.[index]?.isSeoFooter ? (
                        <></>
                      ) : (
                        <li itemProp="itemListElement" className={styles.footerNavGrid}>
                          <div
                            itemProp="name"
                            className={`${styles.footerLinkHeading} ${
                              isActive == index && deviceType !== 'desktop' ? styles.active : ''
                            }`}
                            onClick={(e) => {
                              {
                                deviceType !== 'desktop' && createRippleParam(e, 'primary_waves');
                              }
                              toggleClass(index);
                            }}
                          >
                            {navigation?.heading}
                            {getIconFromIconName('arrowdown')}
                          </div>
                          <ul
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ItemList"
                            className={`${styles.footerLinkList} ${
                              isActive == index && deviceType !== 'desktop' ? 'active' : ''
                            }`}
                          >
                            <FooterDropdown key={deviceType?.toString()} navigation={navigation} pageName={pageName} />
                          </ul>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
            </ul>
          )}

          {largeFooter && (
            <div className={styles.socialLinkWrapper}>
              <ul
                className={styles.socialLinkList}
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {footerRes?.socialLinks &&
                  footerRes?.socialLinks?.length > 0 &&
                  footerRes?.socialLinks[0].items.map((ite: any, idx: number) => {
                    return (
                      <li itemProp="itemListElement" key={`footer_link_social_link_${ite.linkUrl + idx}`}>
                        <a
                          itemProp="url"
                          rel="noreferrer noopener"
                          href={ite.linkUrl}
                          target={ite.target}
                          aria-label="social-link"
                          onClick={(e: any) => {
                            e.preventDefault();
                            openLink(ite?.linkUrl, ite?.target, e);
                            sendEvent({
                              event: 'social_share',
                              category: 'realty',
                              sub_category: ite?.linkTitle ? ite?.linkTitle : '',
                              page_type: pageName,
                              click_text: ite?.linkTitle ? ite?.linkTitle : '',
                            });
                          }}
                        >
                          {getIconFromIconName(ite?.itemicon)}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          <div className={styles.footerCopyright}>
            <ul
              className={styles.copyrightLinksList}
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <li itemProp="itemListElement">
                &copy;
                {` ${buCopyright}`}
              </li>

              {footerRes?.copyRight &&
                footerRes?.copyRight?.length > 0 &&
                footerRes?.copyRight[0].items.map((ite: any, idx: number) => {
                  return (
                    <li
                      itemProp="itemListElement"
                      key={`footer_link_copyright_${ite.linkUrl + idx}`}
                      data-auto-id={ite?.autoId}
                    >
                      <a itemProp="url" href={ite.linkUrl} target={ite.target && ite.target !== '' ? ite.target : null}>
                        {ite.linkTitle}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
