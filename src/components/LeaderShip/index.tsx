import { CustomImage } from '@components';
import { ILeaderShip } from '@interfaces';
import styles from './LeaderShip.module.scss';

const LeaderShip = (props: ILeaderShip) => {
  return (
    <div className={styles.leadership}>
      <div className={styles.leaderSection}>
        <CustomImage src={props.src} alt={props.imgalt} title={props.imgtitle} />
        <h3>{props.name}</h3>
        <span>{props.designation}</span>
        <p dangerouslySetInnerHTML={{ __html: props.quote }} />
      </div>
    </div>
  );
};

export default LeaderShip;
