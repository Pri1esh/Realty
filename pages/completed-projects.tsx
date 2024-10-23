import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  CertificateHeader,
  CompletedProjectsList,
  ErrorFallback,
  Layout,
  Loader,
  ProjectInfoTabs,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';

const CompletedProjects: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  const {
    footer,
    header,
    mMenu,
    cityTabs,
    breadCrumbList,
    AboutAdaniHome,
    Achievements: achievements,
    banner,
    ProjectList,
    seoData = {},
    searchData,
    PropertyBasicInfo,
  } = data;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  return (
    <div itemScope itemType="https://schema.org/WebPage" className="TownshipDetail">
      <Layout
        footerData={footer}
        headerData={header}
        seoData={seoData?.fields}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
        searchData={searchData}
        PropertyBasicInfo={PropertyBasicInfo}
      >
        <main>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            {banner.fields && banner.fields.length > 0 && <CertificateHeader data={banner.fields[0]} />}
            <div className="row">
              {cityTabs?.fields && (
                <div className="stickyTop">
                  <ProjectInfoTabs TabsData={cityTabs?.fields} />
                </div>
              )}
              {ProjectList?.fields && <CompletedProjectsList list={ProjectList?.fields} />}
            </div>
            {AboutAdaniHome?.fields && (
              <div className="section-row footerSection">
                <AboutAdani
                  aboutData={AboutAdaniHome?.fields}
                  readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                  readless={AboutAdaniHome?.params?.ReadLessKeyword}
                />
              </div>
            )}
            {achievements?.fields?.data && (
              <div className="section-row footerSection achievements">
                <Achievements data={achievements?.fields?.data} />
              </div>
            )}
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.completedProjectsLayout]);
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

export default CompletedProjects;
