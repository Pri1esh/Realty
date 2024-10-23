import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  Carousel,
  ContactData,
  ErrorFallback,
  Layout,
  Loader,
  RestaurantCard,
  SectionHeader,
} from '@components';
import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { ENDPOINT, getAllAPI } from '@api-manager';
import { IPage, IRestaurantCard } from '@interfaces';
import { filterData } from '@utils';
import dynamic from 'next/dynamic';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './index.module.scss';

const EnquiryFormHelper = dynamic(() => import('src/components/Modal/contactCtaModal/enquiryFormHelper'));

const ContactUs: NextPage<IPage> = (props) => {
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
    officesData,
    PageData,
    Achievements: achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    seoData = {},
    searchData,
    AboutAdaniHome,
  } = data;
  return (
    <div className="contactUs" itemScope itemType="https://schema.org/ContactPage">
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
          <div className="section-row">
            <Row className={styles.bookingLayout}>
              <Col lg={6}>
                <ContactData staticText={PageData?.fields?.pageData} />
              </Col>
              <Col lg={6} className={`${styles.order1} ${styles.contactForm}`}>
                <EnquiryFormHelper
                  typeDropdown={false}
                  configuration={false}
                  projectType={false}
                  purpose={true}
                  firstlastname={false}
                  completeName={true}
                  doubleColumn={false}
                  singleColumn={true}
                  homeloancheck={true}
                  isContactUs={true}
                />
              </Col>
            </Row>
          </div>
        </Container>
        <div className={`section-row ${styles.contactOffices}`}>
          <div className={styles.officeSection}>
            <Container>
              <SectionHeader heading={officesData?.fields?.heading} itemProp="headline" />
              <Carousel
                className=""
                classes=""
                isMobSlider
                settings={{
                  arrows: false,
                  autoplay: false,
                  autoplaySpeed: 2000,
                  dots: false,
                  infinite: false,
                  pauseOnHover: false,
                  slidesToScroll: 1,
                  slidesToShow: 5,
                  speed: 500,
                  swipe: true,
                  responsive: [
                    {
                      breakpoint: 991,
                      settings: { slidesToShow: 2.25 },
                    },
                    {
                      breakpoint: 1199,
                      settings: { slidesToShow: 3.25 },
                    },
                    {
                      breakpoint: 768,
                      settings: { slidesToShow: 2 },
                    },
                    {
                      breakpoint: 500,
                      settings: { slidesToShow: 1.5, infinite: false, autoplay: false, arrows: false },
                    },
                  ],
                }}
              >
                <React.Fragment key=".0">
                  {officesData?.fields?.data.map((item: IRestaurantCard, index: number) => (
                    <RestaurantCard
                      officeAddress={true}
                      restaurantData={false}
                      thumbLogo={false}
                      key={`${(item?.title ?? '') + index}`}
                      src={item.src}
                      title={item.title}
                      address={item.address}
                    />
                  ))}
                </React.Fragment>
              </Carousel>
            </Container>
          </div>
        </div>
        <Container>
          <div className="section-row footerSection">
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
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.contactusLayout]);
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

export default ContactUs;
