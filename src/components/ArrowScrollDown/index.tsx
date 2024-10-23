import { IArrowScrollDown } from '@interfaces';
import { ArrowBottom } from '../../icons';
import styles from './ArrowScrollDown.module.scss';

const ArrowScrollDown = (props: IArrowScrollDown) => {
  const { scrollRef } = props;
  return (
    <div
      className={styles.arrowScrollDown}
      onClick={() => {
        window && scrollRef?.current && window.scrollBy(0, scrollRef?.current?.offsetTop - 80);
      }}
    >
      <ArrowBottom />
    </div>
  );
};

export default ArrowScrollDown;
