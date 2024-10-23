import { ISelectDropdown } from '@interfaces';
import { getIconFromIconName } from '@utils';
import { FC, useState } from 'react';
import Select from 'react-select';
import FloatingLabelContainer from '../FloatingLabelContainer';
import styles from './selectDropdown.module.scss';

const SelectDropdown: FC<ISelectDropdown> = ({
  onFocus,
  onBlur,
  onChange,
  label,
  className,
  errMsg,
  options,
  defaultValue = '',
  ...props
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [selected, setSelected] = useState<any>(defaultValue);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <FloatingLabelContainer hasValue={selected || hasFocus} placeholder={label} className={styles.wrapper}>
        <Select
          value={selected}
          onChange={(e) => {
            onChange(e);
            setSelected(e);
          }}
          onMenuClose={() => {
            setOpen(false);
          }}
          onMenuOpen={() => {
            setOpen(true);
          }}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setHasFocus(true);
          }}
          onBlur={() => {
            onBlur();
            setHasFocus(false);
          }}
          options={options}
          className={`form-control ${className}`}
          placeholder={''}
          {...props}
        />
        <div className={styles.dropdownArrow}>
          {!open ? <span>{getIconFromIconName('arrowdown')}</span> : <span>{getIconFromIconName('ArrowUp')}</span>}
        </div>
        {errMsg && <p className={`err-msg`}>{errMsg}</p>}
      </FloatingLabelContainer>
    </>
  );
};

export default SelectDropdown;
