import { Button, CustomImage, ImageMagnifier } from '@components';
import { ISpecificationCard } from '@interfaces';
import { useDeviceType } from '@utils';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './specification.module.scss';

const SpecificationCard = (props: ISpecificationCard) => {
  const { items } = props;
  const { deviceType } = useDeviceType();
  const [measurementScale, setmeasurementScale] = useState<boolean>(false);
  const changeScale = (scale: string) => {
    scale === 'metres' ? setmeasurementScale(false) : setmeasurementScale(true);
  };

  return (
    <div className={`${styles.Specification} mt-3`}>
      <Row>
        <Col lg={6}>
          <div itemProp="subjectOf" className={`${styles.propertyPicture}`}>
            {deviceType === 'desktop' ? (
              items?.src && <ImageMagnifier src={items?.src} alt={items?.imageAlt ? items?.imageAlt : ''} />
            ) : (
              <CustomImage
                itemProp="image"
                src={items?.src ? items?.src : ''}
                className="img-fluid"
                alt={items?.imageAlt}
                title={items?.imgTitle}
              />
            )}
          </div>
        </Col>
        <Col lg={6} className="mt-4 mb-lg-0 mb-4 mt-lg-0">
          <Row>
            <Col md={4} className="col-6">
              <p itemProp="text" className={styles.filtersLabel}>
                {items?.sizeIn}
              </p>
            </Col>
            <Col md={8} className="col-6">
              <ul className={styles.size}>
                <li>
                  <Button
                    itemProp="potentialAction"
                    variant="primary"
                    className={`${!measurementScale && styles.active}`}
                    onClick={() => {
                      changeScale('metres');
                    }}
                  >
                    Metres
                  </Button>
                </li>
                <li>
                  <Button
                    itemProp="potentialAction"
                    variant="primary"
                    className={`${measurementScale && styles.active}`}
                    onClick={() => {
                      changeScale('feet');
                    }}
                  >
                    Feet
                  </Button>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.propertyspecifications}>
                <table>
                  {items?.specifications?.map(
                    (
                      currPlace: {
                        place: string;
                        sizeInFeet: string;
                        sizeInMetres: string;
                      },
                      key: number,
                    ) => (
                      <tr key={`${currPlace?.place + key}`}>
                        <td>
                          <label itemProp="text">{currPlace?.place} </label>{' '}
                        </td>
                        <td>
                          <span itemProp="disambiguatingDescription">
                            {measurementScale ? currPlace?.sizeInFeet : currPlace?.sizeInMetres}
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </table>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.otherSpecification}>
                <h3>
                  {items?.areaAsPerRera} <span itemProp="text">{items?.reraMeasurementScale}</span>
                </h3>
                <Row>
                  {items?.reraSpecifications?.map(
                    (
                      currSpecification: {
                        areaType: string;
                        size: string;
                      },
                      key: number,
                    ) => (
                      <Col key={`${currSpecification?.areaType + key}`}>
                        <label itemProp="disambiguatingDescription">{currSpecification?.areaType} </label>{' '}
                        {currSpecification?.size}
                      </Col>
                    ),
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SpecificationCard;
