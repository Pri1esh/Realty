import { ICountryFlagDropdown, ICountryFlags } from '@interfaces';
import { getIconFromIconName, useDeviceType } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import CountrySpriteImage from '../CountrySprite';
import styles from './countryFlagDropdown.module.scss';

const CountryFlagDropdown = (props: ICountryFlagDropdown) => {
  const { selectedCountry, selectCountry, options, countryLabel, setCountryDropDown } = props;

  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [filteredCountries, setFilteredCountries] = useState<any>(options);
  const [searchValue, setSearchValue] = useState('');
  const clearRef = useRef<any>(null);
  const countryDropDownRef = useRef<any>(null);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    setFilteredCountries(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryDropDownRef, clearRef]);

  const handleClickOutside = (event: any) => {
    if (countryDropDownRef.current && !countryDropDownRef.current.contains(event.target)) {
      if (countryLabel.current && !countryLabel.current.contains(event.target)) {
        setCountryDropDown(false);
        resetSearch();
      }
    }
  };

  const resetSearch = () => {
    setSearchValue('');
    setFilteredCountries(options);
  };

  const filterCountry = (e: any) => {
    const { value } = e.target;
    if (value && value != '') {
      const filteredOptions: any = options?.filter(
        (item: any) => item?.dialCode?.includes(value) || item?.name?.toLowerCase()?.startsWith(value?.toLowerCase()),
      );
      setFilteredCountries(filteredOptions);
    } else {
      setFilteredCountries(options);
    }
  };

  const FlagDropdown = useMemo(() => {
    return (
      <div className={styles.countryCodeLayer} id="countryid" ref={countryDropDownRef}>
        <div className={styles.searchBoxParent}>
          <div className={styles.searchBox}>
            {getIconFromIconName('Search')}
            <input
              placeholder="Select Country"
              autoComplete="off"
              type="text"
              value={searchValue}
              onChange={(e) => {
                filterCountry(e);
                setSearchValue(e.target.value);
              }}
              className={styles.searchField}
            />
            {searchValue !== '' ? (
              <a ref={clearRef} className={styles.clearIcon} onClick={() => resetSearch()}></a>
            ) : (
              ''
            )}
          </div>
        </div>
        {filteredCountries?.map((item: ICountryFlags) => (
          <ul
            className={styles.countryList}
            onClick={() => {
              selectCountry(item);
              resetSearch();
            }}
            key={item?.name}
          >
            <li
              className={
                item?.dialCode?.replace('+', '') == selectedCountry?.dialCode?.replace('+', '')
                  ? styles.activeCountry
                  : ''
              }
            >
              <CountrySpriteImage code={item?.code} />
              <p>{item?.name}</p>
              <span>{item?.dialCode}</span>
            </li>
          </ul>
        ))}
        <p className={styles.countriesInfo}>
          <svg viewBox="0 0 243 181">
            <image
              href="https://sa.adanione.com/ns_assets/images/svg/earth-location.svg"
              width="243"
              height="181"
            ></image>
          </svg>
          <span>Launching goodness into more countries soon!</span>
        </p>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return deviceType === 'desktop' ? (
    FlagDropdown
  ) : (
    <Offcanvas
      show={showDropdown}
      className={styles.offcanvas}
      onHide={() => setShowDropdown(false)}
      placement={'bottom'}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Country Code</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvasBody}>{FlagDropdown}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default CountryFlagDropdown;
