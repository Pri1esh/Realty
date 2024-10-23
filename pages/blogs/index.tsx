import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  CardFilterButtons,
  CommunicationCornerDefaultArticles,
  ContactCta,
  ErrorFallback,
  FeaturedArticles,
  Layout,
  Loader,
  SectionHeader,
} from '@components';
import { ICommunicationCornerItem, IPage } from '@interfaces';
import { filterData, useDeviceType } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { UrlObject } from 'url';
import styles from './index.module.scss';

const Blogs: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const { deviceType } = useDeviceType();
  const {
    Content: ContentData = undefined,
    FeaturedBlog: FeaturedBlogsData,
    Blog,
    Achievements: AchievementsData,
    AboutAdaniHome,
    breadCrumbList,
    GetInTouch,
    footer,
    header,
    mMenu,
    searchData: propertySearchData,
    seoData = {},
  } = data;
  const [searchInputValue, setsearchInputValue] = useState<string>('');
  const [openSearch, setopenSearch] = useState<boolean>(false);
  const [searchData, setsearchData] = useState<any>();
  const [currFilter, setcurrFilter] = useState<string | undefined>('All');
  const [blogsearchdata, setblogsearchdata] = useState<any>();

  useEffect(() => {
    getDebounceblogsearchdata();
    openSearch && searchFilterBlogs(searchInputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputValue]);

  const getblogsearchdata = async () => {
    const response = await getAllAPI([`${ENDPOINT.blogCategoryClientLayout}&query=${searchInputValue}`]);
    const { BlogSearch } = filterData(response);
    setblogsearchdata(BlogSearch);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDebounceblogsearchdata = useCallback(() => debounce(getblogsearchdata, 500), []);

  const debounce = (method: { (): Promise<void>; (): void; (): void; _tId?: any }, delay: number | undefined) => {
    clearTimeout(method._tId);
    method._tId = setTimeout(() => {
      method();
    }, delay);
  };

  const searchFilterBlogs = (searchInputValue = '', blogsData = blogsearchdata?.fields?.blogSearch) => {
    if (searchInputValue.length < 3) {
      setsearchData(undefined);
      return;
    }
    const filteredBlogs = blogsData?.filter((obj: { [s: string]: string } | ArrayLike<string>) =>
      Object.values(obj).some((val: string) =>
        val.toLowerCase().replace(' ', '').includes(searchInputValue.toLowerCase().replace(' ', '')),
      ),
    );
    setsearchData(filteredBlogs);
  };

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  return (
    <div className={styles.blogPage} itemScope itemType="https://schema.org/ItemPage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={propertySearchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
      >
        <Container>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
          <div className={styles.blogs}>
            <SectionHeader heading={ContentData?.params?.ComponentTitle} h1={true} />
          </div>
        </Container>

        <div className={styles.stickyTop}>
          <Container>
            <CardFilterButtons
              Anchors={ContentData?.fields?.blogAnchors?.data}
              searchInputValue={searchInputValue}
              setsearchInputValue={setsearchInputValue}
              setOpenSearch={setopenSearch}
              openSearch={openSearch}
              searchData={searchData}
              filter={currFilter}
              setfilter={setcurrFilter}
            />
          </Container>
        </div>
        <Container>
          {Blog?.fields?.blog?.data?.map(
            (currCategory: { categorySectionTitle: string; keys: [ICommunicationCornerItem] }, key: number) =>
              currCategory?.categorySectionTitle.toLowerCase().includes('all') && (
                <div className="section-row" key={`${currCategory?.categorySectionTitle + key}`}>
                  <SectionHeader heading={Blog?.params?.ComponentTitle} itemProp="headline" />
                  {deviceType === 'desktop' ? (
                    <Row key={`${currCategory?.categorySectionTitle + key}`}>
                      <CommunicationCornerDefaultArticles items={currCategory?.keys} />
                    </Row>
                  ) : (
                    <div key={`${currCategory?.categorySectionTitle + key}`}>
                      <CommunicationCornerDefaultArticles items={currCategory?.keys} />
                    </div>
                  )}
                </div>
              ),
          )}

          <div className="section-row">
            <div className={styles.featuredBlogs}>
              <Container>
                <SectionHeader heading={FeaturedBlogsData?.params?.ComponentTitle} itemProp="headline" />
                {deviceType === 'desktop' ? (
                  <Row>
                    <FeaturedArticles items={FeaturedBlogsData?.fields?.data} />
                  </Row>
                ) : (
                  <FeaturedArticles items={FeaturedBlogsData?.fields?.data} />
                )}
              </Container>
            </div>
          </div>

          {Blog?.fields?.blog?.data?.map(
            (
              currCategory: {
                categorySectionTitle: string;
                title: string;
                keys: [ICommunicationCornerItem];
                slug: string | UrlObject;
                categoryPageLinkText:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              key: number,
            ) =>
              !currCategory?.categorySectionTitle.toLowerCase().includes('all') && (
                <div className="section-row" key={`${currCategory?.categorySectionTitle + key}`}>
                  {deviceType === 'desktop' ? (
                    <Row key={`${currCategory?.categorySectionTitle + key}`}>
                      <SectionHeader heading={currCategory?.title} itemProp="headline" />
                      <CommunicationCornerDefaultArticles items={currCategory?.keys} />
                    </Row>
                  ) : (
                    <div key={`${currCategory?.categorySectionTitle + key}`}>
                      <SectionHeader heading={currCategory?.title} itemProp="headline" />
                      <CommunicationCornerDefaultArticles
                        key={`${currCategory?.categorySectionTitle + key}`}
                        items={currCategory?.keys}
                      />
                    </div>
                  )}
                  <a href={`${currCategory?.slug}`} itemProp="url" className="text-capitalize seeMore hideMobile">
                    {currCategory?.categoryPageLinkText}
                  </a>
                </div>
              ),
          )}
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
            <Achievements data={AchievementsData?.fields?.data} />
          </div>
          {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
        </Container>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAllAPI([ENDPOINT.blogLayout]);
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

export default Blogs;
