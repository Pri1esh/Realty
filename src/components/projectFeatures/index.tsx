import { CustomImage } from '@components';
import { IProjectFeatures, IProjectFeaturesList } from '@interfaces';
import { useDeviceType } from '@utils';
import { Col, Row } from 'react-bootstrap';
import styles from './ProjectFeatures.module.scss';

const ProjectFeatures = (props: IProjectFeaturesList) => {
  const { data } = props;
  const { deviceType } = useDeviceType();

  return (
    <div itemProp="mentions" className={styles.sectionFeatures}>
      {data?.map((item: IProjectFeatures, index: number) => (
        <Row key={`${item?.src + index}`}>
          <Col lg={5}>
            <div className={styles.sectionFeaturesThumb}>
              <CustomImage
                itemProp="image"
                src={deviceType === 'mobile' && item?.srcMobile ? item?.srcMobile : item?.src}
                alt={item?.title}
                className="img-fluid imgBackground"
              />
              <span itemProp="name" className={styles.caption}>
                {item?.caption}
              </span>
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.alignMiddle}>
              <div>
                <div itemProp="alternateName" className={styles.highlightHeading}>
                  {item?.title} <span>{item?.labelTerms}</span>
                </div>
                <p itemProp="description">{item?.desc}</p>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};
export default ProjectFeatures;
