import { Countup, CustomImage } from '@components';
import { IAboutUsHighlights } from '@interfaces';
import { Col, Row } from 'react-bootstrap';
import styles from './AboutUsHighlights.module.scss';

const AboutUsHighlights = (props: IAboutUsHighlights) => {
  const { highlightsData } = props;
  return (
    <div className={styles.highlightsblock}>
      <Row className="g-0">
        <Col lg={4} className="order-2 order-lg-1">
          <div className={styles.highlightsblockcontent}>
            <ul>
              {highlightsData?.data?.map(
                (item: { start: string; count: string; delay: string; detail: string }, key: number) => (
                  <li key={`${item.detail + key}`}>
                    <div className={styles.countUp}>
                      <span>
                        <Countup start={item?.start} endCount={item?.count} delay={item?.delay ? item?.delay : '2.5'} />
                      </span>{' '}
                      {item.detail}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Col>
        <Col lg={8} className="order-1 order-lg-2">
          <div className={styles.highlightsblockthumb}>
            {highlightsData?.imgType && <span className={styles.imgType}>{highlightsData?.imgType}</span>}
            <CustomImage src={highlightsData?.bannerImage} alt="" title="" itemProp="image" className="imgBackground" />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AboutUsHighlights;
