import { IFloatingLabelContainer } from '@interfaces';
import { FC } from 'react';
import styles from './floatingLabelContainer.module.scss';

const FloatingLabelContainer: FC<IFloatingLabelContainer> = ({
  placeholder,
  className,
  hasValue,
  iconText,
  floatingContainerAutoId,
  ...props
}) => {
  return (
    <div
      className={`${styles.inputBlock} reacDatepickerContainer  ${className} ${hasValue ? 'focus-input' : ''}`}
      data-auto-id={floatingContainerAutoId}
    >
      {props.children}
      <span className={`${styles.formLabel} form_label`}> {placeholder} </span>
    </div>
  );
};

export default FloatingLabelContainer;
