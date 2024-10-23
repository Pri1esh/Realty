import { CustomImage } from '@components';
import { IClubListingBanner } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { Container } from 'react-bootstrap';
import styles from './ClubListingBanner.module.scss';

const ClubListingBanner = (props: IClubListingBanner) => {
  const { clublistingdata } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  return (
    <div className={styles.mainbanner} itemScope itemType="https://schema.org/VideoObject">
      {clublistingdata?.herobanner[0]?.isVideo === 'true' ? (
        <div className={styles.clubBanner} key={isMobile?.toString()}>
          <span className={styles.imgType}>{clublistingdata?.herobanner[0]?.bannerImgtitle}</span>
          <video
            muted
            autoPlay
            loop
            poster={
              isMobile && clublistingdata?.herobanner[0]?.videoposterMobile
                ? clublistingdata?.herobanner[0]?.videoposterMobile || clublistingdata?.herobanner[0]?.thumbImgMobile
                : clublistingdata?.herobanner[0]?.videoposter || clublistingdata?.herobanner[0]?.thumbImg
            }
            className={styles.mainBanner}
            playsInline
            itemProp="video"
          >
            <source
              src={
                isMobile && clublistingdata?.herobanner[0]?.videoMp4Mobile
                  ? clublistingdata?.herobanner[0]?.videoMp4Mobile
                  : clublistingdata?.herobanner[0]?.videoMp4
              }
              type="video/mp4"
            />
            <source
              src={
                isMobile && clublistingdata?.herobanner[0]?.videoOggMobile
                  ? clublistingdata?.herobanner[0]?.videoOggMobile
                  : clublistingdata?.herobanner[0]?.videoOgg
              }
              type="video/ogg"
            />
            <meta itemProp="uploadDate" content={props?.clublistingdata?.herobanner[0]?.uploadDate} />
            <meta itemProp="thumbnailUrl" content={props?.clublistingdata?.herobanner[0]?.thumbImg} />
            <meta itemProp="description" content={props?.clublistingdata?.herobanner[0]?.seoDescription} />
            <meta itemProp="name" content={props?.clublistingdata?.herobanner[0]?.seoName} />
            <meta
              itemProp="contentUrl"
              content={props?.clublistingdata?.herobanner[0]?.videoMp4 || clublistingdata?.herobanner[0]?.videoOgg}
            />
          </video>
        </div>
      ) : (
        <>
          <figure className={styles.clubBanner}>
            <CustomImage
              src={clublistingdata?.herobanner[0]?.bannerImg}
              alt={clublistingdata?.herobanner[0]?.bannerAlt}
              itemProp="primaryImageOfPage"
            />
          </figure>
          <div className={styles.imgDesclaimer} itemProp="name">
            {clublistingdata?.herobanner[0].bannerImgtitle}
          </div>
        </>
      )}
      <div className={styles.bannerBrands}>
        <Container className="text-center">
          {clublistingdata?.herobanner.map((data: any, key: any) => (
            <a href={data?.clubLink} key={`${data?.location + key}`} target={data?.target}>
              <div className={styles.banneroverlay}>
                <div className={styles.cardHover}>
                  <span className={styles.arrowTail}>{getIconFromIconName('AngleRight')}</span>
                  <div className={styles.bannerthumb}>
                    <CustomImage src={data?.thumbImg} alt={data?.logoAlt} itemProp="image" />
                  </div>
                  <h2 itemProp="headline">{data?.heading}</h2>
                  <p>
                    {getIconFromIconName('LocationPin')}
                    {data?.location}
                  </p>
                  <p className={styles.cityName} itemProp="name">
                    {data?.city}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </Container>
      </div>
    </div>
  );
};
export default ClubListingBanner;
