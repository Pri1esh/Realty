import { ICustomHeader } from '@interfaces';
import { FC } from 'react';
import styles from './sectionHeader.module.scss';

const CustomHeader: FC<ICustomHeader> = ({ classNames = '', heading, ...props }) => (
  <header
    className={` ${styles.sectionHeader} ${classNames}`}
    {...props}
    auto-id={`data_${heading?.toLowerCase()?.replace(/ /g, '_')}`}
  >
    {props.children}
  </header>
);
export { CustomHeader };
