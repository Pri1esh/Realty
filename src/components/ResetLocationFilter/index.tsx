import { Button } from '@components';
import { IResetLocationFilter } from '@interfaces';
import styles from './resetLocationFilter.module.scss';
const ResetLocationFilter = (props: IResetLocationFilter) => {
  const { heading, description, buttonText, resetFilter, button = true } = props;

  return (
    <div itemProp="description" className={styles.resetLocationFilterContainer}>
      <h3 itemProp="headline" className={styles.heading}>
        {heading}
      </h3>
      <p itemProp="text" className={styles.description}>
        {description}
      </p>
      {button && (
        <Button variant="outline-secondary" onClick={resetFilter}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ResetLocationFilter;
