/* eslint-disable no-prototype-builtins */
import { CustomImage } from '@components';
import { IHamburger } from '@interfaces';
import { getIconFromIconName, openLink, timeout, useRipple } from '@utils';
import React, { useState } from 'react';
import useGTM from 'src/utils/useGTM';
import CollapsePanel from './CollapsePanel';
import styles from './header.module.scss';

const WrapperMenu = (data: any) => {
  const menuData: any[] = [];
  const menuItem = data[0];

  menuItem &&
    Object.keys(menuItem)?.length > 0 &&
    Object.keys(menuItem).forEach(function (k) {
      const menuItemObject = {
        sectionHeader: menuItem?.[k]?.[0]?.['headerText'],
        sectionLeftIcon: menuItem?.[k]?.[0]?.['headerLeftIcon'],
        sectionItems: menuItem?.[k]?.[0]?.['items'],
        collapseItems: menuItem?.[k]?.[0]?.['collapseItems'],
      };
      menuData.push(menuItemObject);
    });

  return menuData;
};

const Hamburger = (props: IHamburger) => {
  const { menuData, buLogo, buLink, buLogoAltText = '', pageName = '' } = props;
  const [allMenuData, setAllMenuData] = useState(WrapperMenu([...menuData]));
  const { createRipple } = useRipple();
  const { sendEvent } = useGTM();
  const collapseAll = () => {
    return new Promise((resolve, reject) => {
      try {
        const allDataItems: any = [...allMenuData];
        const finalData = allDataItems?.map((data: any) => {
          if (data.hasOwnProperty('isOpen')) {
            data.isOpen = false;
          }
          if (data.hasOwnProperty('sectionItems')) {
            if (data?.sectionItems !== undefined) {
              const finalSection = data.sectionItems.map((sectionItem: any) => {
                if (sectionItem.hasOwnProperty('isOpen')) {
                  sectionItem.isOpen = false;
                }
                return sectionItem;
              });
              data.sectionItems = finalSection;
            }
          }
          if (data.hasOwnProperty('collapseItems')) {
            if (data?.collapseItems !== undefined) {
              data.isOpen = false;
            }
          }
          return data;
        });

        resolve(finalData);
      } catch (error: any) {
        reject(new Error(error));
      }
    });
  };

  const onCollapseClicked = async (sectionHeader: any, itemText: string, isOpen1: boolean) => {
    try {
      await collapseAll().then((allDataItems: any) => {
        const sectionDataIndex = allDataItems.findIndex((filter: any) => filter.sectionHeader === sectionHeader);

        const sectionItemIndex = allDataItems[sectionDataIndex].sectionItems.findIndex(
          (filter: any) => filter.itemText === itemText,
        );
        try {
          allDataItems[sectionDataIndex].sectionItems[sectionItemIndex] = {
            ...allDataItems[sectionDataIndex].sectionItems[sectionItemIndex],
            isOpen: !isOpen1,
          };
        } catch (error) {
          allDataItems[sectionDataIndex].sectionItems[sectionItemIndex] = {
            ...allDataItems[sectionDataIndex].sectionItems[sectionItemIndex],
            isOpen: !allDataItems[sectionDataIndex].sectionItems[sectionItemIndex]?.isOpen,
          };
        }
        setAllMenuData(allDataItems);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onCollapseParentClicked = async (itemText: string, isOpen: boolean) => {
    try {
      await collapseAll().then((allDataItems: any) => {
        const sectionDataIndex = allDataItems.findIndex((filter: any) => filter.sectionHeader === itemText);
        try {
          allDataItems[sectionDataIndex].isOpen = !isOpen;
        } catch (error) {
          allDataItems[sectionDataIndex].isOpen = !allDataItems[sectionDataIndex].isOpen;
        }
        setAllMenuData(allDataItems);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.hamburger}>
      <div className="sidenav" itemScope itemType="http://schema.org/SiteNavigationElement">
        {allMenuData?.map((data: any, index: number) => {
          let Parenttype = 'section_item';
          if (data?.collapseItems && data?.collapseItems?.length > 0) {
            Parenttype = 'collapse';
          }
          return (
            // Adani business dropdown
            <React.Fragment key={`${'hamburger_key_' + index}`}>
              {Parenttype === 'collapse' && (
                <div className={`${styles.hamburgerSection} single_item`}>
                  <CollapsePanel
                    pageName={pageName}
                    sectionItem={{
                      itemText: data.sectionHeader,
                      isOpen: false,
                      itemLeftIcon: data.sectionLeftIcon,
                      ...data,
                    }}
                    onClappseClick={() => {
                      onCollapseParentClicked(data.sectionHeader, data?.isOpen);
                    }}
                  />
                </div>
              )}
              {Parenttype === 'section_item' && data?.sectionItems && data?.sectionItems.length > 0 && (
                <>
                  {/* section */}
                  <div className={styles.hamburgerSection}>
                    <h5 itemProp="headline">{data.sectionHeader}</h5>
                    <ul itemScope itemType="https://schema.org/ItemList">
                      {data?.sectionItems.map((sectionItem: any, sectionIndex: number) => (
                        <React.Fragment key={`${sectionItem?.itemLink + sectionIndex}`}>
                          {!sectionItem?.itemComponent &&
                            (!sectionItem?.collapseItems ||
                              (sectionItem?.collapseItems && sectionItem?.collapseItems?.length === 0)) && (
                              <li itemProp="itemListElement">
                                {/* Links witjout dropdown */}
                                <a
                                  href={sectionItem?.itemLink}
                                  itemProp="url"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    sendEvent({
                                      event: 'hamburger_option_select',
                                      category: 'realty_hp',
                                      sub_category: 'top_navigation',
                                      page_type: pageName,
                                      click_text: sectionItem?.itemText ? sectionItem?.itemText : '',
                                      label: sectionItem?.itemText ? sectionItem?.itemText : '',
                                    });
                                    createRipple(e);
                                    timeout(function () {
                                      openLink(sectionItem?.itemLink, sectionItem?.target, e);
                                    }, 500);
                                  }}
                                  className="menu_item"
                                >
                                  <span className="iconBox">{getIconFromIconName(sectionItem?.itemLeftIcon)}</span>
                                  <label itemProp="name">{sectionItem?.itemText}</label>
                                </a>
                              </li>
                            )}
                          {sectionItem?.collapseItems && sectionItem?.collapseItems?.length > 0 && (
                            <li itemProp="url">
                              {/* multiple collapse dropdowns */}
                              <CollapsePanel
                                pageName={pageName}
                                sectionItem={sectionItem}
                                onClappseClick={() => {
                                  onCollapseClicked(data?.sectionHeader, sectionItem.itemText, sectionItem?.isOpen);
                                }}
                              />
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </React.Fragment>
          );
        })}

        <footer itemScope itemType="http://schema.org/Brand">
          <a itemProp="url" href={buLogo ? buLink : '#'}>
            <CustomImage itemProp="image" src={buLogo ? buLogo : ''} alt={buLogoAltText} />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Hamburger;
