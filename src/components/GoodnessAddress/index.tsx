import {
  AboutAdani,
  Achievements as Achievement,
  BannerInner,
  Breadcrumbs,
  ContactCta,
  Events,
  Layout,
  NavigationMobile,
  SectionHeader,
  Testimonial,
} from '@components';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import styles from './goodnessAddress.module.scss';

const GoodnessAddress = (props: any) => {
  const { compData } = props;

  const {
    goodlife_Banner,
    GetInTouch,
    Achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
    testimonial,
    GoodLife,
    AboutGoodLife,
    AOGBrief,
    seoData = {},
  } = compData;
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
        <main>
          <Container>
            {breadCrumbList && <Breadcrumbs list={breadCrumbList?.fields} />}
            <div>
              <NavigationMobile BackIconMobileOnly={true} />
            </div>
            <div className={styles.thegoodlife}>
              <SectionHeader heading={AOGBrief?.fields?.pageHeading} h1={true} />
              <BannerInner bannerInnerData={goodlife_Banner?.fields[0]}></BannerInner>
            </div>
            <div className={styles.aboutGoodLife}>
              <div className="section-row">
                {AOGBrief?.fields && (
                  <h2 className={styles.textGradient}>
                    <span>{AOGBrief?.fields?.pageHeadingInGradiant}</span>
                    <sup>{AOGBrief?.fields?.sup}</sup>
                  </h2>
                )}
                {AOGBrief?.fields?.subHeading && <h3>{AOGBrief?.fields?.subHeading}</h3>}
                {AOGBrief?.fields?.description && (
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: AOGBrief?.fields?.description }}
                  />
                )}
              </div>
            </div>
            {GoodLife?.fields?.data && (
              <div className={`section-row tabs-projects ${styles.eventHeading}`}>
                <SectionHeader heading={GoodLife?.params?.ComponentTitle} />
                <Events data={GoodLife?.fields} />
              </div>
            )}
            {testimonial?.fields?.testimonial && (
              <div className="section-row">
                <Testimonial
                  testimonialList={testimonial?.fields?.testimonial?.testimonialData}
                  heading={testimonial?.fields?.testimonial?.heading}
                />
              </div>
            )}
          </Container>
          {GetInTouch && (
            <div className="section-row">
              <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
            </div>
          )}
          <Container>
            {AboutGoodLife && (
              <div className="section-row footerSection">
                <AboutAdani aboutData={AboutGoodLife?.fields?.aboutGoodLife} />
              </div>
            )}
            {Achievements && (
              <div className="section-row footerSection achievements">
                <Achievement data={Achievements?.fields?.data} />
              </div>
            )}
            {breadCrumbList && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export default GoodnessAddress;
