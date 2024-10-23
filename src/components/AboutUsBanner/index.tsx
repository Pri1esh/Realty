import { CustomImage } from '@components';
import { IAboutUsBanner } from '@interfaces';
import styles from './AboutUsBanner.module.scss';

const AboutUsBanner = (props: IAboutUsBanner) => {
  const { aboutUsBanner } = props;

  return (
    <div className={styles.banner}>
      <div className={styles.compleft}>
        <CustomImage
          src={aboutUsBanner?.leftImg}
          alt={aboutUsBanner?.imgAlt}
          title={aboutUsBanner?.imgTitle}
          itemProp="primaryImageOfPage"
        />
      </div>
      <div className={styles.compright}>
        <CustomImage
          src={aboutUsBanner?.rightImg}
          alt={aboutUsBanner?.imgAlt}
          title={aboutUsBanner?.imgTitle}
          itemProp="primaryImageOfPage"
        />
      </div>
      <div className={styles.bannercontent}>
        <h1 itemProp="name" className={styles.textGradient}>
          {aboutUsBanner?.heading}
        </h1>
        <h2 itemProp="text">{aboutUsBanner?.subHeading}</h2>
        <p itemProp="description">{aboutUsBanner?.description}</p>
      </div>
    </div>
  );
};
export default AboutUsBanner;
