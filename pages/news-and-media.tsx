import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  BannerInner,
  Breadcrumbs,
  ContactCta,
  ErrorFallback,
  Layout,
  Loader,
  MediaCoverageTile,
  SectionHeader,
} from '@components';
import { INewsCoverageItem, IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Col, Container } from 'react-bootstrap';

const MediaCoverage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    AboutAdaniHome,
    Achievements: achievements,
    GetInTouch,
    breadCrumbList,
    footer,
    header,
    searchData,
    mMenu,
    banner,
    mediaCourage,
    seoData = {},
  } = data;

  return (
    <div itemScope itemType="https://schema.org/ItemPage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <Container>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
          {banner?.fields[0] && (
            <div className="section-row nriBanner p-b-0">
              <SectionHeader heading={banner?.params?.ComponentTitle} h1={true} />
              <BannerInner bannerInnerData={banner?.fields[0]}></BannerInner>
            </div>
          )}
          <div className="section-row">
            <div className="row">
              {mediaCourage?.fields?.map((item: INewsCoverageItem, key: number) => (
                <Col lg={4} key={`${item?.title + key}`}>
                  <MediaCoverageTile data={item} galleryData={mediaCourage} id={key} />
                </Col>
              ))}
            </div>
          </div>
        </Container>

        {GetInTouch?.fields && (
          <div className="section-row">
            <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          </div>
        )}
        <Container>
          {AboutAdaniHome?.fields && (
            <div className="section-row footerSection aboutPage pt-0">
              <AboutAdani
                aboutData={AboutAdaniHome?.fields}
                readmore={AboutAdaniHome?.fields?.ReadMoreLabel}
                readless={AboutAdaniHome?.fields?.ReadLessLabel}
              />
            </div>
          )}
          {achievements?.fields && (
            <div className="section-row footerSection achievements">
              <Achievements data={achievements?.fields?.data} />
            </div>
          )}
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
        </Container>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.newsandmedialayout]);
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

export default MediaCoverage;
