import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  ErrorFallback,
  Faq as Faqs,
  Layout,
  Loader,
  NavigationMobile,
  ProjectInfoTabs,
  ResidentialBanner,
  TownshipAmenities,
} from '@components';
import { IPage, ITownshipAmenities } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import styles from './index.module.scss';
const Amenities: NextPage<IPage> = (props) => {
  const { data, error, errorMessage, activeTab } = props;

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    breadCrumbList,
    AboutAdaniHome,
    footer,
    header,
    mMenu,
    Achievements: achievements,
    searchData,
    Amenities,
    Infotabs,
    seoData = {},
    IntroPara,
    Faq,
    PropertyBasicInfo,
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
        PropertyBasicInfo={PropertyBasicInfo}
      >
        <Container>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
          <div className="hideDesktop">
            <NavigationMobile BackIcon={true} />
          </div>
          <div className={styles.amenitiesHeader}>
            {IntroPara?.fields && <ResidentialBanner data={IntroPara?.fields} />}
          </div>
          <div className={` ${styles.amenitiesWrapper} "section-row row"`}>
            {Infotabs?.fields?.infoTabs?.data && (
              <div className="stickyTop">
                <ProjectInfoTabs TabsData={Infotabs?.fields?.infoTabs?.data} defaultActiveTab={activeTab} />
              </div>
            )}
            <div className="section-row">
              {Amenities?.fields.map((item: ITownshipAmenities, index: number) => (
                <div key={`${item?.id + index}`} id={item?.id} className={styles.cardWrapper}>
                  <TownshipAmenities compData={item} />
                </div>
              ))}
            </div>
          </div>
          {Faq?.fields?.data && (
            <div className="section-row section_faq">
              <Faqs
                faqs={Faq?.fields?.data}
                heading={Faq?.params?.ComponentTitle}
                seeall={Faq?.params?.SeeAllKeyword}
                seeallLink={Faq?.fields?.faqLink}
              />
            </div>
          )}
          {AboutAdaniHome?.fields && (
            <div className="section-row footerSection">
              <AboutAdani aboutData={AboutAdaniHome?.fields} />
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

export const getServerSideProps: GetServerSideProps = async (Context) => {
  try {
    const activeTab = Context?.query?.category || '';
    const res = await getAllAPI([ENDPOINT.townshipAmenitiesLayout]);
    const data = filterData(res);

    return {
      props: {
        data,
        activeTab,
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

export default Amenities;
