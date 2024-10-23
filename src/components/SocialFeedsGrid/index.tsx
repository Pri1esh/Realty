import { CustomImage } from '@components';
import { ISocialFeedsGrid, ISocialFeedsGridList } from '@interfaces';
import Link from 'next/link';
import { Figure } from 'react-bootstrap';
import styles from './SocialFeedsGrid.module.scss';

const SocialFeedsGrid = (props: ISocialFeedsGridList) => {
  const { feedsCard } = props;
  return (
    <div
      itemScope
      itemType="https://schema.org/ListItem"
      className={`${styles.gridrow} ${feedsCard?.length > 3 ? styles.fourColumn : ''}`}
    >
      {feedsCard?.map((data: ISocialFeedsGrid, key: number) => (
        <div className={styles.colfirst} key={`${data.link + key}`} data-columns={data.columns} itemProp="item">
          <div className={styles.card}>
            <Link itemProp="url" href={data?.link || '#'} passHref legacyBehavior>
              <a>
                <Figure>
                  <CustomImage itemProp="image" src={data.src} alt={data.imgalt} className="imgBackground" />
                </Figure>
                <div className={styles.cardbody}>
                  <h3 itemProp="name">{data.heading}</h3>
                </div>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SocialFeedsGrid;
