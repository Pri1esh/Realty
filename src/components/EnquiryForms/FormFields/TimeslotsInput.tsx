import { Ripple } from '@components';
import { ITimeslotsInput } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const TimeslotsInput = (props: ITimeslotsInput) => {
  const { heading, control, errorMsg, options, timeslotData, setTimeSlotData, errors, controlName } = props;
  return (
    <>
      <label className={` ${styles.timeslotLabel} mb-3 `}>{heading}</label>
      <div className={`${styles.btnGroup} ${styles.timeslot} ${styles.filter_btngroup}`}>
        <Controller
          control={control}
          name={controlName}
          rules={{
            required: errorMsg,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {options &&
                options?.map(
                  (
                    timeslots: {
                      isPassed: boolean;
                      item: {
                        value: string;
                        id?: string;
                      };
                    },
                    index: number,
                  ) => (
                    <div
                      className={`${timeslots?.item?.value === timeslotData && styles.active} ${styles.customCheck} ${
                        timeslots.isPassed ? styles.disabled : ''
                      }`}
                      key={`${timeslots?.item?.value + index}`}
                      onClick={() => {
                        timeslots?.item?.value === timeslotData ? onChange(!value) : onChange(true);
                        timeslots?.item?.value === timeslotData
                          ? setTimeSlotData && setTimeSlotData('')
                          : setTimeSlotData && setTimeSlotData(timeslots?.item?.value);
                      }}
                    >
                      <Ripple>
                        <input
                          type="radio"
                          className="form-check-input"
                          id={timeslots?.item?.id}
                          checked={value}
                          onBlur={onBlur}
                          onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor={timeslots?.item?.id}>
                          {timeslots?.item?.value}
                        </label>
                      </Ripple>
                    </div>
                  ),
                )}
              {<div className="invalid-feedback">{errors?.[controlName]?.message}</div>}
            </>
          )}
        />
      </div>
    </>
  );
};

export default TimeslotsInput;
