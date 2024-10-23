import { Button } from '@components';
import { IPagelinksNavigation } from '@interfaces';
import React from 'react';
import styles from './PagelinksNavigation.module.scss';

const PagelinksNavigation = (props: IPagelinksNavigation) => {
  const { QuickLinks, isSelected, setIsSelected, links } = props;
  const getLinks = (keys: any) => {
    if (keys.toLowerCase().includes('disclaimer')) {
      return getCurrLink('disclaimer');
    } else if (keys.toLowerCase().includes('terms')) {
      return getCurrLink('terms');
    } else if (keys.toLowerCase().includes('privacy')) {
      return getCurrLink('privacy');
    } else if (keys.toLowerCase().includes('cookie')) {
      return getCurrLink('cookie');
    } else if (keys.toLowerCase().includes('faqs')) {
      return getCurrLink('faqs');
    } else {
      return '';
    }
  };

  const SelectedTab = (item: React.SetStateAction<string>) => {
    setIsSelected(item);
  };

  const getCurrLink = (key: string) => {
    let link = '';
    links?.map((item: { heading: string; link: string }) => {
      if (item?.heading.toLowerCase().includes(key)) {
        link = item?.link;
      }
    });
    return link;
  };

  return (
    <div className={`${styles.pageLinks} ${styles.MenustickyTop}`}>
      <ul>
        {QuickLinks?.map((items: { [x: string]: { heading: string } }) => {
          return Object.keys(items).map((keys, index) => {
            return (
              <li
                key={`${items[keys].heading + index}`}
                onClick={() => {
                  SelectedTab(keys);
                }}
                className="ripple_root"
              >
                <Button
                  rippleClass="primary_waves"
                  variant="link"
                  className={`${keys == isSelected ? styles.active : styles.notActive}`}
                  href={getLinks(keys)}
                >
                  {items[keys].heading}
                </Button>
              </li>
            );
          });
        })}
      </ul>
    </div>
  );
};

export default PagelinksNavigation;
