import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  CareerBanner,
  EmployeeCare,
  ErrorFallback,
  HeroAtWork,
  Layout,
  Loader,
  OurStories,
  OurValues,
  SectionHeader,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';

const Career: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    careerbanner: careerbannerdata,
    AboutAdaniHome,
    Achievements: Achievementsdata,
    ImagewithText: ImagewithTextdata,
    // LeadersData: LeadersDatalist,
    eployeeCare: EmployeeCarelist,
    'Employee Card': employeeCareCardlist,
    //ImagewithText,
    testimonialList,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
    seoData = {},
  } = data;

  return (
    <div itemScope itemType="https://schema.org/WebPage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <Container className="CareerAtAdani">
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <SectionHeader heading={careerbannerdata?.params?.CareerBannerHeadingText} h1={true} />
            <CareerBanner careerbannerdata={careerbannerdata?.fields} />

            <div className="section-row why-adani">
              <SectionHeader itemProp="headline" heading={ImagewithTextdata?.params?.ourValuesHeading} />
              <OurValues OurValuesData={ImagewithTextdata?.fields?.ourValues?.items} />
            </div>
          </Container>
          <div className="section-row overflow-hidden">
            <Container>
              <EmployeeCare
                EmployeeCarelist={EmployeeCarelist?.fields?.data[0]}
                employeeCareCardlist={employeeCareCardlist?.fields?.employeeCareCard}
              />
            </Container>
          </div>

          <div className="section-row">
            <HeroAtWork testimonials={testimonialList} />
          </div>
          <Container>
            {ImagewithTextdata?.params?.ourStoriesHeading && (
              <OurStories
                stories={ImagewithTextdata?.fields?.ourStories}
                heading={ImagewithTextdata?.params?.ourStoriesHeading}
              />
            )}
          </Container>
          <Container>
            <div className="section-row footerSection aboutPage">
              {AboutAdaniHome?.fields && (
                <AboutAdani
                  aboutData={AboutAdaniHome?.fields}
                  readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                  readless={AboutAdaniHome?.params?.ReadLessKeyword}
                />
              )}
            </div>
            {/* <div className="section-row">
              <Projectlist configurationTiles={ImagewithText?.fields?.configuration[0]?.items} />
            </div> */}
            <div className="section-row footerSection achievements">
              <Achievements data={Achievementsdata?.fields?.data} />
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
    const res = await getAllAPI([ENDPOINT.careerLayout]);
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

export default Career;
