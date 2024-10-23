import { Ripple } from '@components';
import { IMultipleOptionSingleInput, IProjectTypeOption } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const MultipleOptionSingleInput = (props: IMultipleOptionSingleInput) => {
  const { heading, control, errorMsg, options, onChangeOption, selectedOption, errors, controlName } = props;
  return (
    <div className={styles.selectType}>
      <label className="mb-2 d-block">
        <b>{heading}</b>
      </label>
      <div className={`${styles.btnGroup} ${styles.filter_btngroup}`}>
        <Controller
          control={control}
          name={controlName}
          rules={{
            required: errorMsg,
          }}
          render={({ field: { onChange, onBlur } }) => (
            <>
              {options &&
                options.map((item: IProjectTypeOption, index: number) => {
                  return (
                    <div
                      key={`${item?.value + index}`}
                      className={`${
                        selectedOption !== '' &&
                        item?.value.toLowerCase().includes(selectedOption.toLowerCase()) &&
                        styles.active
                      } ${styles.customCheck}`}
                      onClick={() => onChangeOption(onChange, item?.value)}
                    >
                      <Ripple>
                        <input
                          type="radio"
                          className="form-check-input"
                          id={item.value}
                          checked={item?.value.toLowerCase().includes(selectedOption.toLowerCase())}
                          onBlur={onBlur}
                          onChange={onChange}
                          name={'ProjectType'}
                        />
                        <label className="form-check-label" htmlFor={item.value}>
                          {item?.value}
                        </label>
                      </Ripple>
                    </div>
                  );
                })}
              <div className="invalid-feedback">{errors?.[controlName]?.message}</div>
            </>
          )}
        />
      </div>
    </div>
  );
};
export default MultipleOptionSingleInput;
