import { CustomImage } from '@components';
import { ISimilarProjects } from '@interfaces';
import styles from './similarprojects.module.scss';

const SimilarProjects = (props: ISimilarProjects) => {
  const { src, logosrc, title, type, status, link, linkTarget } = props;

  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'ready to move':
        return styles.readytoMove;
      case 'under construction':
        return styles.underConstruction;
      case 'new launch':
        return styles.new_launch;
      default:
        return 'd-none';
    }
  };
  return (
    <div className={styles.similarprojectsbox}>
      <div className={styles.similarprojectsboxthumb}>
        <a itemProp="relatedLink" href={link} target={linkTarget ? linkTarget : '_self'}>
          {' '}
          <CustomImage itemProp="image" src={src} alt={title} className="imgBackground" />{' '}
        </a>
        <p>
          <a itemProp="relatedLink" href={link}>
            {' '}
            {type}
          </a>
        </p>
      </div>
      <div className={styles.similarprojectslogo}>
        <a itemProp="relatedLink" href={link}>
          {' '}
          <CustomImage itemProp="image" src={logosrc} alt={title} />
        </a>
      </div>
      <div className={styles.similarprojectsdetails}>
        <a itemProp="relatedLink" href={link}>
          <span itemProp="description" className={getStatusStyles()}>
            <i></i> {status}
          </span>
        </a>
        <h3>
          {' '}
          <a itemProp="relatedLink" href={link}>
            {' '}
            {title}
          </a>
        </h3>
      </div>
    </div>
  );
};
export default SimilarProjects;
