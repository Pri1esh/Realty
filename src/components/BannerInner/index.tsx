import { CustomImage } from '@components';
import { IBannerInner } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { Container } from 'react-bootstrap';
import styles from './BannerInner.module.scss';

const BannerInner = (props: IBannerInner) => {
  const { deviceType } = useDeviceType();
  const { bannerInnerData, showThumb = false, showTitle = false, showPin = false } = props;

  const getBannerImage = () => {
    if (deviceType === 'mobile' && bannerInnerData?.srcMobile) {
      return (
        <CustomImage
          itemProp="primaryImageOfPage"
          src={bannerInnerData?.srcMobile}
          className={`${bannerInnerData?.class1} ${bannerInnerData?.class2} imgBackground`}
          alt={bannerInnerData?.alt}
          fetchpriority="high"
        />
      );
    } else {
      return (
        <CustomImage
          itemProp="primaryImageOfPage"
          src={bannerInnerData?.src}
          className={`${bannerInnerData?.class1} ${bannerInnerData?.class2} imgBackground`}
          alt={bannerInnerData?.alt}
          fetchpriority="high"
        />
      );
    }
  };

  return (
    <div className={styles.BannerInner}>
      {bannerInnerData?.title && <span className={styles.imgType}>{bannerInnerData?.title}</span>}
      {getBannerImage()}
      <div className={styles.pageheading}>
        <Container className="relative_pos">
          <ul>
            {showThumb && (
              <li>
                <div className={styles.projectThumb}>
                  <CustomImage
                    itemProp="primaryImageOfPage"
                    src={bannerInnerData?.thumbImg}
                    className="img-fluid"
                    alt={bannerInnerData?.imgalt}
                  />
                </div>
                <h1 itemProp="headline">{bannerInnerData.heading}</h1>
                <p itemProp="text">
                  {showPin && getIconFromIconName('LocationPin')}
                  {bannerInnerData.subheading}
                </p>
              </li>
            )}

            {showTitle && (
              <li className="pb-4">
                <h1 itemProp="headline">{bannerInnerData.heading}</h1>
              </li>
            )}
          </ul>
        </Container>
      </div>
    </div>
  );
};
export default BannerInner;
