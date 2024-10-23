import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  ContactCta,
  CustomImage,
  ErrorFallback,
  GoodnessBanner as GoodnessBanners,
  Layout,
  Loader,
  NavigationMobile,
  SectionHeader,
  WhyAdaniDescription,
  WhyAdaniHighlights,
} from '@components';
import { IPage, IWhyAdaniDescription, IWhyAdaniHighlights } from '@interfaces';
import { filterData, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { Container } from 'react-bootstrap';
import styles from './index.module.scss';

const WhyAdani: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const { deviceType } = useDeviceType();
  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    mainbanner,
    WhyAdani,
    breadCrumbList,
    AboutAdaniHome,
    GetInTouch,
    footer,
    header,
    mMenu,
    Achievements: achievements,
    searchData,
    GoodnessBanner,
    seoData = {},
    // TODO: In future, goodnessBanner data will be used here
  } = data;
  const getComponent = () => {
    switch (true) {
      case deviceType === 'desktop':
        return (
          <div className={styles.innerBanner}>
            {mainbanner.fields?.data[0].imgtype && (
              <span className={styles.imgType}>{mainbanner.fields?.data[0].imgtype}</span>
            )}
            <CustomImage
              src={mainbanner.fields?.data[0].thumb}
              className="img-fluid imgBackground"
              alt={mainbanner.fields?.data[0].thumbalt ? mainbanner.fields?.data[0].thumbalt : 'Adani Realty'}
              itemProp="primaryImageOfPage"
            />
          </div>
        );
      case mainbanner.fields?.data[0].srcMobile !== '':
        return (
          <div className={styles.innerBanner}>
            {mainbanner.fields?.data[0].imgtype && (
              <span className={styles.imgType}>{mainbanner.fields?.data[0].imgtype}</span>
            )}
            <CustomImage
              src={mainbanner.fields?.data[0].srcMobile}
              className="img-fluid imgBackground"
              alt={mainbanner.fields?.data[0].thumbalt ? mainbanner.fields?.data[0].thumbalt : 'Adani Realty'}
              itemProp="primaryImageOfPage"
            />
          </div>
        );
      default:
        return (
          <div className={styles.innerBanner}>
            {mainbanner.fields?.data[0].imgtype && (
              <span className={styles.imgType}>{mainbanner.fields?.data[0].imgtype}</span>
            )}
            <CustomImage
              src={mainbanner.fields?.data[0].thumb}
              className="img-fluid imgBackground"
              alt={mainbanner.fields?.data[0].thumbalt ? mainbanner.fields?.data[0].thumbalt : 'Adani Realty'}
              itemProp="primaryImageOfPage"
            />
          </div>
        );
    }
  };
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
          <div className="hideDesktop">
            <NavigationMobile BackIcon={true} />
          </div>
          <div className={`section-row ${styles.whyAdaniHeader}`}>
            <SectionHeader heading={WhyAdani?.fields?.aboutAdani?.heading} h1={true} />
            {/* <ReadMore
              data={`${WhyAdani?.fields?.aboutAdani?.about} ${WhyAdani?.fields?.aboutAdani?.readmore}`}
              textLength={450}
            /> */}
            {getComponent()}
          </div>
          <div className="section-highlights">
            {WhyAdani?.fields?.aboutAdani?.blockHeading.map((item: IWhyAdaniDescription, index: number) => (
              <WhyAdaniDescription heading={item.heading} key={`${(item?.heading || '') + index}`} />
            ))}
          </div>
          <div>
            {WhyAdani?.fields?.whyushighlights?.data.map((item: IWhyAdaniHighlights, index: number) => (
              <div key={`${(item?.heading ?? '') + index}`}>
                <WhyAdaniHighlights
                  src={item.src}
                  aligncol={item.dataAlign}
                  heading={item.title}
                  subheading={item.subHeading}
                  description={item.description}
                  imageAlt={item.imageAlt}
                  imageTitle={item.imageTitle}
                  imgType={item.imgType}
                />
              </div>
            ))}
          </div>
          {/* <div>
            {WhyAdani?.fields?.bottomQuote?.data.map((item: any, index: number) => (
              <WhyAdaniHighlightsHeading
                key={index}
                sectionheading={item.sectionHeading}
                iconprimary={item.iconPrimary}
                iconsecondary={item.iconSecondary}
              />
            ))}
          </div> */}
          {GoodnessBanner && (
            <div className="section-row">
              <GoodnessBanners compData={GoodnessBanner?.fields} />
            </div>
          )}
        </Container>
        {GetInTouch?.fields && (
          <div className="section-row">
            <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          </div>
        )}
        <Container>
          <div className="section-row footerSection">
            <AboutAdani aboutData={AboutAdaniHome?.fields} />
          </div>
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
    const res = await getAllAPI([ENDPOINT.whyAdaniLayout]);
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

export default WhyAdani;
