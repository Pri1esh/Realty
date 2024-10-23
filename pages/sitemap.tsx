import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  ErrorFallback,
  Layout,
  Loader,
  SectionHeader,
  SitemapLinks,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';

const Sitemap: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    Sitemap,
    AboutAdaniHome,
    Achievements: achievements,
    footer,
    header,
    mMenu,
    breadCrumbList,
    searchData,
    seoData = {},
  } = data;

  return (
    <div>
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main itemScope itemType="https://schema.org/WebPage">
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <div>
              <div className="sitemap">
                <SectionHeader heading={Sitemap?.params?.ComponentTitle} h1={true} />
              </div>
              <SitemapLinks sitemapDetail={Sitemap?.fields?.links} />
            </div>
            <div className="section-row footerSection aboutPage pt-0">
              <AboutAdani
                aboutData={AboutAdaniHome?.fields}
                readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                readless={AboutAdaniHome?.params?.ReadLessKeyword}
              />
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
    const res = await getAllAPI([ENDPOINT.sitemapLayout]);
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

export default Sitemap;
