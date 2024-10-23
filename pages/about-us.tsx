import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  AboutUsBanner,
  AboutUsHighlights,
  AboutUsTimelineCarousel,
  Achievements,
  Breadcrumbs,
  ContactCta,
  ErrorFallback,
  Layout,
  LeaderShipCarousel,
  Loader,
  OurBrands,
  OurLocationCarousel,
  SectionHeader,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';

const AboutUs: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    timeline,
    OurBrands: ourBrandslist,
    ourPartners,
    township,
    OurLocation: OurLocationlist,
    LeadersData,
    Achievements: AchievementsDatalist,
    aboutUsBanner,
    GetInTouch,
    AboutAdaniHome,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
    seoData = {},
  } = data;

  return (
    <div itemScope itemType="https://schema.org/AboutPage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <div className="container">{breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}</div>
        <div className="section-row">
          <AboutUsBanner aboutUsBanner={aboutUsBanner?.fields[0]} />
        </div>
        <main>
          <Container>
            <div className="section-row">{timeline && <AboutUsTimelineCarousel data={timeline?.fields?.data} />}</div>
            <div className="section-row">
              <SectionHeader heading={ourBrandslist?.params?.ComponentTitle} itemProp="name" />
              {OurBrands && <OurBrands ourBrandsData={ourBrandslist?.fields?.ourBrands?.data} />}
            </div>

            <div className="section-row">
              <SectionHeader heading={ourPartners?.fields?.heading} itemProp="name" />
              {ourPartners && <OurBrands ourBrandsData={ourPartners?.fields?.data} />}
            </div>

            <div className="section-row">{township && <AboutUsHighlights highlightsData={township?.fields} />}</div>
            {OurLocationlist && <OurLocationCarousel OurLocationlist={OurLocationlist} />}
            {LeadersData && <LeaderShipCarousel LeadersData={LeadersData} />}
          </Container>
          <div className="section-row">
            <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          </div>
          <Container>
            <div className="section-row footerSection">
              <AboutAdani
                aboutData={AboutAdaniHome?.fields}
                readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                readless={AboutAdaniHome?.params?.ReadLessKeyword}
              />
            </div>

            <div className="section-row footerSection achievements">
              <Achievements data={AchievementsDatalist?.fields?.data} />
            </div>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.aboutusLayout]);
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

export default AboutUs;
