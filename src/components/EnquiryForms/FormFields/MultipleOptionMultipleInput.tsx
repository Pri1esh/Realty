import { Ripple } from '@components';
import { IMultipleOptionMultipleInput } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const MultipleOptionMultipleInput = (props: IMultipleOptionMultipleInput) => {
  const { heading, options, control, controlName = '', errorMsg, onChangeOption, errors, showError = true } = props;
  return (
    <div className={styles.selectType}>
      <label className="mb-2 d-block">
        <b>{heading}</b>
      </label>
      <div className={`${styles.btnGroup} ${styles.btnGroupCheck} ${styles.filter_btngroup}`}>
        {options?.map((item: string, index: number) => (
          <Controller
            key={`${item.replace('.', '_') + index}`}
            control={control}
            name={`${controlName}${item.replace('.', '_')}`}
            rules={{
              required: errorMsg,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <div
                  className={`${value ? styles.active : ''} ${styles.customCheck}`}
                  onClick={() => {
                    onChangeOption(onChange, value, item);
                  }}
                >
                  <Ripple>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={item}
                      checked={value ? true : false}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor={item}>
                      {item}
                    </label>
                  </Ripple>
                </div>
              </>
            )}
          />
        ))}
        <div className="invalid-feedback">
          {showError && errors[`size${options && options[0]?.replace('.', '_')}`]?.message}
        </div>
      </div>
    </div>
  );
};

export default MultipleOptionMultipleInput;
