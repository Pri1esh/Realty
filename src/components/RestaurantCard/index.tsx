import { Button, CustomImage } from '@components';
import { IRestaurantCard } from '@interfaces';
import styles from './RestaurantCard.module.scss';

const RestaurantCard = (props: IRestaurantCard) => {
  const {
    restaurantData = true,
    thumbLogo = true,
    officeAddress = false,
    articlesCard = false,
    enquireBtn = true,
    slug,
    src,
    title,
    logo,
    discount,
    price,
    date,
    address,
    status,
    imgtitle,
  } = props;

  return (
    <div
      className={`${styles.restaurantCard} ${officeAddress && styles.officeCard} ${
        articlesCard && styles.articlesCard
      }`}
    >
      <div className={styles.imgWrapper}>
        {slug ? (
          <a href={slug}>
            {imgtitle && <span className={styles.imgType}>{imgtitle}</span>}
            <CustomImage
              className={`imageRadius imgBackground ${styles.restaurantImg}`}
              src={src ? src : ''}
              alt={title}
              itemProp="image"
            />
          </a>
        ) : (
          <CustomImage
            className={`imageRadius imgBackground ${styles.restaurantImg}`}
            src={src ? src : ''}
            alt={title}
            itemProp="image"
          />
        )}
      </div>
      {thumbLogo && (
        <CustomImage className={styles.restaurantLogo} src={logo ? logo : ''} alt={title} itemProp="image" />
      )}
      {discount ? (
        <span className={styles.discount} itemProp="text">
          {discount} off
        </span>
      ) : (
        ''
      )}

      {slug ? (
        <a href={slug} itemProp="url">
          <h3 itemProp="headline">{title}</h3>
        </a>
      ) : (
        <h3 itemProp="headline">{title}</h3>
      )}

      {restaurantData && (
        <div className={styles.flexBox}>
          <div>
            {price && (
              <span className={styles.price} itemProp="name">
                {price} for two
              </span>
            )}
            {date && (
              <span className={styles.price} itemProp="contentReferenceTime">
                {date}
              </span>
            )}
            {status && (
              <span className={styles.status} data-status={status}>
                {' '}
                <small>&#8226;</small> {status}
              </span>
            )}
          </div>
          {enquireBtn && (
            <Button variant="outline-dark" itemProp="name">
              Enquire Now
            </Button>
          )}
        </div>
      )}
      {officeAddress && <p dangerouslySetInnerHTML={{ __html: address }} itemProp="description" />}
    </div>
  );
};
export default RestaurantCard;
