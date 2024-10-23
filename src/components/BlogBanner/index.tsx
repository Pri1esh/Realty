import { CustomImage, SectionHeader } from '@components';
import { IBlogBanner } from '@interfaces';
import { Col } from 'react-bootstrap';
import styles from './BlogBanner.module.scss';

const BlogBanner = (props: IBlogBanner) => {
  const { data, blogCategory, blogDate = '' } = props;

  return (
    <div className={styles.communicationBanner}>
      <div className="row">
        <Col lg={12} className="order-lg-1 order-2">
          <SectionHeader heading={data?.headerdesc} h1={true}>
            <p>
              {blogDate} in{' '}
              {blogCategory?.map((data: { categorylink: string; categorytitle: string }, key: number) => (
                <a key={`${data?.categorytitle + key}`} href={data.categorylink} className={styles.category}>
                  {data.categorytitle}
                </a>
              ))}
            </p>
          </SectionHeader>
        </Col>
        <Col lg={12} className="order-lg-1 order-1 mb-lg-0 mb-4">
          <div className={styles.blogBannerWrapper}>
            {data?.title && <span className={styles.imgType}>{data?.title}</span>}
            <CustomImage className="imgBackground" src={data?.src} alt={data?.alt || data?.headerdesc} />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default BlogBanner;
