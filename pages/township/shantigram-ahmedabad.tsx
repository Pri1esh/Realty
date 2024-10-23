import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  BrandIcon,
  Breadcrumbs,
  Carousel,
  ContactCta,
  ErrorFallback,
  ExploreShantigram,
  ExploreTownship,
  Faq,
  Layout,
  Loader,
  ProjectActions,
  ProjectInfoTabs,
  ProjectMasterLayout,
  PropertyListing,
  ReadMore,
  SectionHeader,
  Testimonial,
  TownshipBanner,
  TownshipSidebar,
} from '@components';
import { IPage, IPropertyCard } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import useGTM from 'src/utils/useGTM';
import styles from './index.module.scss';

const TownshipDetail: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const [pageUrl, setPageUrl] = useState<string>('');
  const { sendEvent } = useGTM();

  useEffect(() => {
    const path: string | boolean =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');
  }, []);

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const eventAnalyticsHandler = (event: string, clickText?: string) => {
    const eventVal = {
      event: event,
      category: 'realty',
      sub_category: 'user_Interaction',
      page_type: pageUrl,
      click_text: clickText,
    };
    sendEvent(eventVal);
  };

  const {
    Shantigram,
    Infotabs: InfotabsData,
    exploreTownship,
    MasterLayoutData: masterLayouts,
    propertyListing,
    townshipSidebar,
    GetInTouch,
    Faq: faq,
    Achievements: achievements,
    AboutAdaniHome,
    PropertyAmenitesInfo,
    breadCrumbList,
    ProjectAction,
    AboutTownship: AboutTownshipData,
    footer,
    header,
    mMenu,
    testimonialList,
    searchData,
    seoData = {},
    PropertyBasicInfo,
    Highlights,
  } = data;
  return (
    <div className="TownshipDetail" itemScope itemType="https://schema.org/ItemPage">
      <Layout
        headerAbsolute={true}
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        PropertyBasicInfo={PropertyBasicInfo}
        searchData={searchData}
        isBordered={true}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <div className={styles.townshipBanner}>
          <div className={`${styles.projectAction} hideDesktop`}>
            <ProjectActions
              projectActionData={ProjectAction?.fields?.projectActions}
              download={false}
              eventAnalyticsHandler={eventAnalyticsHandler}
              selectedTownship={Shantigram?.fields?.data[0]?.heading}
            />
          </div>
          <TownshipBanner
            bannerData={ProjectAction?.fields}
            ShantigramBanner={Shantigram?.fields?.data[0]}
            eventAnalyticsHandler={eventAnalyticsHandler}
            selectedTownship={Shantigram?.fields?.data[0]?.heading}
          />
        </div>

        <Container>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} classname={'mt-4'} />}

          <div className="section-row TownshipContent row">
            <div className={`stickyTop ${styles.tabMobile} mt-lg-0 mt-4`}>
              <ProjectInfoTabs TabsData={InfotabsData?.fields?.infoTabs?.data} />
            </div>

            <div className="section-row" id="aboutProject">
              <SectionHeader heading={AboutTownshipData?.fields?.heading} itemProp="name" />
              <ReadMore
                data={AboutTownshipData?.fields?.about}
                readmore={AboutTownshipData?.fields?.readMoreLabel}
                readless={AboutTownshipData?.fields?.readLessLabel}
                textLength={450}
              />
            </div>
            {__EXPLORE_SHANTIGRAM__ && Highlights && (
              <div className="section-row" id="exploreShantigram">
                <SectionHeader
                  heading={Highlights?.fields?.heading ? Highlights?.fields?.heading : 'Explore Shantigram'}
                />
                <ExploreShantigram highlights={Highlights} />
              </div>
            )}

            <div className={`section-row arrow_pos topproperty ${styles.AmenitiesSlider}`} id="projectAmenities">
              <SectionHeader heading={PropertyAmenitesInfo?.fields?.heading} itemProp="name" />
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
                  slidesToShow: 5,
                  speed: 500,
                  swipe: true,
                  responsive: [
                    {
                      breakpoint: 1199,
                      settings: { slidesToShow: 4 },
                    },
                    {
                      breakpoint: 768,
                      settings: { slidesToShow: 4 },
                    },
                    {
                      breakpoint: 500,
                      settings: { slidesToShow: 2.5, infinite: false, autoplay: false, arrows: false },
                    },
                  ],
                }}
              >
                <React.Fragment key=".0">
                  {PropertyAmenitesInfo?.fields?.projectAmeneties?.data?.map(
                    (item: { src: string; caption: string; status: string }, index: number) => (
                      <BrandIcon
                        src={item.src}
                        status={item.status}
                        caption={item.caption}
                        key={`${item?.src + index}`}
                      />
                    ),
                  )}
                </React.Fragment>
              </Carousel>
              <div className={styles.disclaimer}>{PropertyAmenitesInfo?.fields?.disclaimer}</div>
            </div>

            <div id="projects" className="col-12 col-md-12 col-lg-8">
              <SectionHeader
                heading={propertyListing?.params?.heading ? propertyListing?.params?.heading : 'Projects'}
                itemProp="name"
              />
              <div>
                {propertyListing?.fields?.map((property: IPropertyCard, key: number) => {
                  return (
                    <PropertyListing
                      property={property}
                      key={`${property?.data?.propertyID + key}`}
                      currID={property?.data?.propertyID}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-12  col-md-12 col-lg-4">
              {townshipSidebar?.fields && (
                <TownshipSidebar
                  townshipSidebar={townshipSidebar?.fields}
                  readmore={townshipSidebar?.params?.ReadMoreKeyword}
                  readless={townshipSidebar?.params?.ReadLessKeyword}
                />
              )}
            </div>
            <div className={`section-row ${styles.townshipMaster}`}>
              <SectionHeader
                id="projectMasterLayout"
                heading={masterLayouts?.fields?.masterLayoutData?.heading}
                itemProp="name"
              />
              <ProjectMasterLayout property={masterLayouts?.fields?.masterLayoutData?.pointerData} />
            </div>
            <div className="section-row township-video" id="videos">
              <Testimonial
                testimonialList={testimonialList?.fields?.data}
                heading={testimonialList?.params?.ComponentTitle}
              />
            </div>
            <div id="exploreTownship">
              <SectionHeader heading={exploreTownship?.params?.ComponentTitle} itemProp="name" />
              <ExploreTownship
                exploreData={exploreTownship?.fields}
                seeallkeyword={exploreTownship?.params?.SeeAllKeyword}
                exploreTownship={exploreTownship}
              />
            </div>
          </div>

          {faq?.fields && (
            <div className="section-row section_faq">
              <Faq
                faqs={faq?.fields?.data}
                heading={faq?.params?.ComponentTitle}
                seeall={faq?.params?.SeeAllKeyword}
                seeallLink={faq?.fields?.faqLink}
              />
            </div>
          )}
        </Container>
        <div className="section-row">
          <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
        </div>
        <Container>
          {AboutAdaniHome?.fields && (
            <div className="section-row footerSection aboutPage pt-0">
              <AboutAdani
                aboutData={AboutAdaniHome?.fields}
                readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                readless={AboutAdaniHome?.params?.ReadLessKeyword}
              />
            </div>
          )}
          <div className="section-row footerSection achievements">
            <Achievements data={achievements?.fields?.data} />
          </div>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
        </Container>
      </Layout>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.townshipDetailLayout]);
    const data = filterData(res);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: 'Uh oh! Looks like there is some network issue.',
        errorMessage: JSON.stringify(error),
      },
    };
  }
};

export default TownshipDetail;
