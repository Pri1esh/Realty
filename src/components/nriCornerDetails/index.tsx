import {
  AboutAdani,
  Achievements,
  ArticlesCarousel,
  BannerInner,
  Breadcrumbs,
  CityFeatures,
  ContactCta,
  Faq,
  Layout,
  NriCornerIntro,
  OurLocationCarousel,
  SectionHeader,
  Testimonial,
  VerticalTabs,
  WhyInvest,
} from '@components';
import { IAboutDataItem, INriCornerDetails } from '@interfaces';
import Head from 'next/head';
import React from 'react';
import { Container } from 'react-bootstrap';

const NriCornerDetails = (props: INriCornerDetails) => {
  const { data } = props;
  const {
    AboutAdaniHome,
    Achievements: achievements,
    Content,
    whyInvest,
    ourLocations,
    ourProjects,
    investmentGuidelines,
    testimonial,
    articles,
    Faq: faq,
    GetInTouch,
    // ImagewithText,
    nriBanner,
    breadCrumbList,
    footer,
    header,
    AboutNri,
    searchData,
    mMenu,
    seoData = {},
    ratingSchema,
    nriVideo,
  } = data;

  const locationData: any[] = [];
  ourLocations?.fields?.ourLocations?.data.map((item: IAboutDataItem, index: number) => {
    locationData.push({
      content: (
        <div key={`${item?.heading + index}`}>
          <React.Fragment key=".0">
            <AboutAdani
              aboutData={item}
              readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
              readless={AboutAdaniHome?.params?.ReadLessKeyword}
            />
            <CityFeatures data={item.features} />
          </React.Fragment>
        </div>
      ),
      key: `${item.cityName}`,
      title: `${item.cityName}`,
    });
  });
  return (
    <>
      <Head>
        <link
          rel="alternate"
          //eslint-disable-next-line react/no-unknown-property
          hreflang="x-default"
          href="https://www.adanirealty.com/nri-corner"
        />
        <link
          rel="alternate"
          //eslint-disable-next-line react/no-unknown-property
          hreflang="en-AE"
          href="https://www.adanirealty.com/nri-corner-uae"
        />
      </Head>
      <div itemScope itemType="https://schema.org/ItemPage">
        <Layout
          seoData={seoData?.fields}
          footerData={footer}
          headerData={header}
          searchData={searchData}
          showStickyMenu={true}
          stickyBarData={mMenu?.fields?.data}
          ratingSchema={ratingSchema?.fields?.ratingSchema}
        >
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            {nriBanner?.fields && (
              <div className="nriBanner p-b-0">
                <SectionHeader heading={nriBanner?.params?.ComponentTitle || 'NRI Corner'} h1={true} />
                <BannerInner bannerInnerData={nriBanner.fields[0]}></BannerInner>
              </div>
            )}
            {Content?.fields && (
              <div className="section-row">
                <NriCornerIntro data={Content?.fields?.content} />
              </div>
            )}

            {whyInvest?.fields && (
              <div className="section-row aboutPage whyInvest pt-0">
                <AboutAdani
                  aboutData={whyInvest?.fields?.whyInvest}
                  readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                  readless={AboutAdaniHome?.params?.ReadLessKeyword}
                />
                <WhyInvest data={whyInvest?.fields.whyInvest?.benefits} />
              </div>
            )}
            {nriVideo?.fields?.testimonial?.testimonialData && (
              <div className="section-row">
                <Testimonial testimonialList={nriVideo?.fields?.testimonial?.testimonialData} />
              </div>
            )}
            <div className="section-row ourLocations">
              <SectionHeader heading={ourLocations?.fields?.ourLocations?.heading} itemProp="headline" />
              <VerticalTabs
                className="mb-4 ourLocationTabs scrollbar-x"
                defaultActiveKey={ourLocations?.fields?.ourLocations?.data[0].cityName}
                tabData={locationData}
                transition
                horizontalTabView={true}
                isClick={true}
              />
            </div>

            {ourProjects && <OurLocationCarousel OurLocationlist={ourProjects} />}

            <div className="section-row investmentGuidelines">
              <AboutAdani
                aboutData={investmentGuidelines?.fields?.investmentGuidelines}
                readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                readless={AboutAdaniHome?.params?.ReadLessKeyword}
              />
            </div>
            {testimonial?.fields && (
              <div className="section-row">
                <Testimonial
                  testimonialList={testimonial?.fields?.testimonial?.testimonialData}
                  heading={testimonial?.fields?.testimonial?.heading}
                />
              </div>
            )}

            <div className="section-row arrow_pos" id="relatedArticles">
              <SectionHeader heading={articles?.params?.ComponentTitle} itemProp="headline" />
              <ArticlesCarousel data={articles?.fields?.data} />
            </div>

            {faq?.fields && (
              <div className="section-row section_faq">
                <Faq
                  faqs={faq?.fields?.data}
                  heading={faq?.params?.ComponentTitle}
                  seeall={faq?.params?.SeeAllKeyword}
                  seeallLink={faq?.fields?.faqLink}
                />
              </div>
            )}
          </Container>

          {GetInTouch?.fields && (
            <div className="section-row">
              <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
            </div>
          )}
          <Container>
            {AboutNri?.fields && (
              <div className="section-row footerSection aboutPage pt-0">
                <AboutAdani
                  aboutData={AboutNri?.fields?.aboutNri}
                  readmore={AboutAdaniHome?.params?.ReadMoreKeyword}
                  readless={AboutAdaniHome?.params?.ReadLessKeyword}
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
    </>
  );
};

export default NriCornerDetails;
