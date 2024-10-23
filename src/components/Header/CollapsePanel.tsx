import { ICollapsePanel } from '@interfaces';
import { getIconFromIconName, openLink, timeout, useRipple } from '@utils';
import React, { FC, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import useGTM from 'src/utils/useGTM';
import styles from './header.module.scss';

const CollapsePanel: FC<ICollapsePanel> = ({ sectionItem, onClappseClick, pageName }) => {
  const [openChild, setOpenChild] = useState('');

  const { sendEvent } = useGTM();
  const handleChildOpen = (val: any) => {
    if (val === openChild) {
      return setOpenChild('');
    }
    return setOpenChild(val);
  };

  const { createRipple } = useRipple();
  return (
    <>
      {sectionItem?.collapseItems && (
        <>
          {/* Property Types */}
          <div
            role="button"
            className="menu_item"
            onClick={(e) => {
              createRipple(e);
              onClappseClick();
              setOpenChild('');
              sendEvent({
                event: 'hamburger_option_select',
                category: 'realty_hp',
                sub_category: 'top_navigation',
                page_type: pageName,
                click_text: sectionItem?.itemText ? sectionItem?.itemText : '',
                label: sectionItem?.itemText ? sectionItem?.itemText : '',
              });
            }}
            aria-controls={sectionItem?.itemText.toLowerCase().split(' ').join('_')}
            aria-expanded={!!sectionItem?.isOpen}
          >
            <span className="iconBox">{getIconFromIconName(sectionItem?.itemLeftIcon)}</span>
            <label> {sectionItem?.itemText}</label>
            <span className={styles.icon}>{getIconFromIconName('arrowdown')}</span>
          </div>
          <Collapse
            in={sectionItem?.isOpen}
            onEntered={() => {
              document.querySelector("ul:not(.submenu) > li > .menu_item[aria-expanded='true']") &&
                document
                  .querySelector("ul:not(.submenu) > li > .menu_item[aria-expanded='true']")
                  ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ul
              itemScope
              itemType="https://schema.org/ItemList"
              className="submenu"
              id={sectionItem?.itemText.toLowerCase().split(' ').join('_')}
            >
              {sectionItem?.collapseItems.map((collapseItem: any, collapseIndex: number) => {
                const isSelected = collapseItem?.itemText.toLowerCase().includes('realty');
                return (
                  <React.Fragment key={`${collapseItem?.itemText + collapseIndex}`}>
                    <li itemProp="itemListElement">
                      {/* Cities */}
                      {collapseItem?.collapseItems ? (
                        <div
                          role="button"
                          className={`menu_item ${isSelected ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (collapseItem?.itemLink) {
                              createRipple(e);
                              if (typeof window !== 'undefined') {
                                timeout(function () {
                                  openLink(collapseItem?.itemLink, collapseItem?.target, e);
                                }, 500);
                              }
                            } else {
                              handleChildOpen(collapseItem?.itemText);
                              createRipple(e);
                            }
                            sendEvent({
                              event: 'hamburger_option_select',
                              category: 'realty_hp',
                              sub_category: 'top_navigation',
                              page_type: pageName,
                              click_text:
                                sectionItem?.itemText && collapseItem?.itemText
                                  ? sectionItem?.itemText + '/' + collapseItem?.itemText
                                  : '',
                              label: collapseItem?.itemText ? collapseItem?.itemText : '',
                            });
                          }}
                          aria-controls={collapseItem?.itemText.toLowerCase().split(' ').join('_')}
                          aria-expanded={openChild === collapseItem?.itemText ? true : false}
                        >
                          <span className="iconBox">{getIconFromIconName(collapseItem?.itemLeftIcon)}</span>
                          <label itemProp="name">{collapseItem?.itemText}</label>
                          {collapseItem?.collapseItems && collapseItem?.collapseItems.length > 0 && (
                            <span className={styles.icon} onClick={() => handleChildOpen(collapseItem?.itemText)}>
                              {getIconFromIconName('arrowdown')}
                            </span>
                          )}
                          {isSelected && <span className={styles.tick}>{getIconFromIconName('Tick')}</span>}
                        </div>
                      ) : (
                        <a
                          rel={collapseItem?.target == '_blank' ? 'noopener noreferrer' : ''}
                          className={`menu_item ${isSelected ? 'active' : ''}`}
                          href={collapseItem.itemLink}
                          onClick={(e) => {
                            e.preventDefault();
                            if (collapseItem?.itemLink) {
                              createRipple(e);
                              if (typeof window !== 'undefined') {
                                timeout(function () {
                                  openLink(collapseItem?.itemLink, collapseItem?.target, e);
                                }, 500);
                              }
                            } else {
                              handleChildOpen(collapseItem?.itemText);
                              createRipple(e);
                            }
                            sendEvent({
                              event: 'hamburger_option_select',
                              category: 'realty_hp',
                              sub_category: 'top_navigation',
                              page_type: pageName,
                              click_text:
                                sectionItem?.itemText && collapseItem?.itemText
                                  ? sectionItem?.itemText + '/' + collapseItem?.itemText
                                  : '',
                              label: collapseItem?.itemText ? collapseItem?.itemText : '',
                            });
                          }}
                          aria-controls={collapseItem?.itemText.toLowerCase().split(' ').join('_')}
                          aria-expanded={openChild === collapseItem?.itemText ? true : false}
                        >
                          <span className="iconBox">{getIconFromIconName(collapseItem?.itemLeftIcon)}</span>
                          <label itemProp="name">{collapseItem?.itemText}</label>
                          {collapseItem?.collapseItems && collapseItem?.collapseItems.length > 0 && (
                            <span className={styles.icon} onClick={() => handleChildOpen(collapseItem?.itemText)}>
                              {getIconFromIconName('arrowdown')}
                            </span>
                          )}
                          {isSelected && <span className={styles.tick}>{getIconFromIconName('Tick')}</span>}
                        </a>
                      )}
                      <Collapse
                        in={openChild === collapseItem?.itemText}
                        onEntered={() => {
                          document.querySelector(".submenu .menu_item[aria-expanded='true']") &&
                            document
                              .querySelector(".submenu .menu_item[aria-expanded='true']")
                              ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <ul
                          itemProp="itemListElement"
                          itemScope
                          itemType="https://schema.org/ItemList"
                          className="submenu"
                          id={collapseItem?.itemText.toLowerCase().split(' ').join('_')}
                        >
                          {collapseItem?.collapseItems?.map((item: any, idx: number) => {
                            return (
                              <React.Fragment key={`${item?.itemLink + idx}`}>
                                {!item?.itemComponent && (
                                  <li itemProp="itemListElement">
                                    {/* Properties */}
                                    {item?.itemLink && item?.itemLink !== '#' ? (
                                      <a
                                        rel={item?.target == '_blank' ? 'noopener noreferrer' : ''}
                                        data-href={item.itemLink}
                                        href={item?.itemLink}
                                        className={item.linkHeading ? 'linkHeading menu_item' : 'menu_item'}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          createRipple(e);
                                          if (typeof window !== 'undefined') {
                                            timeout(function () {
                                              openLink(item?.itemLink, item?.target, e);
                                            }, 500);
                                          }
                                          sendEvent({
                                            event: 'hamburger_option_select',
                                            category: 'realty_hp',
                                            sub_category: 'top_navigation',
                                            page_type: pageName,
                                            click_text: item?.itemText ? item?.itemText : '',
                                            label:
                                              sectionItem?.itemText && collapseItem?.itemText
                                                ? `${sectionItem?.itemText}/${collapseItem?.itemText}/${item?.itemText}`
                                                : item?.itemText,
                                          });
                                        }}
                                      >
                                        {item?.itemLeftIcon && (
                                          <span className="iconBox">{getIconFromIconName(item?.itemLeftIcon)}</span>
                                        )}
                                        <label itemProp="name">{item?.itemText}</label>
                                        {item?.items && item?.items.length > 0 && (
                                          <span className={styles.icon}>{getIconFromIconName('arrowdown')}</span>
                                        )}
                                      </a>
                                    ) : (
                                      <div
                                        className={`${item.linkHeading ? 'linkHeading menu_item' : 'menu_item'} ${
                                          styles.cursorDefault
                                        } `}
                                      >
                                        {item?.itemLeftIcon && (
                                          <span className="iconBox">{getIconFromIconName(item?.itemLeftIcon)}</span>
                                        )}
                                        <label className={styles.cursorDefault} itemProp="name">
                                          {item?.itemText}
                                        </label>
                                        {item?.items && item?.items.length > 0 && (
                                          <span className={styles.icon}>{getIconFromIconName('arrowdown')}</span>
                                        )}
                                      </div>
                                    )}
                                  </li>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </ul>
                      </Collapse>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </Collapse>
        </>
      )}
    </>
  );
};

export default CollapsePanel;
