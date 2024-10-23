import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  ClubDetailsAbout,
  ClubLandingModule,
  ClubListingBanner,
  ErrorFallback,
  Layout,
  Loader,
} from '@components';
import { IClubLandingModule, IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const ClubListing: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    Achievements: achievements,
    breadCrumbList,
    header,
    footer,
    HeroBanner,
    clubLanding,
    AboutAdaniHome,
    AboutClub,
    mMenu,
    searchData,
    seoData = {},
  } = data;

  return (
    <div itemScope itemType="https://schema.org/WebPage">
      <Layout
        headerAbsolute={true}
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        propertyType={'club'}
        searchData={searchData}
        isBordered={true}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <div className="mainHeader">
            <div className="clubBanner">
              <ClubListingBanner clublistingdata={HeroBanner?.fields} />
            </div>
          </div>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} classname={'mt-4'} />}
            <div className="section-row">
              <ClubDetailsAbout aboutClubData={AboutClub?.fields?.data} />
            </div>
            {clubLanding?.fields?.clubLanding?.map((item: IClubLandingModule, key: number) => (
              <div className="section-row" key={`${item?.clubLogo + key}`}>
                <ClubLandingModule clubLandingData={item} />
              </div>
            ))}
            <div className="section-row footerSection">
              <AboutAdani aboutData={AboutAdaniHome?.fields} />
            </div>
            <div className="section-row footerSection achievements">
              <Achievements data={achievements?.fields?.data} />
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
    const res = await getAllAPI([ENDPOINT.clubLandingLayout]);
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

export default ClubListing;
