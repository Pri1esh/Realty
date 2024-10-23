import {
  AboutAdani,
  Achievements,
  BrandIcon,
  Breadcrumbs,
  Button,
  Carousel,
  Configuration,
  ContactCta,
  DisclaimerSection,
  DrawResult,
  EmiCalculator,
  Faq,
  Layout,
  ProjectActions,
  ProjectFeatures,
  ProjectFloorPlan,
  ProjectHighlights,
  ProjectInfoTabs,
  ProjectLocation,
  ProjectMasterLayout,
  ProjectNameWeb,
  ProjectUnitPlans,
  ReadMore,
  ReraData,
  SectionHeader,
  SimilarProjects,
  Testimonial,
} from '@components';
import { AutoPopupForm } from '@enum';
import { IProjectDetailData, IPropertyDetail } from '@interfaces';
import { useDeviceType } from '@utils';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import useGTM from 'src/utils/useGTM';
import styles from './propertyDetail.module.scss';
const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const PropertyDetail = (props: IPropertyDetail) => {
  const { data, propertyType } = props;

  if (data?.main?.length === 0 || data?.header?.length === 0 || data?.footer?.length === 0) {
    if (typeof window !== 'undefined') {
      window.location.href = `${process.env.NEXT_PUBLIC_STAGING_LINK}/404`;
    }
  }

  const { deviceType } = useDeviceType();
  const planVisitRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [unitPlanIndex, setUnitPlanIndex] = useState<number>(-1);
  const [showUnitPlan, setShowUnitPlan] = useState<boolean>(false);
  const [showcanvas, setShowCanvas] = useState<boolean>(false);
  const [navshow, setNavShow] = useState<boolean>();
  const [pageUrl, setPageUrl] = useState<string>('');
  const [showForcedEnquiryForm, setShowForcedEnquiryForm] = useState<boolean>(false);
  const { sendEvent } = useGTM();

  useEffect(() => {
    window.addEventListener('scroll', getCurrentTab);

    return () => {
      window.removeEventListener('scroll', getCurrentTab);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const path: string | boolean =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');

    setTimeout(
      () => {
        !sessionStorage.getItem(AutoPopupForm.FormOpen) &&
          !sessionStorage.getItem(AutoPopupForm.FormSubmitted) &&
          !sessionStorage.getItem(AutoPopupForm.AutoPopupFormClosed) &&
          setShowForcedEnquiryForm(true);
      },
      data?.PropertyBasicInfo?.params?.Timeout * 1000 || 90000,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentTab = () => {
    if (planVisitRef.current && aboutRef?.current && window.scrollY > aboutRef?.current?.offsetTop - 700) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

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

  const handleModal = (index: number) => {
    setShowUnitPlan(!showUnitPlan);
    setUnitPlanIndex(index);
  };

  const {
    AboutAdaniHome,
    ContactCTA: contactCta,
    EmiCalculator: emiCalculatorData,
    Faq: faqData,
    GalleryHighlights: galleryHighlights,
    GalleryModalData: galleryModalData,
    Infotabs,
    LivingTheGoodLife,
    LocationData: locationData,
    MasterLayoutData: masterLayoutData,
    ProjectFeatures: projectFeatures,
    ProjectHighlights: projectHighlights,
    ProjectName: projectName,
    ProjectActions: ProjectAction,
    ProjectFloorPlanData,
    ProjectUnitPlanData,
    PropertyAmenitesInfo,
    SimilarProjectsData,
    breadCrumbList,
    layoutData,
    Achievements: achievements,
    AboutAdaniData,
    footer,
    header,
    PropertyBasicInfo,
    searchData,
    seoData = {},
    AanganDrawResult,
    Configurations,
  } = data;

  const isProjectCompleted = PropertyBasicInfo?.fields?.isProjectCompleted;

  return (
    <div
      itemScope
      itemType="https://schema.org/RealEstateListing"
      className={isProjectCompleted && deviceType === 'desktop' ? '' : styles.propertyDetail}
    >
      <Layout
        showAction={true}
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        propertyType={propertyType}
        projectNameData={projectName?.fields?.projectName?.title}
        PropertyBasicInfo={PropertyBasicInfo}
        searchData={searchData}
        isProjectCompleted={isProjectCompleted}
      >
        <Container>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
          <div itemProp="primaryImageOfPage" className={`section-row ${styles.propertyDisplay}`}>
            <Row className="align-items-center">
              <Col lg={5} className="col-6">
                <div className="hideMobile mb-3">
                  {projectName?.fields?.projectName && (
                    <ProjectNameWeb projectNameData={projectName?.fields?.projectName} />
                  )}
                </div>
              </Col>
              <Col lg={7} className="col-12">
                {deviceType === 'desktop' ? (
                  <>
                    {projectHighlights?.fields?.projectHighlights?.reraData &&
                      projectHighlights?.fields?.projectHighlights?.reraData[0]?.reraModal[0]?.reraid && (
                        <ReraData
                          reraInfo={projectHighlights?.fields?.projectHighlights?.reraData[0]}
                          pageUrl={pageUrl || ''}
                          projectType={projectName?.fields?.projectName?.title || ''}
                        />
                      )}
                  </>
                ) : (
                  <></>
                )}
                {ProjectAction?.fields?.projectActions && (
                  <ProjectActions
                    projectActionData={ProjectAction?.fields?.projectActions}
                    projectNameData={projectName?.fields?.projectName?.title}
                    propertyType={propertyType}
                    eventAnalyticsHandler={eventAnalyticsHandler}
                  />
                )}
              </Col>
            </Row>
            {projectHighlights?.fields && (
              <ProjectHighlights
                projectNameData={projectName?.fields?.projectName}
                projectHighlights={projectHighlights?.fields?.projectHighlights}
                galleryModalData={galleryModalData?.fields?.galleryModalData}
                galleryHighlights={galleryHighlights?.fields?.galleryHighlights}
                eventAnalyticsHandler={eventAnalyticsHandler}
              />
            )}
          </div>
          <div>
            <div className={styles.stickyTop}>
              {Infotabs?.fields?.infoTabs?.data && <ProjectInfoTabs TabsData={Infotabs?.fields?.infoTabs?.data} />}
            </div>
            {AboutAdaniData?.fields && (
              <div
                itemProp="about"
                ref={aboutRef}
                className="section-row TabscrollMargin mt-5"
                id={AboutAdaniData?.fields?.aboutAdaniData?.componentID}
              >
                <SectionHeader
                  itemProp="headline"
                  heading={AboutAdaniData?.fields?.aboutAdaniData?.aboutData?.heading}
                />
                <ReadMore
                  data={AboutAdaniData?.fields?.aboutAdaniData?.aboutData?.desc}
                  readless={AboutAdaniData?.fields?.aboutAdaniData?.readLess}
                  readmore={AboutAdaniData?.fields?.aboutAdaniData?.readMore}
                  textLength={250}
                />
              </div>
            )}
            {PropertyAmenitesInfo?.fields && (
              <div
                itemProp="subjectOf"
                className={`section-row arrow_pos Topproperty TabscrollMargin ${styles.amenitiesSection}`}
                id={PropertyAmenitesInfo?.fields?.componentID}
              >
                <SectionHeader itemProp="headline" heading={PropertyAmenitesInfo?.fields?.heading} />
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
                    {PropertyAmenitesInfo?.fields?.projectAmeneties?.data.map(
                      (item: { src: string; srcMobile: string; caption: string }, index: number) => (
                        <BrandIcon
                          src={item?.src}
                          srcMobile={item?.srcMobile}
                          caption={item?.caption}
                          key={`${item?.src + index}`}
                        />
                      ),
                    )}
                  </React.Fragment>
                </Carousel>
                {PropertyAmenitesInfo?.fields?.disclaimer && (
                  <div itemProp="description" className={styles.artisticDisclaimer}>
                    {PropertyAmenitesInfo?.fields?.disclaimer}
                  </div>
                )}
              </div>
            )}

            {projectFeatures?.fields && (
              <div
                itemProp="workExample"
                className="section-row TabscrollMargin mb-md-0"
                id={projectFeatures?.fields?.componentID}
              >
                <SectionHeader itemProp="headline" heading={projectFeatures?.fields?.heading} />
                <ProjectFeatures data={projectFeatures?.fields?.features} />
              </div>
            )}
            {masterLayoutData?.fields?.masterLayoutData && (
              <div
                itemProp="translationOfWork"
                className="section-row TabscrollMargin"
                id={masterLayoutData?.fields?.masterLayoutData?.componentID}
              >
                <SectionHeader itemProp="headline" heading={masterLayoutData?.fields?.masterLayoutData?.heading} />
                <ProjectMasterLayout property={masterLayoutData?.fields?.masterLayoutData?.pointerData} />
              </div>
            )}
            {ProjectFloorPlanData?.fields?.projectFloorPlanData && (
              <div
                itemProp="translationOfWork"
                className="section-row TabscrollMargin"
                id={ProjectFloorPlanData?.fields?.projectFloorPlanData?.componentID}
              >
                <SectionHeader
                  itemProp="headline"
                  heading={ProjectFloorPlanData?.fields?.projectFloorPlanData?.heading}
                />
                <ProjectFloorPlan floorPlanData={ProjectFloorPlanData?.fields?.projectFloorPlanData?.floorPlanData} />
              </div>
            )}

            {ProjectUnitPlanData?.fields?.projectUnitPlanData && (
              <div
                itemProp="translationOfWork"
                className={`section-row arrow_pos TabscrollMargin ${styles.UnitPlan}`}
                id={ProjectUnitPlanData?.fields?.componentID}
              >
                <SectionHeader itemProp="headline" heading={ProjectUnitPlanData?.fields?.heading} />
                <Carousel
                  className=""
                  classes=""
                  isMobSlider
                  settings={{
                    arrows: true,
                    autoplay: false,
                    dots: false,
                    infinite: false,
                    pauseOnHover: true,
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    speed: 500,
                    autoplaySpeed: 5000,
                    swipe: true,
                    centerPadding: '0',
                    responsive: [
                      {
                        breakpoint: 1199,
                        settings: { slidesToShow: 3 },
                      },
                      {
                        breakpoint: 991,
                        settings: { slidesToShow: 2.2, arrows: false },
                      },
                      {
                        breakpoint: 768,
                        settings: { slidesToShow: 1.2, arrows: false },
                      },
                      {
                        breakpoint: 500,
                        settings: { slidesToShow: 1.2, arrows: false },
                      },
                    ],
                  }}
                >
                  <React.Fragment key=".0">
                    {ProjectUnitPlanData?.fields?.projectUnitPlanData?.map(
                      (
                        item: {
                          src: string;
                          title: string;
                          imgAlt?: string;
                          desc: string;
                          link: string;
                          details: [IProjectDetailData];
                        },
                        index: number,
                      ) => (
                        <ProjectUnitPlans
                          src={item?.src}
                          title={item?.title}
                          desc={item?.desc}
                          link={item?.link}
                          imgAlt={item?.imgAlt}
                          key={`${item.link + index}`}
                          projectDetails={item?.details}
                          handleModal={handleModal}
                          setShowUnitPlan={setShowUnitPlan}
                          showUnitPlan={showUnitPlan}
                          index={index}
                          unitPlanIndex={unitPlanIndex}
                          setUnitPlanIndex={setUnitPlanIndex}
                        />
                      ),
                    )}
                  </React.Fragment>
                </Carousel>
              </div>
            )}
            {locationData?.fields &&
              locationData?.fields?.locationData?.longitude !== '' &&
              locationData?.fields?.locationData?.latitude !== '' && (
                <div
                  itemProp="locationCreated"
                  className="section-row TabscrollMargin"
                  id={locationData?.fields?.locationData?.componentID}
                >
                  <SectionHeader itemProp="headline" heading={locationData?.fields?.locationData?.heading} />
                  <ProjectLocation
                    projectTitle={layoutData?.fields?.layoutData?.projectTitle}
                    // latitude={locationData?.fields?.locationData?.latitude}
                    // longitude={locationData?.fields?.locationData?.longitude}
                    // magnifyBy={15}
                    // imgLogo={locationData?.fields?.locationData?.imgLogo}
                    projectLocation={locationData?.fields?.locationData?.projectLocation}
                    // markerTitle={locationData?.fields?.locationData?.markerTitle}
                    mapUrl={locationData?.fields?.locationData?.mapUrl}
                    contactUsLabel={locationData?.fields?.locationData?.contactUsLabel}
                  />
                </div>
              )}
            {AanganDrawResult?.fields && (
              <div className="section-row" id={AanganDrawResult?.fields?.id}>
                <DrawResult drawResultData={AanganDrawResult?.fields} />
              </div>
            )}
          </div>

          <div className="calcSection">
            {emiCalculatorData?.fields && (
              <EmiCalculator emiCalculatorData={emiCalculatorData?.fields?.emiCalculatorData} />
            )}
          </div>
          <div>
            {LivingTheGoodLife?.fields && (
              <div className="section-row">
                <Testimonial
                  heading={LivingTheGoodLife?.fields?.livingTheGoodLifeData?.heading}
                  testimonialList={LivingTheGoodLife?.fields?.livingTheGoodLifeData?.testimonialData}
                />
              </div>
            )}
          </div>
          {SimilarProjectsData?.fields?.similarProjectsData && (
            <div className="section-row arrow_pos similarProjects">
              <SectionHeader itemProp="headline" heading={SimilarProjectsData?.fields?.similarProjectsData?.heading} />
              <Carousel
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
                      breakpoint: 991,
                      settings: { slidesToShow: 2, arrows: true },
                    },
                    {
                      breakpoint: 500,
                      settings: { slidesToShow: 1.2, arrows: false, infinite: false },
                    },
                  ],
                }}
              >
                <React.Fragment key=".0">
                  {SimilarProjectsData?.fields?.similarProjectsData?.data?.map(
                    (
                      item: {
                        src: string;
                        logosrc: string;
                        title: string;
                        type: string;
                        status: string;
                        link: string;
                        linkTarget: string;
                      },
                      index: number,
                    ) => (
                      <>
                        <SimilarProjects
                          src={item.src}
                          logosrc={item.logosrc}
                          title={item.title}
                          type={item.type}
                          status={item.status}
                          link={`${item.link}`}
                          key={`${item.src + index}`}
                          linkTarget={item.linkTarget}
                        />
                      </>
                    ),
                  )}
                </React.Fragment>
              </Carousel>
            </div>
          )}
          <div className="section-row section_faq">
            {faqData?.fields?.faqData && (
              <Faq
                faqs={faqData?.fields?.faqData?.faqs}
                heading={faqData?.fields?.faqData?.heading}
                seeall={faqData?.fields?.faqData?.seeAll}
                seeallLink={faqData?.fields?.faqData?.faqLink}
              />
            )}
          </div>
        </Container>
        {!isProjectCompleted && (
          <div className="section-row">
            {contactCta?.fields && (
              <ContactCta
                getInTouchdata={contactCta?.fields?.contactCtaData}
                propertyType={propertyType}
                projectNameData={projectName?.fields?.projectName?.title}
              />
            )}
          </div>
        )}
        <Container>
          <div className="section-row footerSection aboutPage pt-0">
            {AboutAdaniHome?.fields && (
              <AboutAdani
                aboutData={AboutAdaniHome?.fields}
                readmore={AboutAdaniHome?.fields?.ReadMoreLabel}
                readless={AboutAdaniHome?.fields?.ReadLessLabel}
                description={AboutAdaniHome?.fields?.description}
              />
            )}
            <div className="mt-4">
              <DisclaimerSection
                imageDisclaimer={AboutAdaniHome?.fields?.imageDisclaimer}
                emiDisclaimer={AboutAdaniHome?.fields?.emiDisclaimer}
                headingDisclaimer={AboutAdaniHome?.fields?.headingDisclaimer}
              />
            </div>
          </div>
          {Configurations?.fields?.length > 0 && <Configuration compData={Configurations?.fields} />}
          {achievements?.fields && (
            <div className="section-row footerSection achievements">
              <Achievements data={achievements?.fields?.data} />
            </div>
          )}
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
        </Container>
        {isProjectCompleted ? (
          deviceType !== 'desktop' && (
            <div
              className={`${styles.footerAction} ${styles.isCompletedProject} ${navshow ? '' : 'd-none '}`}
              ref={planVisitRef}
            >
              <Container>
                {ProjectAction?.fields?.projectActions?.enquireNow && (
                  <ul>
                    {showcanvas && (
                      <EnquiryFormHelper
                        isPopup={true}
                        setShow={setShowCanvas}
                        showForm={showcanvas}
                        propertyType={propertyType}
                        projectNameData={projectName?.fields?.projectName?.title}
                        isProjectCompleted={isProjectCompleted}
                      />
                    )}
                    <li>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        size="sm"
                        onClick={() => {
                          setShowCanvas(true);
                          eventAnalyticsHandler('enquire_now', 'Enquire Now');
                        }}
                      >
                        {ProjectAction?.fields?.projectActions?.enquireNow}
                      </Button>
                    </li>
                  </ul>
                )}
              </Container>
            </div>
          )
        ) : (
          <div className={navshow ? styles.footerAction : `${styles.footerAction} d-none `} ref={planVisitRef}>
            <Container>
              {layoutData?.fields?.layoutData && (
                <ul>
                  <li className="hideMobile">
                    <h3 itemProp="headline">{layoutData?.fields?.layoutData?.projectTitle}</h3>
                    <div itemProp="description">
                      {layoutData?.fields?.layoutData?.projectConfiguration} <span></span>
                      {layoutData?.fields?.layoutData?.projectPossesionInfo}
                    </div>
                  </li>
                  {showcanvas && (
                    <EnquiryFormHelper
                      isPopup={true}
                      setShow={setShowCanvas}
                      showForm={showcanvas}
                      propertyType={propertyType}
                      projectNameData={projectName?.fields?.projectName?.title}
                    />
                  )}
                  {deviceType === 'desktop' ? (
                    <></>
                  ) : (
                    <>
                      <li>
                        <Button
                          variant="outline-secondary"
                          className="w-100"
                          size="sm"
                          onClick={() => {
                            setShowCanvas(true);
                            eventAnalyticsHandler('enquire_now', 'Enquire Now');
                          }}
                        >
                          {ProjectAction?.fields?.projectActions?.enquireNow}
                        </Button>
                      </li>
                    </>
                  )}
                  <li>
                    <Button
                      variant="primary"
                      className="w-100"
                      size="sm"
                      onClick={() => {
                        setShow(!show);
                        eventAnalyticsHandler('plan_a_visit', 'Plan a Visit');
                      }}
                    >
                      {layoutData?.fields?.layoutData?.planAVisitLabel}
                    </Button>
                    {show && (
                      <EnquiryFormHelper
                        enquiryfield={false}
                        planvisit={true}
                        isPopup={true}
                        setShow={setShow}
                        propertyLocation={layoutData?.fields?.layoutData?.projectTitle}
                        showForm={show}
                      />
                    )}
                  </li>
                </ul>
              )}
            </Container>
          </div>
        )}
        {!isProjectCompleted && showForcedEnquiryForm && (
          <>
            <EnquiryFormHelper
              isPopup={true}
              setShow={setShowForcedEnquiryForm}
              showForm={showForcedEnquiryForm}
              propertyType={propertyType}
              projectNameData={projectName?.fields?.projectName?.title}
              autoPopup={true}
            />
          </>
        )}
      </Layout>
    </div>
  );
};

export default PropertyDetail;
