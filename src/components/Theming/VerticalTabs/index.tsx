import { IVerticalTabs } from '@interfaces';
import { useRipple } from '@utils';
import classnames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import styles from './verticalTabs.module.scss';

const CSS_CLASSES = {
  HTABS: 'adl-htabs',
  VTABS: 'adl-vtabs',
};

const VTabViewDefaultClass = 'flex-column';

const VerticalTabs: FC<IVerticalTabs> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  HandleManageDetails = () => {},
  defaultActiveKey,
  tabData = [],
  className,
  isClick = false,
  horizontalTabView = false,
  ripple = true,
  onClick,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onItemClick = () => {},
  autoIds = {},
  isItemAdded,
  ...props
}) => {
  const { createRipple } = useRipple();
  const parentRef = useRef<any>(null);
  const activetabRef = useRef<any>(null);
  const [hoveredTab, setHoveredTab] = useState(defaultActiveKey);
  const [container, setContainer] = useState(true);

  const vTabConvertHTabClass = classnames(className, CSS_CLASSES.HTABS, 'nav-tabs');

  const [widthArr, setWidthArr] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [active, setActive] = useState<any>(defaultActiveKey);

  const scroll = (id: any, currentElement: any) => {
    const currentParent = currentElement?.parentNode?.parentNode;
    const parent = currentParent || parentRef?.current;
    const parentWidth = parent?.clientWidth || 0;
    const ele = activetabRef?.current || document.getElementById(id);
    const eleWidth = ele?.clientWidth || 0;
    const firstWidth: any = document?.getElementById(`${tabData[0].key}-0`)?.offsetLeft;
    const leftWidth: any = ele?.getBoundingClientRect().left;

    const req = (parentWidth - eleWidth) / 2;
    const scollWidth = parentWidth - leftWidth;
    if (req > leftWidth) {
      parent?.scrollBy({ left: -scollWidth - firstWidth + (req + eleWidth), behavior: 'smooth' });
    } else if (req < leftWidth) {
      parent?.scrollBy({ left: leftWidth - firstWidth - req, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    tabData?.forEach((element: any, index: any) => {
      const eleWidth = document.getElementById(`${element.key}-${index}`);
      if (eleWidth) {
        setWidthArr((prev: any) => [...prev, eleWidth.clientWidth]);
        setFlag(true);
      }
    });
  }, [tabData]);

  useEffect(() => {
    if (defaultActiveKey && tabData?.length > 0) {
      const elemIndex = tabData?.findIndex((i: any) => i.key === defaultActiveKey);

      const hoveredTabElem = document?.getElementById(`left-tabs-Details-tab-${defaultActiveKey}`);

      const timeOut = setTimeout(() => {
        scroll(`${defaultActiveKey}-${elemIndex}`, hoveredTabElem);
        return () => {
          clearTimeout(timeOut);
        };
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveKey, active]);

  return (
    <>
      {tabData?.length > 0 ? (
        <TabContainer defaultActiveKey={defaultActiveKey} activeKey={hoveredTab} {...props}>
          <div
            className={`${horizontalTabView ? '' : styles.layerContents} ${container ? '' : 'noAside'}`}
            auto-id="data_main_tab_contain"
          >
            {tabData.length > 1 && (
              <div className={horizontalTabView ? '' : styles.navCol}>
                <Nav
                  ref={parentRef}
                  className={horizontalTabView ? vTabConvertHTabClass : VTabViewDefaultClass}
                  auto-id={tabData?.titleAutoId}
                >
                  {tabData?.map((tab: any, index: any) => (
                    <React.Fragment key={`vtab-navitem-parent-${tab + index}`}>
                      {isClick && (
                        <NavItem
                          key={`vtab-navitem-clicked-${tab + index}`}
                          id={`${tab.key}-${index}`}
                          ref={active === tab ? activetabRef : null}
                          onClick={(e: any) => {
                            e.preventDefault();
                            if (ripple) {
                              createRipple(e);
                            }
                            if (onClick) {
                              onClick();
                            }
                            setActive(tab);
                            onItemClick(tab);
                            if (!isItemAdded) {
                              setHoveredTab(tab.key);
                            }
                          }}
                          style={{ minWidth: `${flag && widthArr[index]}px` }}
                          auto-id={autoIds?.categoryAutoId}
                        >
                          <NavLink
                            key={`vtab-navlinkitem-clicked-${tab + index}`}
                            eventKey={tab.key}
                            onClick={(e: any) => {
                              e.preventDefault();
                              HandleManageDetails(tab);
                            }}
                            auto-id={tabData?.titleAutoId}
                            {...{ href: tab.href }}
                          >
                            {tab.title}
                          </NavLink>
                        </NavItem>
                      )}

                      {!isClick && (
                        <NavItem
                          key={`vtab-navitem-${tab + index}`}
                          ref={active === tab ? activetabRef : null}
                          onClick={(e: any) => {
                            if (ripple) {
                              createRipple(e);
                            }
                            if (onClick) {
                              onClick();
                            }
                            onItemClick(tab);
                            setActive(tab);
                          }}
                          onMouseEnter={() => {
                            setHoveredTab(tab.key);
                            if (tab?.content && tab?.isEmpty) {
                              setContainer(true);
                            } else {
                              setContainer(false);
                              return;
                            }
                          }}
                        >
                          <NavLink
                            onClick={() => HandleManageDetails(tab)}
                            key={`vtab-navlinkitem-${tab + index}`}
                            eventKey={tab.key}
                            auto-id={tabData?.titleAutoId}
                          >
                            {tab.isRestricted == true && horizontalTabView == false ? (
                              <div className={styles.tabWithLock}>{tab.title}</div>
                            ) : (
                              <>{tab.title}</>
                            )}
                          </NavLink>
                        </NavItem>
                      )}
                    </React.Fragment>
                  ))}
                </Nav>
              </div>
            )}
            {container && (
              <aside>
                <TabContent>
                  {tabData?.map((tab: any, index: any) => {
                    return (
                      <TabPane key={`vtab-tabpane-${tab + index}`} eventKey={tab.key}>
                        {tab.content}
                      </TabPane>
                    );
                  })}
                </TabContent>
              </aside>
            )}
          </div>
        </TabContainer>
      ) : (
        'No Tabs Found'
      )}
    </>
  );
};

export default VerticalTabs;
