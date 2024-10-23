import { IBackHeader } from '@interfaces';
import { FC } from 'react';
import IconButton from '../IconButton';
import styles from './backHeader.module.scss';

const BackHeader: FC<IBackHeader> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick = () => {},
  showBack = true,
}) => {
  return (
    <header className={styles.backHeader}>
      {showBack && (
        <IconButton onClick={handleClick}>{showBack && <i className="iconfonts icon-arrowdown"></i>}</IconButton>
      )}
    </header>
  );
};

export default BackHeader;
