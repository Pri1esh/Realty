import { CustomIcon, ErrorFallback as Error, FloatingInput } from '@components';
import { ICountryFlags, IMobileInput } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import CountryFlagDropdown from './CountryFlagDropdown';
import CountrySpriteImage from './CountrySprite';
import styles from './mobileNumberInput.module.scss';

const MobileNumberInput = (props: IMobileInput) => {
  const {
    selectedCountryCode = '+91',
    label = '',
    countryCode = true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChangeMobileNumber = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    errorMessage = '',
    phoneNumber = '',
    setPhoneNumber,
    options = [],
    isDropdown = true,
    controlProps,
    contactNoLen = 15,
    isClear = true,
    inputClass = '',
    name = '',
    errors,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onErase = () => {},
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
    placeholder = '',
  } = props;

  const [countryDropDown, setCountryDropDown] = useState(false);
  const countryLabel = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();
  const [selectedCountry, setSelectedCountry] = useState<ICountryFlags>();

  useEffect(() => {
    setSelectedCountry(
      options?.find(
        (country: ICountryFlags) => country.dialCode?.replace('+', '') === selectedCountryCode.replace('+', ''),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, selectedCountryCode]);

  const handlePhoneNumber = (e: { target: { value: string } }, passedValue = '') => {
    const value = e?.target?.value || passedValue;
    const re = /^[0-9\b]+$/;
    if ((value === '' || re.test(value)) && value.length <= contactNoLen) {
      setPhoneNumber && setPhoneNumber(value);
      onChangeMobileNumber({
        phoneNumber: value,
        countryCode: selectedCountry?.dialCode || '',
        alpha2Code: selectedCountry?.code || '',
      });
    }
  };

  const selectCountry = (item: ICountryFlags) => {
    setCountryDropDown(false);
    setSelectedCountry(item);
    onChangeMobileNumber({
      phoneNumber: phoneNumber,
      countryCode: item?.dialCode,
      alpha2Code: item?.code,
    });
  };

  const onCountryInputClick = () => {
    if (deviceType === 'desktop') {
      setCountryDropDown((prev) => !prev);
    } else {
      setCountryDropDown(true);
    }
  };

  const resetMobileNumber = () => {
    onChangeMobileNumber({ phoneNumber: '' });
    onErase && onErase();
    setPhoneNumber && setPhoneNumber('');
  };

  return (
    <>
      <div className={`${styles.wrapper} ${errors.phoneNo ? styles.error : ''} ${inputClass}`}>
        <div>
          <div className={`${styles.combineOption}`}>
            {countryCode ? (
              <div
                className={styles.countryCode}
                ref={countryLabel}
                onClick={() => isDropdown && onCountryInputClick()}
              >
                <div className={styles.selectFlag}>
                  <CountrySpriteImage code={selectedCountry?.code} />
                  <input
                    className={styles.countryInputFlag}
                    type="text"
                    autoComplete="off"
                    aria-label="Select country code"
                    value={selectedCountry?.dialCode}
                  />
                </div>
                {isDropdown ? (
                  <div className={`${styles.icon} ${countryDropDown ? styles.arrowUp : ''}`}>
                    <CustomIcon iconName="ArrowUp" />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            <div className={styles.numWrap}>
              <FloatingInput
                controlProps={{
                  ...controlProps,
                  value: phoneNumber,
                  autoComplete: 'off',
                }}
                onChange={(e: any) => {
                  handlePhoneNumber(e);
                }}
                onBlur={onBlur}
                name={name}
                inputRef={inputRef}
                label={label || 'Mobile Number'}
                placeholder={placeholder || 'Mobile Number'}
                className={styles.mobileInput}
                onClear={resetMobileNumber}
                isClear={isClear}
              />
            </div>
          </div>
        </div>
        {errorMessage && <Error error={errorMessage} />}
        {isDropdown && countryDropDown && (
          <CountryFlagDropdown
            selectedCountry={selectedCountry}
            countryLabel={countryLabel}
            setCountryDropDown={setCountryDropDown}
            options={options}
            selectCountry={selectCountry}
          />
        )}
      </div>
    </>
  );
};

export default MobileNumberInput;
