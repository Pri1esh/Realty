import { Button } from '@components';
import { IPropertyEnquiryForm } from '@interfaces';
import { getIconFromIconName, updateSessionStorage, useDeviceType } from '@utils';
import { useEffect } from 'react';
import BrochureForm from './BrochureForm';
import ContactUsForm from './ContactUsForm';
import DoubleColumnEnquiryForm from './DoubleColumnForm';
import styles from './EnquiryForms.module.scss';
import PlanAVisitForm from './PlanAVisitForm';
import SingleColumnForm from './SingleColumnForm';

const EnquiryForms = (props: IPropertyEnquiryForm) => {
  const {
    planvisit = false,
    doubleColumn = true,
    singleColumn = false,
    showHeading = false,
    brochureForm = false,
    onSubmit,
    control,
    handleSubmit,
    getValues,
    errors,
    enquireFormData,
    locationData,
    selectedPropertyType,
    setselectedPropertyType,
    timeslotData,
    setTimeSlotData,
    countryFlags,
    setProjectNameValue,
    projectNameValue,
    setValue,
    getCurrentDate,
    heading = '',
    isPopup = false,
    selectedTownship = '',
    isContactUs = false,
    autoPopup = false,
    showCompletedProjectPopup = false,
    handleCancelOnCompletedProject,
    continueWithForm,
  } = props;

  const { deviceType } = useDeviceType();

  const addCaptcha = () => {
    if (!document.getElementById('recaptcha')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_APP_SITE_KEY}`;
      script.id = 'recaptcha';
      document.body.appendChild(script);
      document.querySelector('.grecaptcha-badge')?.classList?.remove('d-none');
    }
  };

  const removeCaptcha = () => {
    if (sessionStorage?.getItem('enquiryInPage') !== 'true') {
      document.getElementById('recaptcha')?.remove();
      document.querySelector('.grecaptcha-badge')?.classList?.add('d-none');
    }
  };

  useEffect(() => {
    !isPopup && updateSessionStorage('enquiryInPage', 'true');
    __RECAPTCHA__ && addCaptcha();

    return () => {
      removeCaptcha();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnRequiredForm = () => {
    switch (true) {
      case brochureForm:
        return (
          <BrochureForm
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquireFormData={enquireFormData}
            locationData={locationData}
            selectedPropertyType={selectedPropertyType}
            setselectedPropertyType={setselectedPropertyType}
            countryFlags={countryFlags}
            setProjectNameValue={setProjectNameValue}
            projectNameValue={projectNameValue}
            setValue={setValue}
            selectedTownship={selectedTownship}
          />
        );
      case planvisit:
        return (
          <PlanAVisitForm
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquireFormData={enquireFormData}
            timeslotData={timeslotData}
            setTimeSlotData={setTimeSlotData}
            countryFlags={countryFlags}
            setValue={setValue}
            getCurrentDate={getCurrentDate}
            deviceType={deviceType}
          />
        );
      case isContactUs:
        return (
          <ContactUsForm
            showHeading={showHeading}
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquireFormData={enquireFormData}
            countryFlags={countryFlags}
            heading={heading}
            isPopup={isPopup}
            locationData={locationData}
            setValue={setValue}
            projectNameValue={projectNameValue}
            setProjectNameValue={setProjectNameValue}
          />
        );
      case doubleColumn:
        return (
          <DoubleColumnEnquiryForm
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquireFormData={enquireFormData}
            locationData={locationData}
            selectedPropertyType={selectedPropertyType}
            setselectedPropertyType={setselectedPropertyType}
            projectNameValue={projectNameValue}
            setProjectNameValue={setProjectNameValue}
            setValue={setValue}
            countryFlags={countryFlags}
            autoPopup={autoPopup}
          />
        );
      case singleColumn:
        return (
          <SingleColumnForm
            showHeading={showHeading}
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquireFormData={enquireFormData}
            locationData={locationData}
            selectedPropertyType={selectedPropertyType}
            setselectedPropertyType={setselectedPropertyType}
            countryFlags={countryFlags}
            setProjectNameValue={setProjectNameValue}
            projectNameValue={projectNameValue}
            setValue={setValue}
            heading={heading}
            isPopup={isPopup}
          />
        );
      default:
        return <></>;
    }
  };

  const projectCompletedPopup = () => {
    return (
      <div className={styles.completedPopup}>
        <h4 className={styles.heading}>
          <span>{getIconFromIconName('error')}</span>
          {enquireFormData?.enquireNow}
        </h4>
        <div className={styles.mpdalBody}>
          <p>{enquireFormData?.description}</p>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outline-secondary"
            className={styles.cancelButton}
            onClick={() => {
              handleCancelOnCompletedProject && handleCancelOnCompletedProject();
            }}
          >
            {enquireFormData?.cancelLabel}
          </Button>
          <Button
            onClick={() => {
              continueWithForm && continueWithForm();
            }}
          >
            {enquireFormData?.continueLabel}
          </Button>
        </div>
      </div>
    );
  };

  return showCompletedProjectPopup ? projectCompletedPopup() : returnRequiredForm();
};

export default EnquiryForms;
