import { CustomImage } from '@components';
import { IAccoladesList, IAccoladesListItem } from '@interfaces';
import { Col, Row } from 'react-bootstrap';
import styles from './accolades.module.scss';

const AccoladesList = (props: IAccoladesList) => {
  const { accoladesData } = props;
  return (
    <Row className={styles.accolades}>
      {accoladesData.map((data: IAccoladesListItem, key: number) => (
        <Col lg={4} md={6} key={`${data?.src + key}`}>
          <div className={styles.accoladesData}>
            <div className={styles.imagewrapper}>
              <CustomImage src={data.src} className="img-fluid" alt={data.imgalt} />
            </div>
            <p className={styles.heading} itemProp="headline">
              {data.caption}
            </p>
            <p className={styles.subText} dangerouslySetInnerHTML={{ __html: data?.winner }} />
            <span>{data.date}</span>
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default AccoladesList;
