import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const TextArea = (props: any) => {
  const { control, errorMsg = '', label = '', errors, controlName, allowedMaxLength = 140 } = props;

  return (
    <>
      <Controller
        control={control}
        name={controlName}
        rules={{
          required: errorMsg,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <FloatingLabel controlId="floatingTextarea2" label={label}>
              <Form.Control
                as="textarea"
                placeholder={label}
                className={`${errors?.[controlName]?.message ? styles.isInvalid : ''} ${styles.textarea}`}
                value={value}
                onBlur={onBlur}
                onChange={(e: any) => {
                  onChange(e?.target?.value);
                }}
                maxLength={allowedMaxLength}
              />
            </FloatingLabel>
            <div className={styles.invalidErrorText}>{errors?.[controlName]?.message}</div>
          </>
        )}
      />
    </>
  );
};

export default TextArea;
