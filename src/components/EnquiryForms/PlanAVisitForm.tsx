import { Button } from '@components';
import { IPlanAVisitForm, IProjectTypeOption } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styles from './EnquiryForms.module.scss';
import { CheckBoxWithLabelInput, DateInput, MobileNumberInput, TextInput, TimeslotsInput } from './FormFields';

const PlanAVisitForm = (props: IPlanAVisitForm) => {
  const date = new Date();
  const tomorrowDate = new Date(date.setDate(date.getDate() + 1));
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const maxDate = new Date(year, month + 6, day);

  const {
    onSubmit,
    control,
    handleSubmit,
    getValues,
    errors,
    enquireFormData,
    timeslotData,
    setTimeSlotData,
    countryFlags,
    setValue,
    getCurrentDate,
    deviceType,
  } = props;

  const {
    contactAdaniRealty: ContactAdaniRealtyMsg,
    email: EmailMsg,
    name: NameMsg,
    timeslot: TimeslotMsg,
    planAVsiit: PlanAVisitMsg,
  } = enquireFormData.errorData;

  const [availableTimeInterval, setAvailableTimeInterval] =
    useState<{ isPassed: boolean; item: { value: string; id?: string } }[]>();
  const [selectedMinDate, setSelectedMinDate] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate().replace('th', ''));

  useEffect(() => {
    !errors?.PlanVisitDate &&
      setValue('PlanVisitDate', getValues('PlanVisitDate') || getCurrentDate().replace('th', ''));
    setSelectedDate(getValues('PlanVisitDate'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const date1 = getCurrentDate().replace('th', '');
    if (getValues('PlanVisitDate') === date1) {
      const date = new Date();
      const timeInterval: { isPassed: boolean; item: { value: string } }[] = [];
      const hours = date.toLocaleString('en-US', { hour: 'numeric', hour12: false });
      enquireFormData?.timeSlotsOptions?.map((items: { value: string }) => {
        let timeslotHours = 0;
        switch (true) {
          case items.value.split('-')[1].replace(' ', '').includes('PM') &&
            items.value.split('-')[1].replace(' ', '') === '12 PM':
            timeslotHours = parseInt(items.value.split('-')[1].replace(' PM', ''));
            break;
          case items.value.split('-')[1].replace(' ', '').includes('PM'):
            timeslotHours = parseInt(items.value.split('-')[1].replace(' PM', '')) + 12;
            break;
          default:
            timeslotHours = parseInt(items.value.split('-')[1].replace(' AM', ''));
            break;
        }

        if (parseInt(hours) < timeslotHours || parseInt(hours) === 24) {
          const timeObj = { isPassed: false, item: items };
          timeInterval.push(timeObj);
        } else {
          const timeObj = { isPassed: true, item: items };
          timeInterval.push(timeObj);
        }
      });
      if (timeInterval.find((items: { isPassed: boolean }) => items.isPassed === false) === undefined) {
        setSelectedMinDate(tomorrowDate);
        const newDate =
          tomorrowDate.toString().slice(8, 10) +
          '-' +
          tomorrowDate.toString().slice(4, 7) +
          '-' +
          tomorrowDate.toString().slice(11, 15);
        setValue('PlanVisitDate', newDate);
        setSelectedDate(
          String(tomorrowDate).slice(8, 10) +
            '-' +
            String(tomorrowDate).slice(4, 7) +
            '-' +
            String(tomorrowDate).slice(11, 15),
        );
      }
      setAvailableTimeInterval(timeInterval);
    } else {
      const timeInterval: { isPassed: boolean; item: IProjectTypeOption }[] = [];
      enquireFormData?.timeSlotsOptions?.map((items: IProjectTypeOption) => {
        const timeObj = { isPassed: false, item: items };
        timeInterval.push(timeObj);
      });
      setAvailableTimeInterval(timeInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div className={styles.enquirenow}>
      <p className={styles.subheading}>{enquireFormData?.shareContact}</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className={styles.formsData}>
          <Col sm={12} md={12} lg={6}>
            <div className={styles.forminner}>
              <TextInput
                control={control}
                errorMsg={NameMsg}
                validatorRegex={nameValidatorRegex}
                label={enquireFormData.name}
                getValues={getValues}
                errors={errors}
                controlName={'Name'}
              />
              <div className="mb-4">
                <div className={`${styles.inputGroup} ${styles.marginNone}`}>
                  <MobileNumberInput
                    getValues={getValues}
                    errors={errors}
                    enquireFormData={enquireFormData}
                    countryFlags={countryFlags}
                    control={control}
                  />
                </div>
              </div>
              <TextInput
                control={control}
                errorMsg={EmailMsg}
                validatorRegex={emailValidatorRegex}
                label={enquireFormData.email}
                getValues={getValues}
                errors={errors}
                controlName={'Email'}
              />
            </div>
          </Col>
          <Col className={styles.borderleft} sm={12} md={12} lg={6}>
            <div className={styles.forminner}>
              <div className="mb-4">
                <DateInput
                  control={control}
                  errorMsg={PlanAVisitMsg}
                  deviceType={deviceType}
                  errors={errors}
                  controlName={'PlanVisitDate'}
                  setValue={setValue}
                  label={enquireFormData?.date}
                  setTimeSlotData={setTimeSlotData}
                  setSelectedDate={setSelectedDate}
                  selectedMinDate={selectedMinDate}
                  maxDate={maxDate}
                  updateControlName={'timeslot'}
                />
              </div>
              <div className={styles.selectType}>
                <TimeslotsInput
                  heading={enquireFormData?.timeSlots}
                  control={control}
                  errorMsg={TimeslotMsg}
                  options={availableTimeInterval}
                  timeslotData={timeslotData}
                  setTimeSlotData={setTimeSlotData}
                  errors={errors}
                  controlName={'timeslot'}
                />
              </div>
            </div>
          </Col>
        </Row>
        <CheckBoxWithLabelInput
          control={control}
          controlName={'loanCheckBox'}
          id={'loanCheckBox'}
          label={enquireFormData?.homeLoanInterested}
        />
        <CheckBoxWithLabelInput
          control={control}
          controlName={'ContactAdaniRealty'}
          id={'ContactAdaniRealty'}
          label={enquireFormData?.agreeToConnect}
          errors={errors}
          errorMsg={ContactAdaniRealtyMsg}
        />
        <div className="text-center mt-5">
          <Button type="submit" className={styles.submit} size="lg" variant="primary">
            {enquireFormData?.submitDetail}
          </Button>
        </div>
        <div
          className={`${styles.agreeTxt} text-center mt-4`}
          dangerouslySetInnerHTML={{ __html: enquireFormData?.overrideRegistry }}
        ></div>
      </Form>
    </div>
  );
};

export default PlanAVisitForm;
