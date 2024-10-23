import { CustomImage, SectionHeader } from '@components';
import { IResidentialBanner } from '@interfaces';
import { useDeviceType } from '@utils';
import { useState } from 'react';
import styles from './ResidentialBanner.module.scss';

const ResidentialBanner = (props: IResidentialBanner) => {
  const { data } = props;
  const textLength = 220;
  const [readMore, setReadMore] = useState(false);
  const { deviceType } = useDeviceType();

  return (
    <>
      <div className={styles.wrapper}>
        <SectionHeader heading={data?.heading} h1={true} />
        {data?.description?.length > textLength ? (
          <p itemProp="description">
            {!readMore ? (
              <>
                <span
                  itemProp="description"
                  dangerouslySetInnerHTML={{ __html: data?.description?.substring(0, textLength) }}
                />
                <span itemProp="description" className="visually-hidden">
                  {data?.description?.substring(textLength, data?.description?.length)}
                </span>
                ...
              </>
            ) : (
              <span itemProp="description" dangerouslySetInnerHTML={{ __html: data?.description }} />
            )}{' '}
            <button itemProp="potentialAction" onClick={() => setReadMore(!readMore)} className={styles.seeMore}>
              {readMore ? <>{data?.readless}</> : <>{data?.readmore}</>}
            </button>
          </p>
        ) : (
          <p itemProp="description">{data?.description}</p>
        )}
      </div>
      {data?.src && (
        <div className={styles.residentialHeader}>
          <CustomImage
            itemProp="image"
            src={(deviceType === 'mobile' ? data?.srcMobile : data?.src) || data?.src}
            alt={data?.alt}
            className="img-fluid imageRadius imgBackground"
          />
          {data?.imgtitle && <span itemProp="text">{data?.imgtitle}</span>}
        </div>
      )}
    </>
  );
};
export default ResidentialBanner;
