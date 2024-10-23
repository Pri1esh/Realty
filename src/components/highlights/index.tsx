import { CustomImage, Offcanvas, ReadMore } from '@components';
import { IHighlights, IHighlightsCityData } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-bootstrap';
import styles from './highlights.module.scss';

const Highlights = (props: IHighlights) => {
  const { CitySearchData, currCity, locationHeading = 'Properties in' } = props;
  const [selectedCity, setselectedCity] = useState(currCity);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);
  const locationHeadingRef = useRef<HTMLSpanElement>(null);
  const [left, setLeft] = useState(0);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    locationHeadingRef?.current && setLeft(locationHeadingRef?.current?.offsetWidth - 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationHeadingRef.current]);

  useEffect(() => {
    document.addEventListener('click', checkifClickedOutsideDropdown);
    return () => {
      document.removeEventListener('click', checkifClickedOutsideDropdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const checkifClickedOutsideDropdown = (e: any) => {
    if (open && dropdownRef.current && !dropdownRef?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className={styles.locationheadline}>
        <div className={styles.highlights}>
          <div className={styles.city_dropdown}>
            <div className="position-relative d-inline-block">
              {deviceType == 'desktop' ? (
                <>
                  <h1
                    itemProp="name"
                    aria-controls="city_dropdown"
                    className={`${styles.cityNameDropdown} ${styles.citydropdown}`}
                  >
                    <span ref={locationHeadingRef}>{locationHeading}</span>{' '}
                    <span
                      className={styles.selectedCity}
                      onClick={(e) => {
                        setOpen(!open);
                        e.stopPropagation();
                      }}
                      ref={dropdownRef}
                    >
                      {selectedCity} {open ? getIconFromIconName('ArrowUp') : getIconFromIconName('arrowdown')}
                    </span>
                  </h1>
                  <Fade in={open} className={styles.citydropdown}>
                    <div id="city_dropdown" style={{ left: left }} className={styles.city_dropdown_Box}>
                      <ul>
                        <li className={styles.selected_city}>
                          {CitySearchData?.map((data: IHighlightsCityData, key: number) => (
                            <a
                              key={`${data?.cityname + key}`}
                              onClick={() => {
                                setselectedCity(data?.cityname);
                                setOpen(!open);
                              }}
                              href={data?.slug}
                            >
                              <CustomImage
                                itemProp="image"
                                src={data?.src}
                                className={` ${styles.cityThumb} imgBackground `}
                                width={50}
                                height={50}
                                alt="Adani Realty"
                              />
                              <strong itemProp="contentLocation">{data?.cityname}</strong>
                            </a>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </Fade>
                </>
              ) : (
                <>
                  <h1
                    itemProp="name"
                    aria-controls="city_dropdown"
                    className={`${styles.cityNameDropdown} ${styles.citydropdown}`}
                  >
                    <span ref={locationHeadingRef}>{locationHeading}</span>{' '}
                    <span
                      className={styles.selectedCity}
                      onClick={(e) => {
                        setOpen(!open);
                        e.stopPropagation();
                      }}
                      ref={dropdownRef}
                    >
                      {selectedCity} {open ? getIconFromIconName('arrowup') : getIconFromIconName('arrowdown')}
                    </span>
                  </h1>

                  <Offcanvas
                    placement="bottom"
                    showCanvas={open}
                    onHide={() => setOpen(false)}
                    closeButton={true}
                    bodySpacing={false}
                    titleProps={{ className: 'mobile-offcanvas-title' }}
                    header={<h2>Select City</h2>}
                  >
                    <div id="city_dropdown">
                      <ul>
                        <li className={styles.highlightsMobile}>
                          {CitySearchData?.map((data: IHighlightsCityData, key: number) => (
                            <>
                              <a
                                key={`${data?.cityname + key}`}
                                onClick={() => {
                                  setselectedCity(data?.cityname);
                                  setOpen(!open);
                                }}
                                href={data?.slug}
                              >
                                <CustomImage
                                  itemProp="image"
                                  src={data?.src}
                                  className={` ${styles.cityThumb} imgBackground `}
                                  width={50}
                                  height={50}
                                  alt="Adani Realty"
                                />
                                <strong itemProp="contentLocation">{data?.cityname}</strong>
                                <span className={data?.cityname === selectedCity ? styles.active : 'd-none'}>
                                  {getIconFromIconName('Tick')}
                                </span>
                              </a>
                            </>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </Offcanvas>
                </>
              )}
            </div>
          </div>
          {CitySearchData?.map((data: IHighlightsCityData, index: number) => {
            if (data.cityname.toLowerCase() === currCity.toLowerCase())
              return (
                <div key={`${data?.cityname + index}`}>
                  <ReadMore textLength={220} data={data.citydetail} />
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};
export default Highlights;
