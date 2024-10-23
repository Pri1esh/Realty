import {
  AboutAdani,
  Achievements,
  BannerInner,
  Breadcrumbs,
  ContactCta,
  Events,
  Layout,
  NavigationMobile,
  SectionHeader,
} from '@components';
import React from 'react';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import styles from './goodLife.module.scss';

const GoodLife = (props: any) => {
  const { compData } = props;

  const {
    goodlife_Banner,
    Content,
    GoodLife,
    AboutGoodLife,
    GetInTouch,
    Achievements: achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
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
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <div>
              <NavigationMobile BackIconMobileOnly={true} />
            </div>
            <div className={styles.thegoodlife}>
              <SectionHeader heading={Content?.fields?.content?.pageHeading} h1={true} />
              <BannerInner bannerInnerData={goodlife_Banner?.fields[0]}></BannerInner>
            </div>
            <div className={styles.aboutGoodLife}>
              <div
                className="section-row goodlifeIntro"
                dangerouslySetInnerHTML={{ __html: Content?.fields?.content?.pageData }}
                itemProp="description"
              />
              <div className="section-row tabs-projects">
                <SectionHeader heading={GoodLife?.params?.ComponentTitle} itemProp="headline" />
                <Events data={GoodLife?.fields} />
              </div>
            </div>
          </Container>
          <div className="section-row">
            <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          </div>
          <Container>
            <div className="section-row footerSection">
              <AboutAdani aboutData={AboutGoodLife?.fields?.aboutGoodLife} />
            </div>
            {/* <div className="section-row">
                  <Projectlist configurationTiles={ImagewithText?.fields?.configuration[0]?.items} />
                </div> */}
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

export default GoodLife;
