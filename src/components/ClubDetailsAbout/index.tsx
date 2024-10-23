import { ReadMore } from '@components';
import { IClubDetailsAbout } from '@interfaces';
import styles from './clubDetailsAbout.module.scss';
const ClubDetailsAbout = (props: IClubDetailsAbout) => {
  const { aboutClubData } = props;
  return (
    <div className={styles.clubaboutmain}>
      <div className={styles.clubabout}>
        <h1 itemProp="headline">{aboutClubData?.heading}</h1>
        <p
          className="hideMobile"
          dangerouslySetInnerHTML={{ __html: aboutClubData?.description }}
          itemProp="alternativeHeadline"
        ></p>
        <div className="hideDesktop">
          <ReadMore
            data={aboutClubData?.description}
            readmore={aboutClubData?.readmore}
            readless={aboutClubData?.readless}
            textLength={167}
          />
        </div>
        <p>
          <span className={styles.clubBg}>
            <img src={aboutClubData?.clubLifeImageSrc} alt={aboutClubData?.heading} />
          </span>
        </p>
      </div>
    </div>
  );
};
export default ClubDetailsAbout;
