import { CustomImage } from '@components';
import { ISocialSection } from '@interfaces';
import { Container } from 'react-bootstrap';
import FacebookFeed from '../FacebookFeed';
import SocialFeedsGrid from '../SocialFeedsGrid';
import styles from './SocialSection.module.scss';
const SocialSection = (props: ISocialSection) => {
  const { feedsdata, feedsImage } = props;
  return (
    <div className={styles.socialSection}>
      <Container>
        <div className="row">
          <div className={`${styles.socialGrids} col-lg-8`}>
            {feedsdata?.data && <SocialFeedsGrid feedsCard={feedsdata?.data} />}
          </div>
          <div
            className={`${styles.socialGrids} col-lg-4 text-center`}
            onFocus={(e) => e.target.focus({ preventScroll: true })}
          >
            <FacebookFeed />
          </div>
        </div>
      </Container>
      <div className={styles.bgImage}>
        <span>
          <CustomImage src={feedsImage?.waveImage ? feedsImage?.waveImage : ''} alt={feedsImage?.waveImageAlt} />
        </span>
      </div>
    </div>
  );
};

export default SocialSection;
