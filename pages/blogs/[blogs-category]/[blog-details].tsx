import { ENDPOINT, getAllAPI } from '@api-manager';
import {
  AboutAdani,
  Achievements,
  BlogBanner,
  BlogDetailsHeader,
  BlogDisclaimer,
  Breadcrumbs,
  CommunicationCornerBlog,
  ContactCta,
  ErrorFallback,
  Layout,
  Loader,
  MoreArticles,
  SectionHeader,
} from '@components';
import { IPage } from '@interfaces';
import { filterData } from '@utils';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from '../index.module.scss';

const BlogDetails: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;
  const router = useRouter();

  useEffect(() => {
    if (data?.blogdata?.fields?.item[0]?.redirectUrl) {
      router.push(data?.blogdata?.fields?.item[0]?.redirectUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <ErrorFallback error={error} errorMessage={errorMessage} />;
  if (!data)
    return (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );

  const {
    blogdata,
    AboutAdaniHome,
    Achievements: AchievementsData,
    breadCrumbList,
    otherArticles,
    communicationbanner: BannerData,
    footer,
    header,
    mMenu,
    ProjectActions,
    seoData = {},
    GetInTouch,
    searchData,
    blogDisclaimer,
  } = data;
  return (
    <div className={styles.blogDetail} itemScope itemType="https://schema.org/ItemPage">
      <Layout
        seoData={seoData?.fields}
        footerData={footer}
        headerData={header}
        searchData={searchData}
        showStickyMenu={true}
        stickyBarData={mMenu?.fields?.data}
        blogSchema={blogdata?.fields?.item?.[0]?.blogSchema}
      >
        <main>
          <Container>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} />}
            <BlogDetailsHeader modalShare={ProjectActions?.fields?.projectActions?.modalShare} />
            <BlogBanner
              data={BannerData?.fields}
              blogDate={blogdata?.fields?.item[0].date}
              blogCategory={blogdata?.fields?.item[0].category}
            />
            <div className={styles.contentSection}>
              <CommunicationCornerBlog data={blogdata && blogdata?.fields?.item[0]} />
            </div>
            <div className={`section-row ${styles.moreArticles}`}>
              <SectionHeader heading={otherArticles?.fields?.componentname} itemProp="headline" />
              <MoreArticles data={otherArticles?.fields?.data} />
            </div>
          </Container>
          <ContactCta getInTouchdata={GetInTouch?.fields?.getInTouch[0]} />
          <Container>
            {AboutAdaniHome?.fields && (
              <div className="section-row footerSection aboutPage">
                <AboutAdani aboutData={blogDisclaimer?.fields} />
              </div>
            )}
            <BlogDisclaimer blogData={blogDisclaimer?.fields} />
            <div className="section-row footerSection achievements">
              <Achievements data={AchievementsData?.fields?.data} />
            </div>
            {breadCrumbList?.fields && <Breadcrumbs list={breadCrumbList?.fields} showOnMobile={true} />}
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (Context: GetServerSidePropsContext) => {
  try {
    let id = Context.req.url;
    const jsonIndex = id?.indexOf('.json');
    if (jsonIndex !== -1) {
      id = id?.substring(id.indexOf('/blogs/'), jsonIndex);
    }
    id = id?.replace('/blogs/', '');
    id = id?.substring(0, id.indexOf('?')) || id;
    const res = await getAllAPI([`${ENDPOINT.blogDetailLayout}&item=/sitecore/content/AdaniRealty/Home/blogs/${id}`]);
    const data = filterData(res);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default BlogDetails;
