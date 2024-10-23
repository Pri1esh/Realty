import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  CertificateHeader,
  Certificates,
  ErrorFallback,
  Layout,
  Loader,
  ProjectInfoTabs,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import ENDPOINT from '../src/api-manager/endpoints';
import { getAllAPI } from '../src/api-manager/manager';

const Certifications: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  const [pageUrl, setPageUrl] = useState<string>('');

  useEffect(() => {
    const path: string | boolean =
      window.location.pathname.includes('/') &&
      window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
    setPageUrl(path || 'home');
  }, []);

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
    certificates,
    searchData,
    seoData = {},
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
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <CertificateHeader data={banner.fields[0]} />
            <div className="row">
              <div className="stickyTop">
                <ProjectInfoTabs TabsData={cityTabs?.fields} />
              </div>
              {certificates?.fields && <Certificates list={certificates?.fields} pageUrl={pageUrl} />}
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
    const res = await getAllAPI([ENDPOINT.certificationLayout]);
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

export default Certifications;
