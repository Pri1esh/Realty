import { Button, Carousel, ProjectTabs, SectionHeader, VerticalTabs } from '@components';
import { IPropertyTabCarousel } from '@interfaces';
import { getPosition, useDeviceType } from '@utils';
import React, { useEffect, useState } from 'react';
import styles from './PropertyTabCarousel.module.scss';

const PropertyTabCarousel = (props: IPropertyTabCarousel) => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType == 'mobile';
  const { propertyAll, propertyType = '', isSeoPage = false } = props;
  const [displayProperties, setDisplayProperties] = useState<any>();
  const propertiesData: any = propertyAll?.fields?.data;
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    setActiveKey(
      (isSeoPage && `0${!!propertyType && propertyType}`) ||
        propertyAll?.params?.AllKeyword + (!!propertyType && propertyType),
    );
    navigator.geolocation.getCurrentPosition((position: any) => {
      const propertiesData = getPosition(position, propertyAll?.fields.data);
      const propertyArray = getPropertyDataIntoArray(
        configurePropertyArray(propertiesData['status']),
        propertiesData['all'],
      );
      setDisplayProperties(propertyArray);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const configurePropertyArray = (propertyArray: any) => {
    const outputArray: any[] = [];

    propertyArray?.map((item: any) => {
      if (!item?.status && !item?.city) return null;
      const sortedProperties = outputArray.filter((elem) => {
        return isSeoPage && item.city ? elem.tabHeading === item.city : elem.tabHeading === item.status;
      });
      if (sortedProperties.length) {
        sortedProperties[0].property.push(item);
      } else {
        const properties = [];
        properties.push(item);
        outputArray.push({
          tabHeading: isSeoPage && item.city ? item?.city : item?.status,
          property: properties,
        });
      }
    });
    return outputArray;
  };

  const getPropertyDataIntoArray = (propertyArray: any, propertiesAll: any) => {
    const arr: any = [];
    !isSeoPage &&
      arr.push({
        content: (
          <div>
            <Carousel
              isMobSlider
              settings={{
                // lazyLoad: 'ondemand',
                cssEase: 'linear',
                arrows: true,
                autoplay: false,
                autoplaySpeed: 2000,
                dots: false,
                infinite: false,
                pauseOnHover: false,
                slidesToScroll: 1,
                slidesToShow: 3,
                speed: 500,
                swipe: true,
                responsive: [
                  {
                    breakpoint: 1199,
                    settings: { slidesToShow: 3 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 2 },
                  },
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 1.2,
                      arrow: false,
                      infinite: false,
                      autoplay: false,
                    },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {propertiesAll?.map(
                  (
                    item: {
                      link: string;
                      linktarget: string;
                      src: string;
                      imgalt: string;
                      imgtitle: string;
                      logo: string;
                      logoalt: string;
                      logotitle: string;
                      title: string;
                      location: string;
                      propertyType: string;
                      subType: string;
                      imgtype: string;
                      mobileimage: string;
                    },
                    index: number,
                  ) =>
                    index < 6 && (
                      <ProjectTabs
                        link={item?.link}
                        target={item?.linktarget}
                        src={isMobile && item?.mobileimage ? item?.mobileimage : item?.src}
                        imgalt={item?.imgalt}
                        imgtitle={item?.imgtitle}
                        logo={item?.logo}
                        logoalt={item?.logoalt}
                        logotitle={item?.logotitle}
                        title={item?.title}
                        location={item?.location}
                        type={item?.propertyType}
                        imgtype={item?.imgtype}
                        propertyType={item?.propertyType}
                        subType={item?.subType}
                        mobileimage={item?.mobileimage}
                        key={`${item.src + index}`}
                      />
                    ),
                )}
                {
                  <div>
                    <div className="seeallcard">
                      <div>
                        <Button href={propertyAll?.params?.SeeAllLink} size="lg">
                          <b>{propertyAll?.params?.SeeAllKeyword}</b>
                        </Button>
                      </div>
                    </div>
                  </div>
                }
              </React.Fragment>
            </Carousel>
          </div>
        ),
        key: propertyAll?.params?.AllKeyword + (!!propertyType && propertyType),
        title: propertyAll?.params?.AllKeyword,
      });
    propertyArray?.map(
      (
        propertyData: {
          property: {
            link: string;
            linktarget: string;
            src: string;
            imgalt: string;
            imgtitle: string;
            logo: string;
            logoalt: string;
            logotitle: string;
            title: string;
            location: string;
            propertyType: string;
            subType: string;
            imgtype: string;
            mobileimage: string;
          }[];
          tabHeading: string;
        },
        key: number,
      ) =>
        arr.push({
          content: (
            <div>
              <Carousel
                className=""
                classes=""
                isMobSlider
                settings={{
                  // lazyLoad: 'ondemand',
                  cssEase: 'linear',
                  arrows: true,
                  autoplay: false,
                  autoplaySpeed: 2000,
                  dots: false,
                  infinite: false,
                  pauseOnHover: false,
                  slidesToScroll: 1,
                  slidesToShow: 3,
                  speed: 500,
                  swipe: true,
                  responsive: [
                    {
                      breakpoint: 1199,
                      settings: { slidesToShow: 3 },
                    },
                    {
                      breakpoint: 768,
                      settings: { slidesToShow: 2 },
                    },
                    {
                      breakpoint: 500,
                      settings: {
                        slidesToShow: 1.2,
                        arrow: false,
                        infinite: false,
                        autoplay: false,
                      },
                    },
                  ],
                }}
              >
                <React.Fragment key=".0">
                  {propertyData.property.map(
                    (
                      item: {
                        link: string;
                        linktarget: string;
                        src: string;
                        imgalt: string;
                        imgtitle: string;
                        logo: string;
                        logoalt: string;
                        logotitle: string;
                        title: string;
                        location: string;
                        propertyType: string;
                        subType: string;
                        imgtype: string;
                        mobileimage: string;
                      },
                      index: number,
                    ) => (
                      <ProjectTabs
                        link={item?.link}
                        target={item?.linktarget}
                        src={isMobile && item?.mobileimage ? item?.mobileimage : item?.src}
                        imgalt={item?.imgalt}
                        imgtitle={item?.imgtitle}
                        logo={item?.logo}
                        logoalt={item?.logoalt}
                        logotitle={item?.logotitle}
                        title={item?.title}
                        location={item?.location}
                        type={item?.propertyType}
                        imgtype={item?.imgtype}
                        propertyType={item?.propertyType}
                        subType={item?.subType}
                        key={`${item.src + index}`}
                      />
                    ),
                  )}
                </React.Fragment>
              </Carousel>
            </div>
          ),
          key: `${key}${!!propertyType && propertyType}`,
          title: propertyData?.tabHeading,
        }),
    );
    return arr;
  };

  return (
    <>
      {propertyAll?.params?.ComponentTitle && (
        <SectionHeader itemProp="headline" heading={propertyAll?.params?.ComponentTitle} />
      )}
      {propertyAll?.params?.ressInOtherCity && (
        <div className={styles.tabHeader}>
          <div className={`${deviceType === 'desktop' ? '' : 'mb-2'}`}>
            <SectionHeader itemProp="headline" heading={propertyAll?.params?.ressInOtherCity} />
          </div>
        </div>
      )}
      {propertyAll?.params?.commInOtherCity && (
        <div className={styles.tabHeader}>
          <div className={`${deviceType === 'desktop' ? '' : 'mb-2'}`}>
            <SectionHeader itemProp="headline" heading={propertyAll?.params?.commInOtherCity} />
          </div>
        </div>
      )}
      {propertyAll?.fields?.param?.ressOffer && (
        <p itemProp="text" className="mb-2">
          {propertyAll?.fields?.param?.ressOffer}
        </p>
      )}
      {propertyAll?.fields?.data.length > 0 ? (
        propertyAll?.fields?.data && (
          <div className={styles.tabsWrapper}>
            <VerticalTabs
              key={activeKey}
              className="scrollbar-x mb-4"
              horizontalTabView={true}
              isClick={true}
              defaultActiveKey={activeKey || propertyAll?.params?.AllKeyword + (!!propertyType && propertyType)}
              tabData={
                displayProperties
                  ? displayProperties
                  : getPropertyDataIntoArray(configurePropertyArray(propertiesData), propertiesData)
              }
              HandleManageDetails={(tab: { key: string }) => setActiveKey(tab.key)}
              transition
            />
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(PropertyTabCarousel);
