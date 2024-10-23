import { CustomImage, ReadMore } from '@components';
import { IWhyAdaniHighlights } from '@interfaces';
import styles from './whyAdaniHighlights.module.scss';

const WhyAdaniHighlights = (props: IWhyAdaniHighlights) => {
  return (
    <div className={styles.whyusmain}>
      <div className={styles.cardblock}>
        <div className={styles.cardBlockWrap} data-align={props?.aligncol}>
          <div className={styles.cardblockdescription}>
            <p className={styles.heading} itemProp="headline">
              {props?.heading}
            </p>
            <p className={styles.subText} itemProp="text">
              {props?.subheading}
            </p>
            {props?.description && <ReadMore data={props?.description} textLength={220} />}
          </div>
          <div className={styles.cardblockthumb}>
            {props.imgType && <span className={styles.imgType}>{props.imgType}</span>}
            <CustomImage
              src={props.src ? props?.src : ''}
              alt={props.imageAlt}
              title={props.imageTitle}
              itemProp="image"
              className="imgBackground"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyAdaniHighlights;
