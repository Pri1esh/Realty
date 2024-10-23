import { CustomImage } from '@components';
import { IMainNav } from '@interfaces';
import { getIconFromIconName, openLink } from '@utils';
import React, { FC, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import useGTM from 'src/utils/useGTM';
import styles from './header.module.scss';

const MainNav: FC<IMainNav> = (props) => {
  const { navData, buPrimaryNavCallback, pageName } = props;
  const menuData = navData;
  const { sendEvent } = useGTM();
  const [toggle, setToggle] = useState('');
  const [toggleVal, setToggleVal] = useState('All Projects');
  const [childVal, setChildVal] = useState('');
  const [key, setKey] = useState<any>(false);

  const handleChildItem = (val: string) => {
    if (val === childVal) {
      setChildVal('');
    } else {
      setChildVal(val);
    }
  };
  const handleToggle = (val: string) => {
    setToggleVal(val);
    if (val === toggle) {
      setToggle('');
    } else {
      setToggle(val);
    }
  };
  const onChildShown = (headerText: string) => {
    menuData?.map((data: any, index: number) => {
      menuData[index] = { ...data, isOpen: data.headerText === headerText };
    });
    setKey(!key);
  };

  const defaultImg: any = useRef();
  const defaultLogo: any = useRef();

  const resetDefaultImg = () => {
    setNavProjectImage(defaultImg.current.getAttribute('data-defaultimg'));
  };

  const [navProjectImage, setNavProjectImage] = useState(null);
  const [navProjectLogo, setNavProjectLogo] = useState(null);

  const handleProjectImg = (e: any) => {
    const projectImg = e.target.getAttribute('data-imgsrc');
    const projectLogo = e.target.getAttribute('data-logosrc');
    setNavProjectImage(projectImg);
    setNavProjectLogo(projectLogo);
  };

  const resetProjectImg = () => {
    setNavProjectImage(defaultImg.current.getAttribute('data-default-img'));
    setNavProjectLogo(defaultLogo.current.getAttribute('data-default-logo'));
  };

  return (
    <>
      <div className="headerNav">
        <div className="navbarNav" itemScope itemType="http://schema.org/SiteNavigationElement">
          <div className="navbarMenu">
            {menuData?.map((data: any, index: number) => {
              let colClassName = '';
              let totalCol = 12;
              let totalLoop = [];
              if (data?.columnCount) {
                colClassName = `columns-${data?.columnCount.toString()}`;
                totalCol = totalCol / data?.columnCount;
                for (let index = 1; index <= data?.columnCount; index++) {
                  totalLoop.push(index);
                }
              } else {
                totalLoop = [1];
              }
              const subItems: any = [];

              return (
                <React.Fragment key={`navbar-nav__${data?.headerText + index}`}>
                  {data?.items && data?.items.length > 0 && (
                    <Dropdown
                      itemScope
                      itemType="https://schema.org/ItemList"
                      className={data?.fatNav ? 'navItem fatmenuDD' : 'navItem'}
                      key={`nav_item _${data?.headerText + index}`}
                      onMouseEnter={() => {
                        onChildShown(data?.headerText);
                      }}
                      onMouseLeave={() => {
                        menuData?.map((data: any, index: number) => {
                          menuData[index] = { ...data, isOpen: false };
                        });
                        setKey(!key);
                      }}
                      show={true}
                    >
                      <Dropdown.Toggle
                        itemProp="potentialAction"
                        variant="light"
                        as="a"
                        className="basicDropdown"
                        data-defaultimg={data?.defaultImage}
                        onMouseOver={() => resetDefaultImg()}
                        id={data.headerText.toString().replace(' ', '_').toLowerCase() + 'toggle'}
                        onClick={(e) => {
                          data?.headerLink === '#' && e.preventDefault();
                          if (data?.headerCallback) {
                            buPrimaryNavCallback();
                          } else {
                            data?.headerLink !== '#' && openLink(data?.headerLink, data?.target, e);
                          }
                          sendEvent({
                            event: 'top_navigation_interaction',
                            category: 'realty',
                            sub_category: 'user_interaction',
                            page_type: pageName,
                            click_text: data?.headerText ? data?.headerText : '',
                          });
                        }}
                        href={!data.headerCallback && data?.headerLink}
                      >
                        {data?.headerLeftIcon && (
                          <span className="iconBox">{getIconFromIconName(data?.headerLeftIcon)}</span>
                        )}
                        {data.headerText}
                        {data?.headerRightIcon && (
                          <span className="iconBox">{getIconFromIconName(data?.headerRightIcon)}</span>
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        key={key}
                        className={`${
                          data.headerRightFlag ? `realtyMenuList dropdown-menu-end ${colClassName}` : colClassName
                        }
                         ${data?.isOpen ? '' : 'd-none'}
                         `}
                      >
                        {totalLoop.map((number, number_index) => {
                          return (
                            <React.Fragment key={`${data?.fatNav + number_index}`}>
                              {data?.fatNav ? (
                                <div
                                  itemProp="mainEntity"
                                  itemScope
                                  itemType="https://schema.org/ItemList"
                                  className="realtyMainNav"
                                >
                                  <div
                                    className="nav nav-pills me-3"
                                    id="v-pills-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                  >
                                    {data?.items &&
                                      data?.items.length > 0 &&
                                      data?.items?.map((ite: any, idx: number) => {
                                        if (ite.fatNavSectionLink === toggleVal) {
                                          subItems.push(ite);
                                        }
                                        return (
                                          <a
                                            itemProp="itemListElement"
                                            key={`${data?.headerText + idx}`}
                                            href="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              sendEvent({
                                                event: 'top_navigation_interaction',
                                                category: 'realty',
                                                sub_category: 'user_interaction',
                                                page_type: pageName,
                                                click_text: data?.headerText ? data?.headerText : '',
                                                Label: ite?.fatNavSectionLink ? ite?.fatNavSectionLink : '',
                                              });
                                            }}
                                            className={
                                              ite.fatNavSectionLink === toggleVal ? 'navLink active' : 'navLink'
                                            }
                                            onMouseOver={() => handleToggle(ite?.fatNavSectionLink)}
                                          >
                                            {ite?.fatNavSectionLink}
                                            <span className="arrowRight">{getIconFromIconName('ArrowRight')}</span>
                                          </a>
                                        );
                                      })}
                                  </div>
                                  <div
                                    className="tabContent"
                                    id="v-pills-tabContent"
                                    itemScope
                                    itemType="https://schema.org/ItemList"
                                  >
                                    <div className="tab-pane active">
                                      <Row>
                                        <Col md={8} className="columnScroll">
                                          {subItems &&
                                            subItems?.length > 0 &&
                                            subItems?.map((i: any, n: number) => {
                                              return i?.items?.map((item: any, index: number) => {
                                                return (
                                                  <div
                                                    itemProp="itemListElement"
                                                    className="navlink"
                                                    key={`${item?.sectionTitleLink + index}`}
                                                  >
                                                    {item?.sectionTitleLink ? (
                                                      <a
                                                        itemProp="potentialAction"
                                                        href={item?.sectionTitleLink}
                                                        data-imgsrc={item.sectionImage}
                                                        data-logosrc={item.sectionLogo}
                                                        onMouseOver={(e) => handleProjectImg(e)}
                                                        onMouseOut={() => resetDefaultImg()}
                                                        onClick={() => {
                                                          sendEvent({
                                                            event: 'top_navigation_menu',
                                                            category: 'realty',
                                                            sub_category: 'user_interaction',
                                                            page_type: pageName,
                                                            Label: i?.fatNavSectionLink ? i?.fatNavSectionLink : '',
                                                            click_text: item?.sectionTitle ? item?.sectionTitle : '',
                                                          });
                                                        }}
                                                        className="navSectionTitleLink"
                                                        key={`${item?.sectionTitle + n}`}
                                                      >
                                                        {item?.sectionTitle}
                                                      </a>
                                                    ) : (
                                                      <h3
                                                        itemProp="name"
                                                        key={`${item?.sectionTitle + n}`}
                                                        className="navSectionTitle"
                                                      >
                                                        {item?.sectionTitle}{' '}
                                                      </h3>
                                                    )}
                                                    {item?.sectionItems &&
                                                      item?.sectionItems?.length > 0 &&
                                                      item?.sectionItems.map(
                                                        (sectionItem: any, sectionIndex: number) => (
                                                          <React.Fragment
                                                            key={`${sectionItem?.itemLink + sectionIndex}`}
                                                          >
                                                            {sectionItem.itemLink ? (
                                                              <a
                                                                itemProp="itemListElement"
                                                                className={
                                                                  sectionItem.linkHeading ? 'linkHeading' : undefined
                                                                }
                                                                data-imgsrc={sectionItem.itemImage}
                                                                data-logosrc={sectionItem.itemLogo}
                                                                href={sectionItem.itemLink}
                                                                target={
                                                                  sectionItem.target ? sectionItem.target : '_self'
                                                                }
                                                                key={`${sectionItem?.itemText + sectionIndex}`}
                                                                onMouseOver={(e) => handleProjectImg(e)}
                                                                onMouseOut={() => resetDefaultImg()}
                                                                onClick={() => {
                                                                  handleChildItem(sectionItem?.itemText);
                                                                  sendEvent({
                                                                    event: 'top_navigation_interaction',
                                                                    category: 'realty',
                                                                    sub_category: 'user_interaction',
                                                                    page_type: pageName,
                                                                    click_text: sectionItem?.itemText
                                                                      ? sectionItem?.itemText
                                                                      : '',
                                                                    Label: data?.headerText ? data?.headerText : '',
                                                                  });
                                                                }}
                                                                rel={
                                                                  sectionItem?.target == '_blank'
                                                                    ? 'noopener noreferrer'
                                                                    : ''
                                                                }
                                                              >
                                                                {sectionItem?.itemLeftIcon && (
                                                                  <span className="iconBox">
                                                                    {getIconFromIconName(sectionItem?.itemLeftIcon)}
                                                                  </span>
                                                                )}
                                                                {sectionItem?.itemText}
                                                              </a>
                                                            ) : (
                                                              <div
                                                                className={styles.fatNavSectionItem}
                                                                itemProp="itemListElement"
                                                                data-imgsrc={sectionItem.itemImage}
                                                                data-logosrc={sectionItem.itemLogo}
                                                                key={`${sectionItem?.itemText + sectionIndex}`}
                                                                onMouseOver={(e) => {
                                                                  handleProjectImg(e);
                                                                }}
                                                                onMouseOut={() => resetProjectImg()}
                                                                onClick={() => {
                                                                  sendEvent({
                                                                    event: 'top_navigation_interaction',
                                                                    category: 'realty',
                                                                    sub_category: 'user_interaction',
                                                                    page_type: pageName,
                                                                    click_text: sectionItem?.itemText
                                                                      ? sectionItem?.itemText
                                                                      : '',
                                                                    Label: data?.headerText ? data?.headerText : '',
                                                                  });
                                                                }}
                                                              >
                                                                {sectionItem?.itemLeftIcon && (
                                                                  <span className="iconBox">
                                                                    {getIconFromIconName(sectionItem?.itemLeftIcon)}
                                                                  </span>
                                                                )}
                                                                {sectionItem?.itemText}
                                                              </div>
                                                            )}
                                                          </React.Fragment>
                                                        ),
                                                      )}
                                                  </div>
                                                );
                                              });
                                            })}
                                        </Col>
                                        <Col md={4}>
                                          <div className="navProjectfigure" itemProp="itemListElement">
                                            {data?.defaultImage ? (
                                              <>
                                                <span className="navProjectfigureLogoWrapper">
                                                  <img
                                                    itemProp="image"
                                                    className="navProjectfigureLogo"
                                                    data-default-logo={data?.defaultLogo}
                                                    ref={defaultLogo}
                                                    src={navProjectLogo ?? data?.defaultLogo}
                                                    alt={data?.headerText}
                                                  />
                                                </span>
                                                <img
                                                  itemProp="image"
                                                  className="navProjectfigureImage"
                                                  data-default-img={data?.defaultImage}
                                                  ref={defaultImg}
                                                  src={navProjectImage ?? data?.defaultImage}
                                                  alt={data?.headerText}
                                                />
                                              </>
                                            ) : (
                                              <>
                                                <span className="navProjectfigureLogoWrapper">
                                                  <CustomImage
                                                    itemProp="image"
                                                    className="navProjectfigureLogo"
                                                    data-default-logo={' '}
                                                    ref={defaultLogo}
                                                    src={navProjectLogo ?? ' '}
                                                    alt={data?.headerText}
                                                  />
                                                </span>
                                                <CustomImage
                                                  itemProp="image"
                                                  className="navProjectfigureImage"
                                                  data-default-img={' '}
                                                  ref={defaultImg}
                                                  src={navProjectImage ?? ' '}
                                                  alt={data?.headerText}
                                                />
                                              </>
                                            )}
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Col md={totalCol} key={`${'total_loop_' + number_index}`}>
                                  {data?.items?.map((item: any, itemIndex: number) => {
                                    return (
                                      <React.Fragment
                                        key={`idx_parent_${
                                          item?.itemComponent ? item?.itemComponent : item?.itemText + itemIndex
                                        }`}
                                      >
                                        {item?.itemComponent && (
                                          <Dropdown.Item
                                            itemProp="itemListElement"
                                            href="#/"
                                            key={`idx_${item?.itemComponent}_${item?.itemComponent + itemIndex}`}
                                          >
                                            {item?.itemComponent}
                                          </Dropdown.Item>
                                        )}

                                        {!item.itemComponent && (
                                          <Dropdown.Item
                                            itemProp="itemListElement"
                                            onClick={(e) => {
                                              openLink(item?.itemLink, item?.target, e);
                                              sendEvent({
                                                event: 'top_navigation_interaction',
                                                category: 'realty',
                                                sub_category: 'user_interaction',
                                                page_type: pageName,
                                                click_text: item?.itemText ? item?.itemText : '',
                                                Label: data?.headerText ? data?.headerText : '',
                                              });
                                            }}
                                            key={`idx_${item?.headerLink}_${item?.itemLink}___${
                                              item?.itemText + itemIndex
                                            }`}
                                          >
                                            {item?.itemLeftIcon && (
                                              <span className="iconBox">{getIconFromIconName(item?.itemLeftIcon)}</span>
                                            )}
                                            <p itemProp="description">
                                              {item?.itemText}
                                              <span className="subText">{item?.itemSubText}</span>
                                            </p>
                                          </Dropdown.Item>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </Col>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}

                  {!data?.items && !data?.headerComponent && data?.headerLink && (
                    <div className="navItem ">
                      <Dropdown.Item
                        itemProp="itemListElement"
                        onClick={() => {
                          data.headerCallback && buPrimaryNavCallback();
                          sendEvent({
                            event: 'top_navigation_interaction',
                            category: 'realty',
                            sub_category: 'user_interaction',
                            page_type: pageName,
                            click_text: data?.headerText ? data?.headerText : '',
                          });
                        }}
                        href={!data.headerCallback && data?.headerLink}
                      >
                        {data.headerText}
                      </Dropdown.Item>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
