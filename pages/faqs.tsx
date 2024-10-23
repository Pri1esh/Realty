import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  ErrorFallback,
  Layout,
  Loader,
  Offcanvas,
  OffcanvasHeading,
  PageContentFaq,
  PagelinksNavigation,
  QuicklinksOffCanvas,
} from '@components';
import { IPage } from '@interfaces';
import { filterData, getIconFromIconName, getQuicklinksBreadcrumbs, getQuicklinksData, useDeviceType } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import styles from './index.module.scss';

const Faq: NextPage<IPage> = (props) => {
  const { data, id, category, faqData, pageHeading, breadcrumbsData, error, errorMessage } = props;
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { deviceType } = useDeviceType();
  const [isSelected, setIsSelected] = useState('faqs');

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
    AboutAdaniHome: AboutAdanilist,
    Achievements: AchievementData,
    QuickLinks,
    breadCrumbList,
    footer,
    header,
    mMenu,
    noResultFound,
    searchData,
  } = data;
  return (
    <div itemScope itemType="https://schema.org/WebPage">
      <Layout
        seoData={QuickLinks?.fields?.pageSpecificSEOdata[3]}
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
                    <div>
                      {faqData && (
                        <PageContentFaq
                          faqData={faqData}
                          focusId={id}
                          focusCat={category}
                          noResultFound={noResultFound?.fields}
                        />
                      )}
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
                        {faqData && (
                          <PageContentFaq
                            faqData={faqData}
                            focusId={id}
                            focusCat={category}
                            noResultFound={noResultFound?.fields}
                          />
                        )}
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

                <div className="section-row footerSection">
                  <AboutAdani
                    aboutData={AboutAdanilist?.fields}
                    readmore={AboutAdanilist?.params?.ReadMoreKeyword}
                    readless={AboutAdanilist?.params?.ReadLessKeyword}
                  />
                </div>
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

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const id = Context?.query?.id || null;
    const category = Context?.query?.category || null;
    const res = await getAllAPI([ENDPOINT.quickLinksLayout]);
    const data = filterData(res);
    const quicklinksData = getQuicklinksData('faqs', data);
    const quicklinksBreadcrumbs = getQuicklinksBreadcrumbs('faq', data);
    return {
      props: {
        data,
        id,
        category,
        faqData: quicklinksData?.quickLinksData,
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

export default Faq;
