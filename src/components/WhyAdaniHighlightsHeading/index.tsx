import { CustomImage } from '@components';
import { IWhyAdaniHighlightsHeading } from '@interfaces';
import styles from './WhyAdaniHighlightsHeading.module.scss';

const WhyAdaniHighlightsHeading = (props: IWhyAdaniHighlightsHeading) => {
  return (
    <div className={styles.whyusmain}>
      <div className={styles.cardblock}>
        <div className={styles.cardHeader}>
          <div className={styles.headericon1}>
            <CustomImage src={props.iconprimary} alt={props.alt} title={props.alt} />
            <CustomImage src={props.iconsecondary} alt={props.alt} title={props.alt} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyAdaniHighlightsHeading;
