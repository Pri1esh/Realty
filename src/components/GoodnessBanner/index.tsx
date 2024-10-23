import { CustomImage } from '@components';
import { IGoodnessBanner } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import styles from './goodnessBanner.module.scss';

const GoodnessBanner = (props: { compData: IGoodnessBanner }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <CustomImage
          src={(deviceType === 'mobile' ? compData?.srcMobile : compData?.src) || compData?.src}
          className="img-fluid imgBackground"
          alt={compData?.alt}
        />
      </div>
      <div className={styles.content}>
        {compData?.heading && <h2 className={styles.textGradient}>{compData?.heading}</h2>}
        {compData?.description && <p>{compData?.description}</p>}
        {compData?.link && (
          <a href={compData?.link} target={compData?.target}>
            {compData?.linkTitle}
          </a>
        )}
      </div>
    </div>
  );
};

export default GoodnessBanner;
