import { ILoader } from '@interfaces';
import { FC } from 'react';
import styles from './loader.module.scss';

const Loader: FC<ILoader> = (props) => {
  const bgstyle = props.bg ? { background: props.bg } : undefined;
  return (
    <span className={styles.loader}>
      <span className={styles.loaderDot} style={bgstyle}></span>
      <span className={styles.loaderDot} style={bgstyle}></span>
      <span className={styles.loaderDot} style={bgstyle}></span>
    </span>
  );
};

export default Loader;
