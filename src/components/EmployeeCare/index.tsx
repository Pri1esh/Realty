import { EmployeeCareCard } from '@components';
import { IEmployeeCare } from '@interfaces';
import { Col, Row } from 'react-bootstrap';
import styles from './EmployeeCare.module.scss';
const EmployeeCare = (props: IEmployeeCare) => {
  const { EmployeeCarelist, employeeCareCardlist } = props;
  return (
    <Row className={styles.EmployeeCare}>
      <Col lg={6}>
        <div itemProp="about" className={styles.description}>
          <h3 itemProp="headline">{EmployeeCarelist?.name}</h3>
          <p itemProp="description" className="mb-2">
            {EmployeeCarelist?.description}
          </p>
          <p itemProp="description" className={styles.bold}>
            {EmployeeCarelist?.inclusion}
          </p>
        </div>
      </Col>
      <Col lg={6} className="pt-5">
        <EmployeeCareCard careerdata={employeeCareCardlist?.data} />
      </Col>
    </Row>
  );
};

export default EmployeeCare;
