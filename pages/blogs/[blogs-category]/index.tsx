import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  Breadcrumbs,
  CardFilterButtons,
  CommunicationCornerOtherCategories,
  ContactCta,
  ErrorFallback,
  Layout,
  Loader,
  SectionHeader,
} from '@components';
import { IPage } from '@interfaces';
import { filterData, useDeviceType } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '../index.module.scss';

const CategoryName: NextPage<IPage> = (props) => {
  const { data, error, id, pageHeading, errorMessage } = props;

  const [searchInputValue, setsearchInputValue] = useState('');
  const [openSearch, setopenSearch] = useState(false);
  const [searchData, setsearchData] = useState<any>();
  const [currFilter, setcurrFilter] = useState(id);
  const [blogsearchdata, setblogsearchdata] = useState<any>();
  const { deviceType } = useDeviceType();

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

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    BlogCategory,
    GetInTouch,
    AboutAdaniHome,
    Achievements: achievements,
    breadCrumbList,
    footer,
    header,
    mMenu,
    searchData: propertySearchData,
    seoData = {},
  } = data;

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
            <SectionHeader heading={pageHeading ?? BlogCategory?.params?.ComponentTitle} h1={true} />
          </div>
        </Container>
        <div className={styles.stickyTop}>
          <Container>
            <CardFilterButtons
              Anchors={BlogCategory?.fields?.blogAnchors?.data}
              searchInputValue={searchInputValue}
              setsearchInputValue={setsearchInputValue}
              setOpenSearch={setopenSearch}
              openSearch={openSearch}
              searchData={searchData}
              filter={currFilter}
              setfilter={setcurrFilter}
              Id={id}
            />
          </Container>
        </div>
        <Container>
          {deviceType === 'desktop' ? (
            <Row>
              <CommunicationCornerOtherCategories communicationData={BlogCategory} Id={id} />
            </Row>
          ) : (
            <CommunicationCornerOtherCategories communicationData={BlogCategory} Id={id} />
          )}
          {!BlogCategory?.fields?.blogs?.data?.length && (
            <div className="section-row">
              <p className="text-center" itemProp="headline">
                No blog found in this category.
              </p>
            </div>
          )}
        </Container>
        <div className="section-row">
          <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
        </div>
        <Container>
          <div className="section-row footerSection aboutPage pt-0">
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

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    const { res: response } = Context;
    let id = Context.req.url;
    id = id?.replace('/blogs/category/', '');
    id = id?.substring(0, id.indexOf('?')) || id;

    // Redirect from "/blogs/category/all" to "/blogs"
    if (id === 'all') {
      if (response) {
        response.setHeader('Location', '/blogs');
        response.statusCode = 301;
        response.end();
      }
      return { props: {} };
    }
    const res = await getAllAPI([`${ENDPOINT.blogCategoryLayout}&catName=${id}&pageNo=1`]);
    const data = filterData(res);
    const pageHeading = data?.BlogCategory?.fields?.blogAnchors?.data?.filter(
      (item: { title: string }) => id && item?.title?.toLowerCase().includes(id.split('-')[0]),
    )[0]?.title;
    return {
      props: {
        data,
        id,
        pageHeading: pageHeading || null,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CategoryName;
