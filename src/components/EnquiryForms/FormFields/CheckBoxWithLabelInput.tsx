import { ICheckBoxWithLabel } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const CheckBoxWithLabelInput = (props: ICheckBoxWithLabel) => {
  const { control, controlName, id, label, errors, errorMsg = '' } = props;
  return (
    <div className={styles.checkData}>
      <div>
        <Controller
          control={control}
          name={controlName}
          rules={{
            required: errorMsg ? errorMsg : false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="checkbox"
              className="form-check-input"
              id={id}
              checked={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
      {errorMsg && <div className="invalid-feedback">{errors[controlName]?.message}</div>}
    </div>
  );
};

export default CheckBoxWithLabelInput;
