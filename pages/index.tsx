import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  ArrowScrollDown,
  ClubSection,
  ContactCta,
  Disclaimer,
  ErrorFallback,
  Faq,
  HomeCityProjectDetails,
  Layout,
  Loader,
  Mainbanner,
  PropertyTabCarousel,
  SearchProject,
  SearchProjectMobile,
  SectionHeader,
  SocialSection,
  Testimonial,
  TownshipCard,
} from '@components';
import { IPage } from '@interfaces';
import { buildVersioinWarning, filterData, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import AppCookie from 'src/components/AppCookie';
import styles from './index.module.scss';

declare const __VERSION__: string, __GIT_VERSION__: string, __BUILD_TIME__: number;
buildVersioinWarning(__VERSION__, __GIT_VERSION__, __BUILD_TIME__);

const Home: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const searchProjectRef = useRef<HTMLDivElement | null>(null);
  const searchProjectRefMob = useRef<HTMLDivElement | null>(null);
  const mainBannerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [mobActive, setMobActive] = useState<boolean>(false);
  const [isDisclaimer, setIsDisclaimer] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { deviceType } = useDeviceType();

  const setCookie = (name: string) => {
    document.cookie = name + '=accepted; path=/';
  };

  const disclaimerHandler = () => {
    setCookie('disclaimer');
    setIsDisclaimer(true);
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove('disclaimerOpen');
  };
  const getCookie = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  };

  const setSearchSticky = () => {
    if (
      // searchProjectRef.current &&
      mainBannerRef.current &&
      window.scrollY > mainBannerRef.current.offsetHeight - 170
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (searchProjectRefMob.current && window.scrollY > searchProjectRefMob.current.offsetTop + 100) {
      setMobActive(true);
    } else {
      setMobActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setSearchSticky);
    const hasDisclaimerCookie = getCookie('disclaimer');
    if (hasDisclaimerCookie) {
      setIsDisclaimer(true);
    }
    return () => {
      window.removeEventListener('scroll', setSearchSticky);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorFallback error={error} errorMessage={errorMessage} />;
  }

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    AboutAdaniHome,
    Achievements: achievements,
    Faq: faq,
    GetInTouch,
    brandIcons,
    clubData,
    commercialPropertyall,
    feedsdata,
    mainbanner,
    residentialPropertyall,
    searchData,
    testimonialList,
    townshipsList,
    Policy,
    footer,
    header,
    seoData = {},
    mMenu,
  } = data;

  return (
    <div itemScope itemType="https://schema.org/WebPage" className="homePage">
      <h1 itemProp="name" className="visually-hidden">
        {seoData?.fields?.pageTitle || 'Welcome to Adani Realty'}
      </h1>
      <Layout
        headerAbsolute={true}
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        showBackHeader={false}
        searchData={searchData}
        reference={searchProjectRef}
        searchActive={active}
        showStickyMenu={true}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        stickyBarData={mMenu?.fields?.data}
        isHomePage={true}
      >
        <div onClick={() => setOpenSearch(true)}>
          {searchData?.fields && (
            <SearchProjectMobile
              search={searchData?.params?.SearchProjectKeyword}
              reference={searchProjectRefMob}
              mobActive={mobActive}
            />
          )}
        </div>
        {mainbanner?.fields?.data && (
          <div className={styles.mainHeader}>
            <div className="d-lg-block d-none">
              <SearchProject searchProjectData={searchData} reference={searchProjectRef} isActive={active} />
            </div>
            <div className={`overflow-hidden ${styles.bannerBox}`} ref={mainBannerRef}>
              <Mainbanner bannerData={mainbanner} parent={'Home page banner'} />
              {deviceType === 'desktop' ? <ArrowScrollDown scrollRef={scrollRef} /> : <></>}
            </div>
          </div>
        )}

        <main>
          <Container>
            <div className="section-row pt-5" ref={scrollRef}>
              {brandIcons?.fields?.data && <HomeCityProjectDetails projectcitydata={brandIcons?.fields?.data} />}
            </div>
            <div className="section-row tabs-projects">
              {residentialPropertyall?.fields && (
                <PropertyTabCarousel propertyAll={residentialPropertyall} propertyType={'residential'} />
              )}
            </div>

            <div className="section-row tabs-projects">
              {commercialPropertyall?.fields && (
                <PropertyTabCarousel propertyAll={commercialPropertyall} propertyType={'commercial'} />
              )}
            </div>
          </Container>
          <div className="section-row">
            <Container>
              {clubData?.params?.ComponentTitle && (
                <SectionHeader itemProp="headline" heading={clubData?.params?.ComponentTitle} />
              )}
            </Container>
            {clubData?.fields?.items && <ClubSection clubData={clubData?.fields?.items} />}
          </div>
          <Container>
            <Row>
              <Col>
                <div className="section-row arrow_pos townshipWrap">
                  {townshipsList?.params?.ComponentTitle && (
                    <SectionHeader itemProp="headline" heading={townshipsList?.params?.ComponentTitle} />
                  )}
                  {townshipsList?.fields?.items && <TownshipCard items={townshipsList?.fields?.items} />}
                </div>
                <div className="section-row">
                  <Testimonial
                    testimonialList={testimonialList?.fields?.data}
                    heading={testimonialList?.params?.ComponentTitle}
                  />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="section-row">
            <SocialSection feedsdata={feedsdata?.fields} feedsImage={feedsdata?.params} />
          </div>
          <Container>
            <Row>
              <Col>
                {AboutAdaniHome?.fields && (
                  <div className="section-row aboutPage pt-0">
                    <AboutAdani
                      aboutData={AboutAdaniHome?.fields}
                      readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                      readless={AboutAdaniHome?.params?.ReadLessKeyword}
                    />
                  </div>
                )}
                {achievements?.fields && (
                  <div className="section-row achievementsHome">
                    <Achievements data={achievements?.fields?.data} />
                  </div>
                )}

                {faq?.fields?.data && (
                  <div className="section-row section_faq">
                    <Faq
                      faqs={faq?.fields?.data}
                      heading={faq?.params?.ComponentTitle}
                      seeall={faq?.params?.SeeAllKeyword}
                      seeallLink={faq?.fields?.faqLink}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </main>

        <div className="contactHome">
          {GetInTouch?.fields && <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />}
        </div>

        <Disclaimer
          heading={Policy?.fields?.disclaimer?.heading}
          content={Policy?.fields?.disclaimer?.content}
          btnText={Policy?.fields?.disclaimer?.btnText}
          disclaimerLogo={Policy?.fields?.disclaimer?.disclaimerLogo}
          logoAlt={Policy?.fields?.disclaimer?.logoAlt}
          disclaimerHandler={disclaimerHandler}
        />

        {isDisclaimer && <AppCookie />}
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.homepageLayout]);
    const data = filterData(res);
    // const device = getDeviceTypeServerSide(Context?.req?.headers['user-agent']);

    return {
      props: {
        data,
        // device,
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

export default Home;
