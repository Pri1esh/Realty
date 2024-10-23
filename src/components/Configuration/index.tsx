import { IConfiguration } from '@interfaces';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './configuration.module.scss';

const Configuration = (props: { compData: IConfiguration[] }) => {
  const { compData } = props;

  return (
    <Row className={styles.wrapper}>
      {compData?.map((item, key) => (
        <Col lg={3} md={6} sm={12} className={styles.item} key={`${key + item?.heading}`}>
          <h6>
            {item?.link ? (
              <a href={item?.link} target={item?.linkTarget}>
                {item?.heading}
              </a>
            ) : (
              item?.heading
            )}
          </h6>
          <ul>
            {item?.items?.map((link, index) => (
              <li key={`${index + link?.linkTitle}`}>
                <a href={link?.linkUrl} target={link?.target}>
                  {link?.linkTitle}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      ))}
    </Row>
  );
};

export default Configuration;
