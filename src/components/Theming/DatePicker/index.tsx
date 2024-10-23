import { FloatingInput, Offcanvas } from '@components';
import { IDatePicker } from '@interfaces';
import { dateFns, getIconFromIconName, useDeviceType } from '@utils';
import classnames from 'classnames';
import { getMonth, getYear } from 'date-fns';
import React, { FC, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.scss';

const range = (start: number, end: number) => {
  return new Array(end - start).fill(undefined).map((d, i) => i + start);
};

const CustomDatePicker: FC<IDatePicker> = ({
  selectedDate = 'no-date',
  withFormat = true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {},
  className = '',
  dateFormat = 'dd-MMM-yyyy',
  showPopperArrow = false,
  startYear = new Date().getFullYear(),
  totalYearDropdownValues = 10,
  showMonthYear,
  showMonth,
  showYear,
  nonEditable = false,
  auto_id_data_text = '',
  auto_id_data_datePicker = '',
  offCanvasHeight = 85,
  ariaLabeledby = '',
  ...props
}) => {
  const [showSelectedDate, setShowSelectedDate] = useState(false);
  const [selectedDateState, setSelectedDate] = useState<any>(null);
  useEffect(() => {
    if (selectedDate === 'no-date') {
      setSelectedDate(new Date());
      setShowSelectedDate(true);
    } else {
      setSelectedDate(selectedDate);
      if (selectedDate !== null && selectedDate !== undefined && selectedDate !== '') {
        setShowSelectedDate(true);
      }
    }
  }, [selectedDate]);

  let select: any;
  if (typeof document !== 'undefined') {
    select = document.getElementById('parent_selectMonth');
  }
  useEffect(() => {
    if (select) {
      select?.addEventListener('change', (event: any) => {
        const tempSelect = document.createElement('select'),
          tempOption = document.createElement('option');

        tempOption.textContent = event.target.options[event.target.selectedIndex].text;
        tempSelect.style.cssText += `
                visibility: hidden;
                position: fixed;
                `;
        tempSelect.appendChild(tempOption);
        event.target.after(tempSelect);
        const tempSelectWidth = tempSelect.getBoundingClientRect().width;

        event.target.style.width = `${tempSelectWidth * 1.18}px`;
        tempSelect.remove();
      });

      select?.dispatchEvent(new Event('change'));
    }
  }, [select]);

  const cname = classnames(className, styles.datePicker);
  const [showOffcanvas, toggleOffCanvas] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const years = range(startYear, getYear(new Date()) + totalYearDropdownValues);
  const inputRef = useRef(null);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const { deviceType } = useDeviceType();
  const renderCustomHeader = (args: any) => {
    const {
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    } = args;

    return (
      <div className="cal-header">
        <button
          type="button"
          className="cal-btn"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          auto-id={auto_id_data_datePicker}
        >
          {getIconFromIconName('SlideArrowLeft')}
        </button>
        <div>
          {showMonthYear && showMonth && (
            <select
              className="cal-select react-datepicker__current-month"
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              id="parent_selectMonth"
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {showMonthYear && showYear && (
            <select
              className="cal-select react-datepicker__current-month"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {!showMonthYear && (
            <span className="react-datepicker__current-month">
              {months[getMonth(date)]} {getYear(date)}
            </span>
          )}
        </div>
        <button type="button" className="cal-btn" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {getIconFromIconName('SlideArrowRight')}
        </button>
      </div>
    );
  };
  const pickerRef = React.createRef<any>();

  useEffect(() => {
    const elementID = auto_id_data_datePicker ? auto_id_data_datePicker : 'datePicker';
    (document?.getElementById(elementID) as any).setAttribute('auto-id', auto_id_data_datePicker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCalendar = () => {
    return (
      <DatePicker
        ref={pickerRef}
        inline={deviceType !== 'desktop'}
        className={`${nonEditable ? 'non-editable' : ''} ${cname} ${classnames({
          onMobile: deviceType && deviceType !== 'desktop',
        })}`}
        renderCustomHeader={renderCustomHeader}
        ariaLabelledBy={ariaLabeledby}
        selected={
          selectedDateState ? new Date(selectedDateState?.toString().split('/').reverse().join('/')) : selectedDateState
        }
        onChange={(date) => {
          setSelectedDate(date);
          withFormat ? onChange(dateFns.formatDate(date, dateFormat).formatToString()) : onChange(date);
          deviceType !== 'desktop' &&
            (() => {
              setShowSelectedDate(true);
              setIsOpen(true);
              toggleOffCanvas(false);
            })();
        }}
        dateFormat={dateFormat}
        showPopperArrow={showPopperArrow}
        {...props}
        onKeyDown={(e) => {
          nonEditable && e.preventDefault();
        }}
        useWeekdaysShort={true}
        id={`${auto_id_data_datePicker ? auto_id_data_datePicker : 'datePicker'}`}
      />
    );
  };

  return (
    <>
      {deviceType !== 'desktop' ? (
        <>
          <div className="floating" auto-id={auto_id_data_text}>
            <FloatingInput
              className={`${isOpen ? 'mobile-datepicker date-container' : 'mobile-datepicker'} ${
                showSelectedDate ? 'date-container' : ''
              }`}
              //isClear
              label={props?.placeholder ?? 'Select Date'}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
              ref={inputRef}
              placeholder=" "
              type="button"
              controlProps={
                showSelectedDate && selectedDateState !== null && selectedDateState !== 'no-date'
                  ? {
                      value: dateFns
                        .formatDate(new Date(selectedDateState?.toString().split('/').reverse().join('/')), dateFormat)
                        .formatToString(),
                    }
                  : null
              }
              onClick={() => {
                toggleOffCanvas((prev) => {
                  return !prev;
                });
              }}
              auto-id={auto_id_data_text}
            />
            <Offcanvas
              className="reacDatepickerContainer"
              placement="bottom"
              showCanvas={showOffcanvas}
              onHide={() => {
                toggleOffCanvas(false);
              }}
              height={offCanvasHeight}
              closeButton={true}
              title={'Select Date'}
              footer=" "
            >
              {getCalendar()}
            </Offcanvas>
          </div>
        </>
      ) : (
        <>{getCalendar()}</>
      )}
      <div auto-id={auto_id_data_datePicker}>{getIconFromIconName('calender')}</div>
    </>
  );
};

export default CustomDatePicker;
