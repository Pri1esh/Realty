import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  Button,
  Carousel,
  ContactCta,
  Faq,
  Layout,
  ProjectTabs,
  ResidentialBanner,
  SectionHeader,
  VerticalTabs,
} from '@components';
import { IProjects } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Projects = (props: IProjects) => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType == 'mobile';
  const { data, propertyType } = props;
  const {
    properties,
    Faq: faq,
    Achievements: achievements,
    GetInTouch,
    AboutAdaniHome,
    mainBanner,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
    seoData = {},
  } = data;
  const configureProperty = (propertyArray: any[], configureBy: string) => {
    const outputArray: { configureBy: any; property: any[] }[] = [];

    propertyArray.forEach((property) => {
      const propertyStatus = outputArray.find((currProperty: any) => {
        return currProperty['configureBy'] && currProperty['configureBy'] === property[configureBy];
      });

      if (propertyStatus === undefined) {
        const properties = [];
        properties.push(property);
        outputArray.push({
          configureBy: property[configureBy],
          property: properties,
        });
      } else {
        propertyStatus['property'].push(property);
      }
    });
    return outputArray;
  };
  const getPropertyDataIntoArray = (propertyArray: any, index: number) => {
    const arr: any = [];
    arr.push({
      content: (
        <div>
          <Carousel
            className=""
            classes=""
            isMobSlider
            settings={{
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
                  settings: { slidesToShow: 1.2, infinite: false, autoplay: false },
                },
              ],
            }}
          >
            <React.Fragment key=".0">
              {properties?.fields[index]?.property.map(
                (
                  item: {
                    link: string;
                    src: string;
                    imgalt: string;
                    imgtitle: string;
                    logo: string;
                    logoalt: string;
                    logotitle: string;
                    title: string;
                    location: string;
                    type: string;
                    imgtype: string;
                    subType: string;
                    linkTarget: string;
                    mobileimage: string;
                  },
                  index: number,
                ) => (
                  <ProjectTabs
                    link={`${item?.link}`}
                    src={isMobile && item?.mobileimage ? item?.mobileimage : item?.src}
                    imgalt={item?.imgalt}
                    imgtitle={item?.imgtitle}
                    logo={item?.logo}
                    logoalt={item?.logoalt}
                    logotitle={item?.logotitle}
                    title={item?.title}
                    location={item?.location}
                    type={item?.type}
                    imgtype={item?.imgtype}
                    subType={item?.subType}
                    key={`${item?.src + index}`}
                    target={item?.linkTarget}
                  />
                ),
              )}
              {
                <div>
                  <div className="seeallcard">
                    <div>
                      <Button href={properties?.fields[index]?.seeAllLink} size="lg">
                        <b>{properties?.fields[index]?.seeAllKeyword}</b>
                      </Button>
                    </div>
                  </div>
                </div>
              }
            </React.Fragment>
          </Carousel>
        </div>
      ),
      key: 'All' + properties?.fields[index].property[0].city,
      title: 'All',
    });

    propertyArray?.map((propertyData: { property: any[]; configureBy: any }, key: any) =>
      arr.push({
        content: (
          <div>
            <Carousel
              className=""
              classes=""
              isMobSlider
              settings={{
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
                    settings: { slidesToShow: 1.2, infinite: false, autoplay: false },
                  },
                ],
              }}
            >
              <React.Fragment key=".0">
                {propertyData?.property.map(
                  (item, index) =>
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
                        type={item?.type}
                        imgtype={item?.imgtype}
                        subType={item?.subType}
                        key={`${item?.src + index}`}
                      />
                    ),
                )}
              </React.Fragment>
            </Carousel>
          </div>
        ),
        key: key + properties?.fields[index].property[0].city,
        title: propertyData.configureBy,
      }),
    );
    return arr;
  };
  return (
    <div itemScope itemType="https://schema.org/WebPage" className="locationpage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        propertyType={propertyType}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            {mainBanner?.fields && <ResidentialBanner data={mainBanner?.fields} />}
            {properties?.fields &&
              properties?.fields?.map(
                (
                  currCityProperties: {
                    headingLabel: any;
                    subheadingLabel:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                    property: any[];
                  },
                  index: number,
                ) => (
                  <Row key={`${currCityProperties?.headingLabel + index}`}>
                    <Col lg={12}>
                      <div className="section-row tabs-projects">
                        <SectionHeader heading={`${currCityProperties?.headingLabel}`} h1={false} />
                        <p itemProp="alternativeHeadline">{currCityProperties?.subheadingLabel}</p>
                        <VerticalTabs
                          className="scrollbar-x mb-4"
                          horizontalTabView={true}
                          isClick={true}
                          defaultActiveKey={'All' + properties?.fields[index].property[0].city}
                          tabData={getPropertyDataIntoArray(
                            configureProperty(currCityProperties?.property, 'status'),
                            index,
                          )}
                          transition
                        />
                      </div>
                    </Col>
                  </Row>
                ),
              )}
            <div className="section-row section_faq">
              {faq?.fields?.data && (
                <Faq
                  faqs={faq?.fields?.data}
                  heading={faq?.params?.ComponentTitle}
                  seeall={faq?.params?.SeeAllKeyword}
                  seeallLink={faq?.fields?.faqLink}
                />
              )}
            </div>
          </Container>
          <div className="section-row">
            {GetInTouch?.fields && (
              <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} propertyType={propertyType} />
            )}
          </div>
          <Container>
            <Row>
              <Col>
                {AboutAdaniHome?.fields && (
                  <div className="section-row aboutPage footerSection pt-0">
                    <AboutAdani
                      aboutData={AboutAdaniHome?.fields}
                      readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                      readless={AboutAdaniHome?.params?.ReadLessKeyword}
                    />
                  </div>
                )}
                <div className="section-row footerSection achievements">
                  {achievements?.fields && <Achievements data={achievements?.fields?.data} />}
                </div>
                {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </div>
  );
};
export default Projects;
