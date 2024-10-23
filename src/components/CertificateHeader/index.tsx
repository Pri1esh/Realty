import { CustomImage, SectionHeader } from '@components';
import { ICertificationHeader } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './CertificateHeader.module.scss';

const CertificateHeader = (props: ICertificationHeader) => {
  const { deviceType } = useDeviceType();
  const { data } = props;
  const getComponent = () => {
    if (deviceType !== 'mobile') {
      return (
        <div className={styles.bannerWrapper}>
          <CustomImage src={data?.src} alt={data?.alt} className="imgBackground" itemProp="primaryImageOfPage" />
        </div>
      );
    } else {
      return (
        <div className={`${styles.bannerWrapper} ${styles.bannerMobile}`}>
          <CustomImage
            src={data?.srcMobile ? data?.srcMobile : data?.src}
            className="imgBackground"
            alt={data?.alt}
            itemProp="primaryImageOfPage"
          />
        </div>
      );
    }
  };
  return (
    <div className={styles.certificateBanner} itemScope itemType="https://schema.org/ItemPage">
      <SectionHeader heading={data?.headerdesc} h1={true} />
      {getComponent()}
      {data?.title && <span itemProp="text">{data?.title}</span>}
    </div>
  );
};

export default CertificateHeader;
