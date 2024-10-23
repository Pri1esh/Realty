import { CustomImage } from '@components';
import { IProjectTabs } from '@interfaces';
import styles from './projectsTabs.module.scss';
const ProjectTabs = (props: IProjectTabs) => {
  const {
    link,
    target,
    src,
    imgalt,
    imgtitle,
    imgtype,
    logo,
    logoalt,
    logotitle,
    title,
    location,
    subType,
    propertyType,
  } = props;
  return (
    <div className={styles.cardmain} itemScope itemType="https://schema.org/RealEstateListing">
      <a
        itemProp="url"
        href={link}
        target={target ? target : '_self'}
        rel={target == '_blank' ? 'noopener noreferrer' : ''}
      >
        <div className={styles.card}>
          <div className={styles.cardthumb}>
            <div className={styles.cardFigure}>
              <CustomImage
                itemProp="image"
                src={src}
                alt={imgalt}
                title={imgtitle}
                width={500}
                height={500}
                layout="intrinsic"
                className="imgBackground"
              />
              <div itemProp="text" className={styles.imgtype}>
                {imgtype}
              </div>
            </div>
            <div className={styles.thumblogo}>
              <CustomImage itemProp="image" src={logo} alt={logoalt} title={logotitle} />
            </div>
          </div>
          <div className={styles.cardbody}>
            <h3 itemProp="headline">{title}</h3>
            <p itemProp="about">{location}</p>
            <p>
              <span itemProp="description">{subType || propertyType}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};
export default ProjectTabs;
