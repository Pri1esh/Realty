import { DatePicker, FloatingLabelContainer } from '@components';
import { IDateInput } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from '../EnquiryForms.module.scss';

const DateInput = (props: IDateInput) => {
  const {
    control,
    errorMsg,
    deviceType,
    errors,
    controlName,
    setValue,
    label,
    setTimeSlotData,
    setSelectedDate,
    selectedMinDate,
    maxDate,
    updateControlName,
  } = props;

  return (
    <Controller
      control={control}
      name={controlName}
      rules={{
        required: errorMsg,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <FloatingLabelContainer
            hasValue
            placeholder={deviceType === 'desktop' ? label : ' '}
            className={`${errors?.PlanVisitDate ? 'is-invalid' : ''}`}
          >
            <DatePicker
              className={`form-control ${errors?.PlanVisitDate ? 'is-invalid' : ''}`}
              onChangeRaw={(e: any) => e.preventDefault()}
              onChange={(e: any) => {
                if (!e.toLowerCase().includes('invalid')) {
                  setSelectedDate(e);
                  onChange(e);
                  setValue(updateControlName, null);
                  setTimeSlotData && setTimeSlotData('');
                } else {
                  setSelectedDate('');
                  onChange('');
                }
              }}
              showMonth
              showMonthYear
              showYear
              onBlur={onBlur}
              dateFormat="dd-MMM-yyyy"
              totalYearDropdownValues={2}
              selectedDate={selectedMinDate ? selectedMinDate : value}
              minDate={selectedMinDate ? selectedMinDate : new Date()}
              maxDate={maxDate}
              startDate={null}
              placeholder={deviceType === 'desktop' ? ' ' : label}
            />
          </FloatingLabelContainer>
          {<div className={styles.invalidErrorText}>{errors?.[controlName]?.message}</div>}
        </>
      )}
    />
  );
};

export default DateInput;
