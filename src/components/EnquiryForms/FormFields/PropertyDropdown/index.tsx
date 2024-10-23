import { ISelectProperty } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import style from './PropertyDropdown.module.scss';

const PropertyDropdown = (props: ISelectProperty) => {
  const {
    label,
    placeholder,
    width,
    error = false,
    menuWidth,
    options,
    selected = '',
    setSelected,
    disabled = false,
    inputRef,
    errorMessage,
    onBlur,
    disabledStyle = false,
    setProjectNameValue,
    currentValue,
    setConfigurationFilterData,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const onchangedHandler = (e: string) => {
    setSelected && setSelected(e);
    setProjectNameValue && setProjectNameValue(e);
  };

  useEffect(() => {
    if (currentValue === undefined || currentValue === null) {
      setSelected && setSelected('');
      setProjectNameValue && setProjectNameValue('');
    }
    const configurationData = options?.filter(
      (item) => (selected.includes('-') ? item.data.propertyID : item.data.projectName) === selected,
    );
    setConfigurationFilterData &&
      setConfigurationFilterData(configurationData && configurationData[0]?.data?.propertyConfiguration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  return (
    <div className="dropdown-property">
      <Dropdown
        placement="bottom"
        className={`${errorMessage ? style.errorContainer : style.dropdown} ${
          disabledStyle ? style.disabledContainer : style.dropdown
        }`}
        style={{ width: `${width}` }}
        onToggle={(isOpen) => setIsOpen(isOpen)}
        onSelect={(e: any) => onchangedHandler(e)}
      >
        <Dropdown.Toggle
          style={{ width: `${width}` }}
          className={`d-flex align-items-center ${style.dropdown_toggle} ${isOpen ? style.dropdown_toggle_open : ''} ${
            error ? style.errorState : ''
          }`}
          disabled={disabled}
          onBlur={onBlur}
        >
          <div className="w-100 d-flex flex-column align-items-start">
            <div className={`${selected || isOpen ? style.floating_label : style.floating_label_float}`}>{label}</div>
            {selected && (
              <div className={style.dropdown_option}>
                <div>
                  {
                    options?.find(
                      (item) => (selected.includes('{') ? item.data.propertyID : item.data.projectName) === selected,
                    )?.data?.projectName
                  }
                </div>
                <div className={style.dropdown_option_location}>
                  {
                    options?.find(
                      (item) => (selected.includes('{') ? item.data.propertyID : item.data.projectName) === selected,
                    )?.data?.propertyLocation
                  }
                </div>
              </div>
            )}
            <div className={style.placeholder}>{!selected && <span>{selected === '' ? placeholder : ''}</span>}</div>
          </div>
          {!disabled && (
            <div className={style.dropdownArrow}>
              {!isOpen ? (
                <span>{getIconFromIconName('arrowdown')}</span>
              ) : (
                <span>{getIconFromIconName('ArrowUp')}</span>
              )}
            </div>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ width: `${menuWidth}` }} className={style.dropdown_menu}>
          {options?.map((val, i: React.Key | number) => (
            <Dropdown.Item
              className={style.dropdown_menu_item}
              key={`${val?.data?.propertyID + i}`}
              eventKey={val?.data?.propertyID}
              active={val?.data?.propertyID === selected}
              itemRef={inputRef}
            >
              <div className={val?.data?.propertyID === selected ? style.textActive : ''}>
                <b>{val?.data?.projectName}</b>
                <span>{val?.data?.propertyLocation}</span>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      </Dropdown>
    </div>
  );
};
export default PropertyDropdown;
