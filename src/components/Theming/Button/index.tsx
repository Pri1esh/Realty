import { Close } from '@icons';
import { IButton } from '@interfaces';
import { useRipple } from '@utils';
import classnames from 'classnames';
import { FC, forwardRef } from 'react';
import { Button as BSButton } from 'react-bootstrap';
import Loader from '../Loader';
import styles from './button.module.scss';

const CSS_CLASSES = {
  ROOT: 'adl-button',
  ICONCLASS: 'button-Text_With_Icon',
};
const Button: FC<IButton> = forwardRef((props, ref) => {
  const {
    children,
    className = '',
    ripple = true,
    onClick,
    loading = false,
    showClose = false,
    icon,
    iconPosition = 'right',
    auto_id = '',
  } = props;
  const { createRipple } = useRipple();
  const cname = classnames(className, CSS_CLASSES.ROOT);
  const getIconWithChildren = (
    <div className={`${CSS_CLASSES.ICONCLASS} ${iconPosition.toLowerCase() === 'left' ? 'left' : 'right'}`}>
      <span>{children}</span> <span>{icon}</span>{' '}
    </div>
  );
  return (
    <BSButton
      ref={ref}
      className={cname}
      {...props}
      onClick={(e) => {
        if (!loading) {
          if (onClick) {
            onClick();
          }
        }
        if (ripple) {
          createRipple(e);
        }
      }}
      auto-id={auto_id}
    >
      {showClose ? <Close className={styles.btnClose} /> : ''}
      {loading ? (
        <Loader bg={props?.variant && props.variant.toLowerCase().includes('link') ? '#000000' : ''} />
      ) : icon ? (
        getIconWithChildren
      ) : (
        children
      )}
    </BSButton>
  );
});

Button.displayName = 'Button';
export default Button;
