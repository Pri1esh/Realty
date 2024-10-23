import { IPropertyListingSummary } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { Badge, Col, Row } from 'react-bootstrap';
import styles from './propertyListingSummary.module.scss';

const PropertyListingSummary = (props: IPropertyListingSummary) => {
  const { property, reraBadge = true, newLaunch = true } = props;

  const getClassName = () => {
    if (property?.data?.propertyStatusFilter === 'ReadytoMove') {
      return styles.readytoMove;
    } else if (property?.data?.propertyStatusFilter === 'UnderConstruction') {
      return styles.underConstruction;
    } else if (property?.data?.propertyStatusFilter === 'NewLaunch') {
      return styles.new_launch;
    } else {
      return 'd-none';
    }
  };

  return (
    <div className={styles.propertySummary}>
      <div className={styles.propertyBadges}>
        {reraBadge && (
          <Badge className={styles.greenBadge} bg="light">
            {getIconFromIconName('checkmark')}
            {property?.data?.rera}
          </Badge>
        )}
        {newLaunch && (
          <Badge className={getClassName()} bg="light">
            <i></i> {property?.data?.propertyStatus}
          </Badge>
        )}
      </div>
      <div itemProp="description" className={styles.projectSummary}>
        <h3 itemProp="headline">{property?.data?.projectName}</h3>
        <p itemProp="text">{property?.data?.projectSpec}</p>
      </div>
      <Row className={styles.Project_highlights}>
        <Col lg={6} className="hideMobile">
          <label itemProp="text">{property?.data?.areaLabel}</label>
          <p className="propertySummary">{property?.data?.areaDetail}</p>
        </Col>
        <Col lg={6}>
          <label itemProp="text" className="hideMobile">
            {property?.data?.priceLabel}
          </label>
          {property?.data?.priceDetail}
          <span>{property?.data?.condition}</span> {property?.data?.onwards}
        </Col>
      </Row>
    </div>
  );
};

export default PropertyListingSummary;
