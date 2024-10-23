import { IFloatingInput } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styles from './floatingInput.module.scss';

const FloatingInput = ({
  type,
  // eslint-disable-next-line
  onChange = () => {},
  // eslint-disable-next-line
  inputRef = useRef(), //NOSONAR
  className = '',
  controlId,
  label,
  placeholder,
  controlProps,
  isInvalid,
  errorMsg,
  isClear,
  value = '',
  onClear,
  disabled = false,
  ...props
}: IFloatingInput) => {
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    if (controlProps?.value && controlProps?.value !== '') {
      if (!showClear) setShowClear(true);
    }
  }, [controlProps, showClear]);

  const clearContent = () => {
    try {
      if (onClear) {
        onClear();
      }
      setShowClear(false);
      inputRef.current.value = '';
    } catch (error) {
      if (onClear) {
        onClear();
        setShowClear(false);
      }
    }
  };

  return (
    <FloatingLabel controlId={controlId} label={label} className={`${styles.wrapper} ${className}`} {...props}>
      <>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            if (e.target.value !== '') {
              setShowClear(true);
            } else {
              setShowClear(false);
            }
            onChange(e);
          }}
          className={`${showClear ? styles.withIcon : ''}`}
          ref={inputRef}
          onBlur={() => {
            setTimeout(() => {
              setShowClear(false);
            }, 200);
          }}
          onFocus={() => {
            try {
              if (
                (inputRef.current && inputRef.current?.value !== '') ||
                value !== '' ||
                (controlProps?.value && controlProps?.value !== '')
              ) {
                setShowClear(true);
              }
            } catch (error) {
              console.error(error);
            }
          }}
          {...controlProps}
          isInvalid={isInvalid}
          disabled={disabled}
          autoComplete="off"
        />
        {errorMsg && <FormControl.Feedback type={'invalid'}>{errorMsg}</FormControl.Feedback>}
      </>
      {isClear && showClear && (
        <div
          className={`${styles.clearIcon} clear`}
          role="presentation"
          onClick={() => {
            clearContent();
          }}
          onMouseDown={() => {
            clearContent();
          }}
        >
          {getIconFromIconName('Cross')}
        </div>
      )}
    </FloatingLabel>
  );
};

export default FloatingInput;
