import { IIconButton } from '@interfaces';
import { useRipple } from '@utils';
import { FC } from 'react';
import styles from './iconbutton.module.scss';

const IconButton: FC<IIconButton> = (props) => {
  const { children, onClick, ripple = true, ariaLabel = 'icon button', className } = props;
  const { createRipple } = useRipple();

  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`}
      auto-id={ariaLabel}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (ripple) {
          createRipple(e);
        }

        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};
export default IconButton;
