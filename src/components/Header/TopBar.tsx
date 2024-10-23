import { ITopBar } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { FC } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useGTM from 'src/utils/useGTM';
import styles from './header.module.scss';

const TopBar: FC<ITopBar> = (props) => {
  const { topbarList, back = false, pageName = '' } = props;
  const { sendEvent } = useGTM();

  return (
    <div
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
      className={back ? 'topNav d-flex justify-content-between' : 'topNav'}
    >
      {topbarList &&
        topbarList?.map((data: any, index: number) => {
          return (
            <React.Fragment key={`${data?.headerText + index}`}>
              <Dropdown
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/ItemList"
                className="navItem"
                key={`${data?.headerText + index}`}
              >
                {data?.items != null && data?.items.length > 0 ? (
                  <>
                    <Dropdown.Toggle
                      itemProp="PotentialAction"
                      variant="light"
                      as="button"
                      className={`basicDropdown ${styles.businessHeader}`}
                      id={data.headerText.toString().replace(' ', '_').toLowerCase()}
                      key={`${data?.headerText + index}`}
                    >
                      {getIconFromIconName(data?.headerLeftIcon)} {data.headerText}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {data?.items?.map((item: any, itemIndex: number) => {
                        return (
                          <Dropdown.Item
                            itemProp="itemListElement"
                            rel={item?.target == '_blank' ? 'noopener noreferrer' : ''}
                            key={`${item?.itemLink + itemIndex}`}
                            className={item?.itemText.toLowerCase().includes('realty') && 'active'}
                            href={item.itemLink}
                            target={item.target && item.target !== '' ? item.target : null}
                            onClick={() => {
                              sendEvent({
                                event: 'top_pannel_interaction',
                                category: 'realty',
                                sub_category: 'user_interaction',
                                page_type: pageName,
                                click_text: item?.itemText ? item?.itemText : '',
                                Label: 'business',
                              });
                            }}
                          >
                            {getIconFromIconName(item?.itemLeftIcon)}
                            {item.itemText}
                            {item?.itemText.toLowerCase().includes('realty') && getIconFromIconName('Tick')}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </>
                ) : (
                  <>
                    <Dropdown.Toggle
                      itemProp="PotentialAction"
                      variant="light"
                      as="a"
                      className="basicDropdown"
                      id={data.headerText.toString().replace(' ', '_').toLowerCase()}
                      key={`${data?.headerText + index}`}
                      href={data.headerLink}
                    >
                      {getIconFromIconName(data?.headerLeftIcon)} {data.headerText}
                    </Dropdown.Toggle>
                  </>
                )}
              </Dropdown>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default TopBar;
