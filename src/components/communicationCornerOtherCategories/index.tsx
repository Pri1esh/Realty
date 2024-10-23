import { ENDPOINT, getAllAPI } from '@api-manager';
import { CustomImage, Loader } from '@components';
import { ICommunicationCornerOtherCategories, ICommunicationCornerOtherCategoriesData } from '@interfaces';
import { filterData } from '@utils';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Figure, Row } from 'react-bootstrap';
import styles from './communicationCornerOtherCategories.module.scss';

const CommunicationCornerOtherCategories = (props: ICommunicationCornerOtherCategories) => {
  const { communicationData, Id } = props;
  const [blogData, setBlogData] = React.useState<any>(communicationData?.fields?.blogs?.data);
  const [nextPage, setNextPage] = React.useState<number>(1);
  const loadingRef = React.useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);

  const debounce = (method: any, delay: number) => {
    clearTimeout(method._tId);
    method._tId = setTimeout(() => {
      method();
    }, delay);
  };

  const handleBlogData = useCallback(() => {
    const getblogdata = async () => {
      const response = await getAllAPI([`${ENDPOINT.blogCategoryClientLayout}&catName=${Id}&pageNo=${nextPage + 1}`]);
      const { BlogCategory } = filterData(response);
      setBlogData([...blogData, ...BlogCategory?.fields?.blogs?.data]);
      setNextPage(nextPage + 1);
    };
    getblogdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage]);

  const handleScroll = useCallback(() => {
    const rect = loadingRef && loadingRef?.current?.getBoundingClientRect();
    const isVisible =
      rect &&
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect?.right <= (window.innerWidth || document.documentElement.clientWidth);
    if (isVisible && loadingRef.current) {
      setIsFetching(true);
    } else {
      return;
    }
  }, []);

  const debounceHandleScroll = useCallback(() => loadingRef && debounce(handleScroll, 500), [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', debounceHandleScroll);
    return () => window.removeEventListener('scroll', debounceHandleScroll);
  }, [debounceHandleScroll]);

  const loadMoreItems = useCallback(() => {
    handleBlogData();
    setIsFetching(false);
  }, [handleBlogData]);

  useEffect(() => {
    if (!isFetching) return;
    loadMoreItems();
  }, [isFetching, loadMoreItems]);

  return (
    <div itemScope itemType="https://schema.org/Article">
      <Row>
        {blogData?.length &&
          blogData?.map((data: ICommunicationCornerOtherCategoriesData, key: number) => (
            <Col lg={4} md={6} className="mb-4" key={`${data?.link + key}`}>
              <div className={styles.newsupdatescard}>
                <Figure>
                  <a href={`${data?.link}`}>
                    {data?.imgTitle && <span className={styles.imgType}>{data?.imgTitle}</span>}
                    <CustomImage
                      className="imgBackground"
                      src={data?.src}
                      alt={data?.alt}
                      title={data?.imgtitle}
                      itemProp="image"
                    />
                  </a>
                </Figure>
                <div className={styles.newsupdatescarddescription}>
                  <h4 itemProp="headline">
                    <a href={`${data?.link}`} itemProp="url" title={data?.title}>
                      {data?.title}
                    </a>
                  </h4>
                  <p itemProp="description">{data?.description}</p>
                  <ul>
                    <li itemProp="sdDatePublished">{data?.dateTime}</li>
                  </ul>
                </div>
              </div>
            </Col>
          ))}
      </Row>
      {blogData?.length < communicationData?.fields?.blogs?.totalBlogs && (
        <div className="section-row text-center" ref={loadingRef}>
          <Loader bg={'#000000'} />
        </div>
      )}
    </div>
  );
};
export default CommunicationCornerOtherCategories;
