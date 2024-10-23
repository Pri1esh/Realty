import { Carousel, CustomImage, ReadMore } from '@components';
import { IClubLandingModule } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './clubLandingstyle.module.scss';

const ClubLandingModule = (props: { clubLandingData: IClubLandingModule }) => {
  const { clubLandingData } = props;
  const { deviceType } = useDeviceType();
  return (
    <div className={styles.clubLanding}>
      <div className={`${styles.clubLogo} hideMobile`}>
        <CustomImage src={clubLandingData?.clubLogo} alt={clubLandingData?.clubLogo} className="" itemProp="image" />
      </div>
      <h3 itemProp="headline">{clubLandingData?.clubName}</h3>
      <h4 itemProp="name">{clubLandingData?.clubAddress}</h4>
      <p className="hideMobile" itemProp="description">
        {clubLandingData?.clubAbout}
      </p>
      <div className={`hideDesktop pb-3 ${styles.readMore}`}>
        <ReadMore
          data={clubLandingData?.clubAbout}
          readmore={clubLandingData?.readmore}
          readless={clubLandingData?.readless}
          textLength={60}
        />
      </div>
      {deviceType === 'desktop' ? (
        <div className={styles.clubCardSection}>
          {clubLandingData?.data?.map((data: { clubImage: string; clubAlt: string; type: string }, key: number) => (
            <div className={styles.clubCards} key={`${data.clubImage + key}`}>
              <div className={styles.cardWrapper}>
                <CustomImage src={data.clubImage} alt={data.clubAlt} className="imgBackground" itemProp="image" />
                <p itemProp="headline">{data.type}</p>
              </div>
            </div>
          ))}
          <div className={styles.artisticDisclaimer} itemProp="name">
            {clubLandingData?.artisticDisclaimer}
          </div>
        </div>
      ) : (
        <div>
          <Carousel
            className=""
            classes=""
            isMobSlider
            settings={{
              arrows: false,
              autoplay: false,
              autoplaySpeed: 2000,
              dots: false,
              infinite: false,
              pauseOnHover: false,
              slidesToScroll: 1,
              slidesToShow: 3,
              speed: 500,
              swipe: true,
              responsive: [
                {
                  breakpoint: 500,
                  settings: { slidesToShow: 1.2 },
                },
              ],
            }}
          >
            <div className={styles.clubCardSection}>
              {clubLandingData?.data?.map((data: { clubImage: string; clubAlt: string; type: string }, key: number) => (
                <div className={styles.clubCards} key={`${data.clubImage + key}`}>
                  <div className={styles.cardWrapper}>
                    <CustomImage src={data.clubImage} alt={data.clubAlt} itemProp="image" className="imgBackground" />
                    <p itemProp="headline">{data.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Carousel>
          <div className={styles.artisticDisclaimer} itemProp="name">
            {clubLandingData?.artisticDisclaimer}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubLandingModule;
