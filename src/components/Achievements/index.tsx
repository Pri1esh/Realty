import { Countup, CustomIcon } from '@components';
import { IAchievements } from '@interfaces';
import styles from './achievements.module.scss';

const Achievements = (props: IAchievements) => {
  return (
    <div itemScope itemType="https://schema.org/Thing" className={styles.achievements}>
      <ul>
        {props?.data?.map(
          (
            item: {
              icon: string;
              start: string;
              count: string;
              delay: string;
              desc: string;
            },
            index: number,
          ) => (
            <li itemType="identifier" key={`${item.count + index}`}>
              <CustomIcon iconName={item.icon} />
              <Countup start={item.start} endCount={item.count} delay={item.delay ? item.delay : '2.5'} />
              <small itemType="description">{item.desc}</small>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Achievements;
