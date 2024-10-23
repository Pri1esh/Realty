import { ISelectDropDown } from '@interfaces';
import { getIconFromIconName } from '@utils';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import style from './SelectDropDown.module.scss';

const SelectDropDown = (props: ISelectDropDown) => {
  const {
    label,
    placeholder,
    width = 'auto',
    error = false,
    menuWidth = 'auto',
    options,
    selected = '',
    setSelected,
    disabled = false,
    inputRef,
    errorMessage,
    onBlur,
    disabledStyle = false,
    open = false,
    delay = 0,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onchangedHandler = (e: string) => {
    setSelected(e);
  };

  useEffect(() => {
    open && setIsOpen(open ? open : false);
  }, [open]);

  const getClass = () => {
    if (errorMessage) {
      return 'errorContainer';
    } else if (disabledStyle) {
      return style.disabledContainer;
    } else return style.dropdown;
  };
  return (
    <div>
      <Dropdown
        placement="bottom"
        className={getClass()}
        style={{ width: `${width}` }}
        show={isOpen}
        onToggle={(isOpen) => {
          setTimeout(() => {
            setIsOpen(isOpen);
          }, delay);
        }}
        onSelect={(e: any) => onchangedHandler(e)}
      >
        <Dropdown.Toggle
          className={`d-flex align-items-center ${style.dropdown_toggle} ${isOpen ? style.dropdown_toggle_open : ''} ${
            error ? style.errorState : ''
          }`}
          disabled={disabled}
          onBlur={onBlur}
        >
          <div className="w-100 d-flex flex-column align-items-start">
            <div className={`${selected || isOpen ? style.floating_label : style.floating_label_float}`}>{label}</div>
            {selected && (
              <div className={style.dropdown_option}>{options?.find((item: any) => item.key === selected)?.label}</div>
            )}
            <div className={style.placeholder}>{selected === '' ? placeholder : ''}</div>
          </div>
          <div>{!isOpen ? getIconFromIconName('arrowdown') : getIconFromIconName('ArrowUp')}</div>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ width: `${menuWidth}` }} className={style.dropdown_menu}>
          {options?.map((val: any, i: React.Key | null | undefined) => (
            <Dropdown.Item
              className={style.dropdown_menu_item}
              key={`${(val.key || '') + i}`}
              eventKey={val.key}
              active={val.key === selected}
              itemRef={inputRef}
            >
              <div className={val.key === selected ? style.textActive : ''}>{val.label}</div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      </Dropdown>
    </div>
  );
};
export default SelectDropDown;
