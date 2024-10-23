import { getIconFromIconName, openLink } from '@utils';
import React, { useState } from 'react';
import useGTM from 'src/utils/useGTM';
import styles from './footer.module.scss';

const FooterLink = (props: any) => {
  const { item, navHeading, pageName } = props;
  const { sendEvent } = useGTM();

  return (
    <a
      className={styles.footerLinkItem}
      rel="noreferrer noopener"
      itemProp="url"
      target={item?.target || '_self'}
      href={item?.link || item?.linkUrl}
      onClick={(e) => {
        e.preventDefault();
        sendEvent({
          event: 'bottom_navigation_menu',
          category: 'realty',
          sub_category: navHeading ? navHeading : '',
          page_type: pageName,
          click_text: item?.linkTitle ? item?.linkTitle : '',
          Label: 'footer link',
        });
        openLink(item?.link || item?.linkUrl, item?.target, e);
      }}
    >
      {item?.linkTitle}
    </a>
  );
};

const FooterDropdown = (props: any) => {
  const { navigation, pageName } = props;

  const [isActive, setIsActive] = useState<number>(-1);

  const toggleClass = (key: number) => {
    if (key === isActive) {
      setIsActive(-1);
    } else {
      setIsActive(key);
    }
  };

  return (
    navigation &&
    navigation?.items?.map((navItems: any, idx: number) => {
      return (
        <React.Fragment key={`main_navigation_parent_nav_item${navItems?.linkUrl + idx}`}>
          <li itemProp="itemListElement" className={styles.footerLink}>
            {navItems?.items?.length > 0 ? (
              <>
                <div
                  className={`${styles.footerSubLinkHeading} ${isActive === idx ? styles.active : ''}`}
                  onClick={() => {
                    toggleClass(idx);
                  }}
                >
                  {navItems?.linkTitle}
                  {getIconFromIconName('arrowdown')}
                </div>
                <ul className={`${styles.footerSubLinkList} ${isActive === idx ? 'active' : ''}`}>
                  {navItems?.items?.map((navItem: any, index: number) => (
                    <li key={`${navItem?.linkUrl + index}`} className={styles.footerSubLink}>
                      <FooterLink item={navItem} navHeading={navItems?.linkTitle} pageName={pageName} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <FooterLink item={navItems} navHeading={navigation?.linkTitle} pageName={pageName} />
            )}
          </li>
        </React.Fragment>
      );
    })
  );
};

export default FooterDropdown;
