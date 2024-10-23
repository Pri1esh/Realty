import { CustomImage } from '@components';
import { IOurLocation, IOurLocationData } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useRef, useState } from 'react';
import { Col, Fade, Figure, Row } from 'react-bootstrap';
import styles from './OurLocation.module.scss';

const OurLocation = (props: IOurLocation) => {
  const { location } = props;
  const CitySearchData = location?.propertyType;
  const [selectedCity, setselectedCity] = useState(CitySearchData[0]);
  const [propertyTypeData, setpropertyTypeData] = useState<any>();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const propertyData = location?.projectlist?.filter(
      (items: IOurLocationData) => items.propertyType === selectedCity,
    );
    setpropertyTypeData(propertyData);
    document.addEventListener('click', checkifClickedOutsideDropdown);

    return () => {
      document.removeEventListener('click', checkifClickedOutsideDropdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const checkifClickedOutsideDropdown = (e: any) => {
    if (
      open &&
      dropdownRef.current &&
      !dropdownRef?.current?.contains(e.target) &&
      dropdownRef?.current?.contains(e.target.querySelector('.arrowUp'))
    ) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.blockmain}>
      <Row>
        <Col>
          <div className={styles.card}>
            <div className={styles.cardthumb}>
              <Figure>
                <CustomImage
                  className="imgBackground"
                  src={location?.src ? location?.src : ''}
                  alt={location?.imgalt}
                  title={location?.imgtitle}
                  itemProp="image"
                />
              </Figure>
              <div className={styles.bottomfixed}>
                <h3 itemProp="text">{location?.projectcity}</h3>
                <h4>
                  {location.propertyType.length > 1 ? (
                    <div onClick={() => setOpen(!open)} ref={dropdownRef}>
                      <span>
                        {selectedCity} {open ? getIconFromIconName('ArrowUp') : getIconFromIconName('arrowdown')}
                      </span>
                    </div>
                  ) : (
                    selectedCity
                  )}
                </h4>
                <Fade in={open}>
                  <div id="city_dropdown" data-visible={open} className={styles.city_dropdown_Box}>
                    <ul itemProp="accessModeSufficient">
                      {location?.propertyType?.map((data: string, key: number) => (
                        <li
                          className={styles.selected_city}
                          key={`${data + key}`}
                          onClick={() => {
                            setselectedCity(data);
                            setOpen(!open);
                          }}
                        >
                          <span itemProp="text">{data}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Fade>
              </div>
            </div>
            <div className={styles.cardbody}>
              <ul>
                {propertyTypeData?.map((item: IOurLocationData, i: any) => (
                  <li key={`${item?.projectlink + i}`}>
                    <a
                      target={item?.linktarget}
                      href={`${item?.projectlink ? item?.projectlink : '#'}`}
                      rel={`${item?.projectlink === '_blank' ? 'noopener noreferrer' : ''}`}
                    >
                      <div>
                        <p itemProp="text">
                          <b>{item?.projecttitle}</b>
                        </p>
                        <p itemProp="text">
                          {item?.priceStarting}
                          <span>
                            {' '}
                            {item?.projectprice} {item?.condition}{' '}
                          </span>
                          {item?.allinclusive}
                        </p>
                        {getIconFromIconName('ArrowRight')}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {location.seeAll ? (
                <div className={styles.seeAll}>
                  <a href={location.seeAll.link}>{location.seeAll.title}</a>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default OurLocation;
