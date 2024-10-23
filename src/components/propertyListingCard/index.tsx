import { CustomImage } from '@components';
import { IPropertyListingCard } from '@interfaces';
import styles from './propertyListingCard.module.scss';

const PropertyListingCard = (props: IPropertyListingCard) => {
  return (
    <div itemProp="exampleOfWork" className={styles.listingCarousel}>
      <a
        itemProp="url"
        href={props?.link || '#'}
        target={props?.target ? props?.target : '_self'}
        rel={props.target == '_blank' ? 'noopener noreferrer' : ''}
      >
        <CustomImage
          itemProp="image"
          className={`${styles.propImage} imgBackground`}
          alt={props.alt}
          src={props.src}
          width="100%"
        />
        <label itemProp="description" className={styles.imageDesc}>
          {props.imageDesc}
        </label>
      </a>
    </div>
  );
};

export default PropertyListingCard;
