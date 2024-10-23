import { Button, IconButton } from '@components';
import { IOtpInput } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './OtpInput.module.scss';

const OtpInput = (props: IOtpInput) => {
  const { enquireFormData, submit, onHide, mobileNumber, resend, otpErr, disableForm = false, timer, setTimer } = props;
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current && firstInputRef.current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const [buttonState, setbuttonState] = useState('disabled');

  const [inputValues, setValues] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  });
  const [inputOtp, setInputOtp] = useState('');

  useEffect(() => {
    const inputArray = Object.values(inputValues);
    const checkinput = (value: string) => {
      return value == '';
    };
    const inputstatus = inputArray.some(checkinput);
    if (!inputstatus) {
      setbuttonState('');
    } else {
      setbuttonState('disabled');
    }
  }, [inputValues]);

  useEffect(() => {
    setInputOtp(inputValues?.otp1 + inputValues?.otp2 + inputValues?.otp3 + inputValues?.otp4 + inputValues?.otp5);
  }, [inputValues]);

  const handleChange = (
    value: 'otp1' | 'otp2' | 'otp3' | 'otp4' | 'otp5',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    event.target.value = event.target.value.replace(inputValues[value], '');
    setValues((prevState) => ({
      ...prevState,
      [value]: event.target.value,
    }));
  };

  const inputfocus = (elmnt: any) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 1;
      if (next > 0) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      if (elmnt.target.value == '') {
        return false;
      } else {
        const next = elmnt.target.tabIndex + 1;
        if (next <= 5) {
          elmnt.target.form.elements[next].focus();
        } else {
          elmnt.target.form.elements[5].blur();
        }
      }
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return;
    e.target.select();
  };

  return (
    <div className={styles.otpInput}>
      <Form onSubmit={() => submit(inputOtp)}>
        <IconButton
          className="iconButton"
          onClick={() => {
            onHide();
          }}
        >
          {getIconFromIconName('ArrowLeft')}
        </IconButton>
        <p>
          {enquireFormData?.wehavesentviaSMStoLabel} {mobileNumber?.countryCode} {mobileNumber?.phoneNumber}{' '}
          <span
            title="Edit Mobile Number"
            onClick={() => {
              onHide();
            }}
          >
            {enquireFormData?.editButtonLable}
          </span>
        </p>

        <div className={styles.otpContainer}>
          <input
            ref={firstInputRef}
            name="otp1"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={inputValues.otp1}
            onChange={(e) => handleChange('otp1', e)}
            tabIndex={1}
            onKeyUp={(e) => inputfocus(e)}
            autoFocus
            disabled={disableForm}
            onFocus={(e) => handleFocus(e)}
            maxLength={1}
          />
          <input
            name="otp2"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={inputValues.otp2}
            onChange={(e) => handleChange('otp2', e)}
            tabIndex={2}
            onKeyUp={(e) => inputfocus(e)}
            disabled={disableForm}
            onFocus={(e) => handleFocus(e)}
            maxLength={1}
          />
          <input
            name="otp3"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={inputValues.otp3}
            onChange={(e) => handleChange('otp3', e)}
            tabIndex={3}
            onKeyUp={(e) => inputfocus(e)}
            disabled={disableForm}
            onFocus={(e) => handleFocus(e)}
            maxLength={1}
          />
          <input
            name="otp4"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={inputValues.otp4}
            onChange={(e) => handleChange('otp4', e)}
            tabIndex={4}
            onKeyUp={(e) => inputfocus(e)}
            disabled={disableForm}
            onFocus={(e) => handleFocus(e)}
            maxLength={1}
          />

          <input
            name="otp5"
            type="tel"
            autoComplete="off"
            className="otpInput"
            value={inputValues.otp5}
            onChange={(e) => handleChange('otp5', e)}
            tabIndex={5}
            onKeyUp={(e) => inputfocus(e)}
            disabled={disableForm}
            onFocus={(e) => handleFocus(e)}
            maxLength={1}
          />
        </div>

        <div className={styles.otpBtnContainer}>
          <Button className={styles.submitBtn} disabled={buttonState || disableForm} type="submit">
            {enquireFormData?.submitButtonText}
          </Button>
        </div>
        {!disableForm &&
          (timer == 0 ? (
            <p>
              Haven&apos;t received a OTP?
              <span
                title="Resend OTP"
                onClick={() => {
                  resend();
                }}
              >
                {enquireFormData?.resendButtonLabel.trim()}
              </span>
            </p>
          ) : (
            <p>
              You will receive an OTP in <strong>{timer} seconds.</strong>
            </p>
          ))}
      </Form>
      {otpErr && <div className={disableForm ? styles.otpError : styles.error}>{otpErr}</div>}
    </div>
  );
};
export default OtpInput;
