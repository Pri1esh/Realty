import { MobileNumberInput as MobileInput } from '@components';
import { IMobileNumberInput } from '@interfaces';
import { isValidNumberForRegion } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const MobileNumberInput = (props: IMobileNumberInput) => {
  const { getValues, errors, enquireFormData, countryFlags, control } = props;

  const { phoneNo: PhoneNoMsg } = enquireFormData.errorData;
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getValues('phoneNo')?.countryCode && setSelectedCountryCode(getValues('phoneNo')?.countryCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeMobileNumber = (
    e: any,
    onChange: { (...event: any[]): void; (...event: any[]): void; (arg0: undefined): void },
  ) => {
    const prevMobileNoLen = getValues('phoneNo')?.phoneNumber?.length;
    const newMobileNoLen = e?.alpha2Code === 'IN' ? 10 : 15;

    if (e?.phoneNumber && e?.phoneNumber !== '') {
      if (newMobileNoLen < prevMobileNoLen) {
        e.phoneNumber = e?.phoneNumber.slice(0, newMobileNoLen);
      }
      onChange(e);
    } else if (e?.countryCode !== '' && e?.alpha2Code !== '') {
      onChange({ phoneNumber: '', countryCode: e?.countryCode, alpha2Code: e?.alpha2Code });
    } else {
      onChange({ ...getValues('phoneNo'), phoneNumber: '' });
    }
    setPhoneNumber(getValues('phoneNo')?.phoneNumber || '');
  };

  const mobileNumberValidation = () => {
    return (getValues('phoneNo')?.phoneNumber &&
      getValues('phoneNo')?.phoneNumber?.length > 0 &&
      getValues('phoneNo')?.phoneNumber?.[0] === '0') ||
      getValues('phoneNo')?.phoneNumber?.length <= 5 ||
      (getValues('phoneNo')?.phoneNumber?.length > 5 &&
        !isValidNumberForRegion(getValues('phoneNo')?.phoneNumber, getValues('phoneNo')?.alpha2Code as CountryCode))
      ? PhoneNoMsg
      : true;
  };

  const onEraseMobileNumber = (
    onChange: (arg0: { phoneNumber: string; countryCode: any; alpha2Code: any }) => void,
  ) => {
    onChange({
      phoneNumber: '',
      countryCode: getValues('phoneNo')?.countryCode,
      alpha2Code: getValues('phoneNo')?.alpha2Code,
    });
    setPhoneNumber('');
  };

  return (
    <Controller
      control={control}
      name="phoneNo"
      rules={{
        required: PhoneNoMsg,
        validate: mobileNumberValidation,
      }}
      render={({ field: { onChange, onBlur } }) => {
        return (
          <>
            <MobileInput
              inputClass={`${errors?.phoneNo ? 'is-invalid' : ''}`}
              controlProps={{
                maxLength: getValues('phoneNo')?.alpha2Code === 'IN' ? 10 : 15,
              }}
              selectedCountryCode={selectedCountryCode}
              isDropdown={true}
              options={countryFlags}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              contactNoLen={getValues('phoneNo')?.alpha2Code === 'IN' ? 10 : 15}
              onChangeMobileNumber={(e: any) => onChangeMobileNumber(e, onChange)}
              onBlur={() => {
                onBlur();
              }}
              onErase={() => {
                onEraseMobileNumber(onChange);
              }}
              placeholder={enquireFormData.mobileLabel}
              errors={errors}
            />
            <div className={styles.invalidErrorText}>{errors?.phoneNo?.message}</div>
          </>
        );
      }}
    />
  );
};

export default MobileNumberInput;
