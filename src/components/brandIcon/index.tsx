import { IBrandIcon } from '@interfaces';
import { useDeviceType } from '@utils';
import { Figure } from 'react-bootstrap';
import styles from './brandIcon.module.scss';

const BrandIcon = (props: IBrandIcon) => {
  const { deviceType } = useDeviceType();

  return (
    <div itemProp="hasPart" className="mobSlideItem dubbleItem">
      <Figure className={styles.brandIcon}>
        {props.status && <span className={styles.comingSoon}>{props.status}</span>}
        <div itemProp="associatedMedia">
          <Figure.Image
            itemProp="image"
            className="imgBackground"
            src={deviceType === 'mobile' && props?.srcMobile ? props?.srcMobile : props?.src}
            alt={props.imgAlt ? props.imgAlt : props.caption}
            roundedCircle
          ></Figure.Image>
        </div>
        <Figure.Caption itemProp="name">{props.caption}</Figure.Caption>
      </Figure>
    </div>
  );
};

export default BrandIcon;
