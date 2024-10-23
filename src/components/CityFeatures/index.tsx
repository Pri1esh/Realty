import { ICityFeatures } from '@interfaces';
import { getIconFromIconName } from '@utils';
import styles from './CityFeatures.module.scss';

const CityFeatures = (props: ICityFeatures) => {
  return (
    <div className={styles.cityFeatures}>
      <ul>
        {props?.data?.map((item: string, index: number) => (
          <li key={`${item + index}`}>
            {getIconFromIconName(item)}
            <small>{item}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityFeatures;
