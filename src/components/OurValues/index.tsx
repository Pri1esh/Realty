import { CustomImage } from '@components';
import { IOurValues, IOurValuesList } from '@interfaces';
import { Col, Figure, Row } from 'react-bootstrap';
import styles from './OurValues.module.scss';

const OurValues = (props: IOurValuesList) => {
  const { OurValuesData } = props;
  return (
    <div className={styles.blockmain}>
      <Row>
        {OurValuesData?.map((data: IOurValues, key: number) => (
          <Col key={`${data.src + key}`} lg={4} className={styles.cardWrap}>
            <div className={styles.card}>
              <div itemProp="associatedMedia" className={styles.cardthumb}>
                <Figure>
                  <CustomImage
                    itemProp="image"
                    className="imgBackground"
                    src={data.src}
                    alt={data.alt}
                    title={data.title}
                  />
                </Figure>
              </div>
              <div itemProp="about" className={styles.cardbody}>
                <h3 itemProp="headline">{data.title}</h3>
                <p itemProp="description">{data.desc}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default OurValues;
