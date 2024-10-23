import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  AccoladesList,
  Achievements,
  Breadcrumbs,
  ContactCta,
  CustomImage,
  ErrorFallback,
  Layout,
  Loader,
  NavigationMobile,
  SectionHeader,
} from '@components';
import { IPage } from '@interfaces';
import { filterData, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import styles from './index.module.scss';

const Accolades: NextPage<IPage> = (props) => {
  const { deviceType } = useDeviceType();
  const { data, error, errorMessage } = props;
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  // ImagewithText
  const {
    accoladesBanner,
    Allaccolades,
    AboutAdaniHome,
    GetInTouch,
    Achievements: achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
    seoData = {},
  } = data;
  const getComponent = () => {
    switch (true) {
      case deviceType === 'desktop':
        return (
          <div className={styles.accoladesBannerWrapper}>
            {accoladesBanner?.fields[0]?.title && (
              <span className={styles.imgType}>{accoladesBanner?.fields[0]?.title}</span>
            )}
            <CustomImage
              src={accoladesBanner?.fields[0]?.src}
              alt={accoladesBanner?.fields[0]?.alt}
              className="imgBackground"
            />
          </div>
        );
      case !!accoladesBanner?.fields[0]?.srcMobile:
        return (
          <div className={`${styles.accoladesBannerWrapper} ${styles.accoladesBannerMobile}`}>
            {accoladesBanner?.fields[0]?.title && (
              <span className={styles.imgType}>{accoladesBanner?.fields[0]?.title}</span>
            )}
            <CustomImage
              itemProp="image"
              src={accoladesBanner?.fields[0]?.srcMobile}
              alt={accoladesBanner?.fields[0]?.alt}
              className="imgBackground"
            />
          </div>
        );
      default:
        return (
          <div className={`${styles.accoladesBannerWrapper} ${styles.accoladesBannerMobile}`}>
            {accoladesBanner?.fields[0]?.title && (
              <span className={styles.imgType}>{accoladesBanner?.fields[0]?.title}</span>
            )}
            <CustomImage
              itemProp="image"
              src={accoladesBanner?.fields[0]?.src}
              alt={accoladesBanner?.fields[0]?.alt}
              className="imgBackground"
            />
          </div>
        );
    }
  };
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
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <div className="hideDesktop">
              <NavigationMobile BackIcon={true} />
            </div>
            <div className={styles.accoladesBanner}>
              <SectionHeader heading="Accolades" h1={true} />

              {getComponent()}
            </div>
            <div>
              <AccoladesList accoladesData={Allaccolades?.fields?.data} />
            </div>
          </Container>
          <div className="section-row">
            <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          </div>
          <Container>
            <div className="section-row footerSection">
              {AboutAdaniHome?.fields && (
                <AboutAdani
                  aboutData={AboutAdaniHome?.fields}
                  readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                  readless={AboutAdaniHome?.params?.ReadLessKeyword}
                />
              )}
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
    const res = await getAllAPI([ENDPOINT.accoladesLayout]);
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

export default Accolades;
