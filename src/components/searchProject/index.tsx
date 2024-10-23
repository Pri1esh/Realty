import { Button, IconButton, SelectDropDown } from '@components';
import { getIconFromIconName, useDeviceType } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import useGTM from 'src/utils/useGTM';
import styles from './searchProject.module.scss';

const SearchProject = (props: any) => {
  const { searchProjectData, isActive } = props;
  const propertySearchRef = useRef<any>(null);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>();
  const [pageUrl, setPageUrl] = useState<string>('');
  const { deviceType } = useDeviceType();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { sendEvent } = useGTM();

  const getUrlPath = (setPageUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const path: string | any =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');
  };

  useEffect(() => {
    getUrlPath(setPageUrl);
  }, []);

  const getSearchText = (propertyLocation: any, propertyType: any, propertyStatus: any) => {
    switch (true) {
      case !!(type && status):
        return `${propertyLocation} | ${propertyType} | ${propertyStatus}`;
      case !!type:
        return `${propertyLocation} | ${propertyType}`;
      case !!status:
        return `${propertyLocation} | ${propertyStatus}`;
      default:
        return `${propertyLocation}`;
    }
  };

  const getUrl = (location: any, type: any, status: any) => {
    switch (true) {
      case !!(type && status):
        return `${location}?type=${type}&status=${status}`;
      case !!type:
        return `${location}?type=${type}`;
      case !!status:
        return `${location}?status=${status}`;
      default:
        return `${location}`;
    }
  };

  const onSubmit = () => {
    const propertyLocation =
      searchProjectData?.fields[0]?.options?.find((item: any) => item.key === location)?.label || '';
    const propertyType = searchProjectData?.fields[1]?.options?.find((item: any) => item.key === type)?.label || '';
    const propertyStatus = searchProjectData?.fields[2]?.options?.find((item: any) => item.key === status)?.label || '';
    const searchText = getSearchText(propertyLocation, propertyType, propertyStatus);

    const eventVal = {
      event: 'search_click',
      category: 'realty',
      sub_category: 'top_navigation',
      page_type: pageUrl,
      click_text: 'Search',
      property_location: propertyLocation,
      property_type: propertyType,
      property_status: propertyStatus,
      search_text: searchText,
    };
    sendEvent(eventVal);

    trigger('Location');
    const url = getUrl(location, type, status);
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };

  const handleShow = () => {
    if (show) {
      setShow(!show);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('scroll', handleShow);
    return () => {
      window.removeEventListener('scroll', handleShow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollInView = async () => {
    if (show) return;
    const offsetTop = propertySearchRef?.current?.offsetTop;
    window.scrollTo({ top: offsetTop - 300, behavior: 'smooth' });
  };

  const propertysearchdata = (label: any, key: any) => {
    switch (label) {
      case 'Location':
        setLocation(key);
        break;
      case 'Type':
        setType(key);
        break;
      case 'Status':
        setStatus(key);
        break;
    }
  };

  const handleClick = () => {
    setShow(!show);
    setIsOpen(!show);
  };

  return !searchProjectData?.fields ? (
    <></>
  ) : (
    <div className={isActive ? styles.isHidden : styles.isVisible}>
      <div className="headersearch" id="search">
        <div className={`${show && 'showbtn'}`}>
          <Button size="sm" variant="outline-secondary" className="normalSearch" onClick={handleClick}>
            <span>
              {getIconFromIconName('Search')}
              {searchProjectData?.params?.SearchProjectKeyword || 'Search Project'}
            </span>
          </Button>
        </div>
      </div>
      <div className={`${styles.searchbox} ${show ? 'showWidget' : 'hideWidget'} searchwidget`} ref={propertySearchRef}>
        <div className={isOpen && !location ? 'container-fluid isVisible' : 'container-fluid'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={styles.searchboxrow}>
              {searchProjectData?.fields &&
                searchProjectData?.fields?.map(
                  (
                    item: {
                      type: any;
                      errorMessage: any;
                      label: string;
                      placeholder: string;
                      options: { [key: string]: any; label?: string; key?: string }[] | undefined;
                    },
                    key: React.Key | null | undefined,
                  ) => (
                    <Col lg="3" md="12" className={styles.searchboxcol} key={`${item?.label + key}`}>
                      <Controller
                        control={control}
                        name={item?.label}
                        rules={{
                          required: item?.label === 'Location' && `${item?.errorMessage}`,
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <div onClick={deviceType === 'desktop' ? scrollInView : undefined}>
                            <SelectDropDown
                              open={item?.label === 'Location' && location === '' && (errors?.[`${item?.type}`] as any)}
                              label={item?.label}
                              placeholder={item?.placeholder}
                              options={item?.options}
                              onBlur={onBlur}
                              delay={200}
                              selected={value}
                              setSelected={(key: any) => {
                                propertysearchdata(item?.label, key);
                                onChange(key);
                              }}
                              errorMessage={errors[`${item?.type}`]?.message as any}
                            />
                            {item?.label !== 'Location' && value && (
                              <div className={styles.searchClose}>
                                <IconButton
                                  onClick={() => {
                                    onChange('');
                                    propertysearchdata(item?.label, '');
                                  }}
                                >
                                  {getIconFromIconName('Cross')}
                                </IconButton>
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Col>
                  ),
                )}
              <Col lg="3" md="12" className={styles.searchboxcol}>
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className={styles.btnsearch}
                    onClick={deviceType === 'desktop' ? scrollInView : undefined}
                  >
                    {searchProjectData?.params?.SearchKeyword}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SearchProject;
