import { ReadMore } from '@components';
import { IHighlightHeading } from '@interfaces';
import React from 'react';
import styles from './highlights.module.scss';

const HighlightHeading = (props: IHighlightHeading) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      {compData?.heading && <h1>{compData?.heading}</h1>}
      {compData.cityDetail && <ReadMore textLength={220} data={compData.cityDetail} />}
    </div>
  );
};

export default HighlightHeading;
