import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  Achievements,
  Breadcrumbs,
  ErrorFallback,
  Layout,
  Loader,
  Offcanvas,
  OffcanvasHeading,
  PageContent,
  PagelinksNavigation,
  QuicklinksOffCanvas,
} from '@components';
import { IPage } from '@interfaces';
import { filterData, getIconFromIconName, getQuicklinksBreadcrumbs, getQuicklinksData, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import styles from './index.module.scss';

const Terms: NextPage<IPage> = (props: any) => {
  const { data, termsData, pageHeading, breadcrumbsData, error, errorMessage } = props;

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { deviceType } = useDeviceType();
  const [isSelected, setIsSelected] = useState('termsandCondition');

  const handleCanvas = () => {
    setShow(true);
    setOpen(!open);
  };

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;

  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    // AboutAdaniHome: AboutAdanilist,
    Achievements: AchievementData,
    QuickLinks,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData,
  } = data;

  return (
    <div itemScope itemType="https://schema.org/WebPage">
      <Layout
        seoData={QuickLinks?.fields?.pageSpecificSEOdata[2]}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <main>
          <Container>
            <Row>
              <Col>
                {breadCrumbList?.fields && <Breadcrumbs list={breadcrumbsData} />}
                {deviceType !== 'desktop' && (
                  <div className={`section-row`}>
                    <h1 itemProp="headline" className={`${styles.pageHeading} mb-3 d-block`}>
                      <span onClick={handleCanvas}>
                        {pageHeading} {open ? getIconFromIconName('ArrowUp') : getIconFromIconName('arrowdown')}
                      </span>
                    </h1>
                    <div className={styles.staticPage}>
                      <PageContent descriptionData={termsData} />
                    </div>
                  </div>
                )}
                {deviceType === 'desktop' ? (
                  <div className={`${styles.staticPage} section-row`}>
                    <Row>
                      <Col md={3}>
                        <PagelinksNavigation
                          QuickLinks={QuickLinks?.fields?.quickLinks}
                          isSelected={isSelected}
                          setIsSelected={setIsSelected}
                          links={QuickLinks?.fields?.pageSpecificBreadcrumbs}
                        />
                      </Col>
                      <Col md={9}>
                        <PageContent descriptionData={termsData} />
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Offcanvas
                    placement="bottom"
                    showCanvas={show}
                    onHide={() => setShow(false)}
                    closeButton={true}
                    bodySpacing={false}
                    titleProps={{ className: 'mobile-offcanvas-title' }}
                    header={<OffcanvasHeading> </OffcanvasHeading>}
                  >
                    <QuicklinksOffCanvas
                      pageData={QuickLinks.fields.quickLinks}
                      open={open}
                      setOpen={setOpen}
                      setShow={setShow}
                      isSelected={isSelected}
                      setIsSelected={setIsSelected}
                      links={QuickLinks?.fields?.pageSpecificBreadcrumbs}
                    />
                  </Offcanvas>
                )}
                {/* <div className="section-row footerSection aboutPage pt-0">
                  <AboutAdani
                    aboutData={AboutAdanilist?.fields}
                    readmore={AboutAdanilist?.params?.ReadMoreKeyword}
                    readless={AboutAdanilist?.params?.ReadLessKeyword}
                  />
                </div> */}
                <div className="section-row footerSection achievements">
                  <Achievements data={AchievementData?.fields?.data} />
                </div>
                {breadCrumbList?.fields && <Breadcrumbs list={breadcrumbsData} showOnMobile={true} />}
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.quickLinksLayout]);
    const data = filterData(res);
    const quicklinksData = getQuicklinksData('terms', data);
    const quicklinksBreadcrumbs = getQuicklinksBreadcrumbs('terms', data);
    return {
      props: {
        data,
        termsData: quicklinksData?.quickLinksData,
        pageHeading: quicklinksData?.pageHeading,
        breadcrumbsData: quicklinksBreadcrumbs,
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

export default Terms;
