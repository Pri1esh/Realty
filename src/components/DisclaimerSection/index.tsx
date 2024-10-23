import { IDisclaimerSection } from '@interfaces';
import styles from './DisclaimerSection.module.scss';

const DisclaimerSection = (props: IDisclaimerSection) => {
  const { imageDisclaimer, emiDisclaimer, headingDisclaimer } = props;
  return (
    <div className={styles.disclaimer}>
      {headingDisclaimer && <h3 itemProp="headline">{headingDisclaimer}</h3>}
      {imageDisclaimer && <p itemProp="description">{imageDisclaimer}</p>}
      {emiDisclaimer && <p itemProp="text" dangerouslySetInnerHTML={{ __html: emiDisclaimer }} />}
    </div>
  );
};

export default DisclaimerSection;
