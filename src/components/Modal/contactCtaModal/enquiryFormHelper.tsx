import { ENDPOINT, getAllAPI, getAPI, postAPI } from '@api-manager';
import { Loader, ModalPopup, ModalThankYou, OffcanvasHeading, OtpInput, PropertyEnquiryForm } from '@components';
import { AutoPopupForm } from '@enum';
import { ICountryFlags, ICountryFlagsApiData, IEnquiryFormHelper, IMobileNumber, IOtpData } from '@interfaces';
import {
  deleteSessionStorage,
  filterData,
  isTouchScreendevice,
  timeout,
  updateSessionStorage,
  useDeviceType,
} from '@utils';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useGTM from 'src/utils/useGTM';
import styles from './enquiryFormHelper.module.scss';

const ErrorMessage = (props: any) => {
  const { enquireFormData } = props;

  return (
    <>
      <h3>{enquireFormData?.errorMessageTitle}</h3>
      <p>{enquireFormData?.errorMessageDesription}</p>
    </>
  );
};

const EnquiryFormHelper = (props: IEnquiryFormHelper) => {
  const {
    enquiryfield = true,
    planvisit = false,
    homeloancheck = true,
    typeDropdown = true,
    configuration = true,
    projectType = true,
    purpose = false,
    completeName = true,
    firstlastname = false,
    doubleColumn = true,
    singleColumn = false,
    agreeToConnect = true,
    isPopup = false,
    isContactUs = false,
    brochureForm = false,
    setShow,
    propertyType = '',
    propertyLocation,
    projectNameData = '',
    showForm = false,
    selectedTownship = '',
    autoPopup = false,
    downloadBrochure = () => {
      return '';
    },
    isProjectCompleted = false,
  } = props;

  const { sendEvent } = useGTM();
  const [data, setData] = useState<any>();
  const [showError, setshowError] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [thankyouData, setThankyouData] = useState({});
  const locationData = data?.LocationEnquiryForm.fields;
  const enquireFormData = data?.enquireForm.fields;
  const [selectedPropertyType, setselectedPropertyType] = useState<string>(propertyType);
  const [mobileNumber, setmobileNumber] = useState<IMobileNumber | null>({ phoneNumber: '', countryCode: '+91' });
  const [timeslotData, setTimeSlotData] = useState<string>('');
  const [countryFlags, setCountryFlags] = useState<ICountryFlags[]>([]);
  const [name, setName] = useState<string>('');
  const [loading, setloading] = useState<boolean>(true);
  const [otpErr, setOtpErr] = useState<string>('');
  const [postPayload, setPostPayload] = useState<any>();
  const [projectNameValue, setProjectNameValue] = useState<string | undefined>(projectNameData);
  const [pageUrl, setPageUrl] = useState<string>('');
  const [enquireFormHeading, setEnquireFormHeading] = useState<string>('');
  const [scrollTo, setScrollTo] = useState(0);
  const [email, setEmail] = useState<string>('');
  const [disableOTP, setDisableOTP] = useState<boolean>(false);
  const [showCompletedProjectPopup, setShowCompletedProjectPopup] = useState<boolean>(isProjectCompleted);
  const [timer, setTimer] = useState<number>(30);

  const unsupportedCountryCodes = new Set(['BV', 'TF', 'HM', 'PN', 'GS', 'UM', 'AQ']);
  const getFormHeading = (data: any) => {
    switch (true) {
      case autoPopup:
        setEnquireFormHeading(data?.popupTitle || 'Looking for something else?');
        return data?.popupTitle || 'Looking for something else?';
      case brochureForm:
        setEnquireFormHeading(data?.brochureHeading);
        return data?.brochureHeading;
      case isContactUs:
        setEnquireFormHeading(data?.sendusQuery);
        return data?.sendusQuery;
      case planvisit:
        setEnquireFormHeading(data?.planAVsiit);
        return data?.planAVsiit;
      default:
        setEnquireFormHeading(data?.enquireNow);
        return data?.enquireNow;
    }
  };

  const getPagePath = () => {
    if (typeof window !== 'undefined') {
      const path: string | any =
        window.location.pathname.includes('/') &&
        window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
      setPageUrl(path || 'home');
      return path || 'home';
    }
    return 'home';
  };

  useEffect(() => {
    getPagePath();
  }, []);

  useEffect(() => {
    if (isPopup && typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(AutoPopupForm.FormOpen, 'true');
    }
    setScrollTo(window.scrollY);
    setselectedPropertyType(propertyType);
    setShowEnquiryForm(showForm);
    const fetchFormData = async () => {
      setloading(true);
      await getAllAPI([ENDPOINT.enquireFormLayout])
        .then((res) => {
          const ApiData = filterData(res);
          setData(ApiData);
          const heading = getFormHeading(ApiData?.enquireForm?.fields);
          autoPopup &&
            formEventHandler(
              'form_pop_up_load',
              {
                event: 'form_pop_up_load',
                category: 'realty',
                sub_category: heading,
                page_type: getPagePath(),
              },
              'form_load',
            );
        })
        .catch(() => {
          setshowError(true);
        });
      await getAPI(ENDPOINT.countryFlagsApi)
        .then((res) => {
          const countryList: ICountryFlags[] = [];
          res?.sitecore?.route?.placeholders?.main[0]?.fields?.country?.map((item: ICountryFlagsApiData) => {
            if (unsupportedCountryCodes?.has(item?.isO2)) {
              return;
            }
            countryList.push({
              name: item?.countryName,
              flag: item?.countryFlagImage,
              code: item?.isO2,
              dialCode: '+' + item?.dialCode,
              contactNoLength: item?.contactNoLength,
            });
            setCountryFlags([...countryList]);
          });
        })
        .catch(() => {
          setshowError(true);
        });

      setloading(false);
    };
    fetchFormData();

    return () => {
      deleteSessionStorage(AutoPopupForm.FormOpen);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { deviceType } = useDeviceType();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    setError,
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { Property: projectNameValue },
  });

  useEffect(() => {
    if ((typeof window !== 'undefined' && window.innerWidth > 1366) || !isTouchScreendevice()) return;
    if (loading) {
      document.querySelector('body')?.classList.remove('posFixed');
    } else if (!loading && ((isPopup && showEnquiryForm) || showOtp || showThankyou)) {
      document.querySelector('body')?.classList.add('posFixed');
    }
    if (!loading) {
      window.scrollTo(0, -1);
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      window.scrollTo(0, scrollTo);
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if ((typeof window !== 'undefined' && window.innerWidth > 1366) || !isTouchScreendevice()) return;
    if ((isPopup && showEnquiryForm) || showOtp || showThankyou) {
      document.querySelector('body')?.classList.add('posFixed');
      ((isPopup && !showEnquiryForm) || showOtp) &&
        document.querySelector('.modal,.offcanvas')?.classList.add('otpModal');
    } else if ((isPopup && !showEnquiryForm && !showOtp && !showThankyou) || (!showOtp && !showThankyou)) {
      document.querySelector('body')?.classList.remove('posFixed');
      (!showEnquiryForm || showOtp) && document.querySelector('.modal,.offcanvas')?.classList.remove('otpModal');
    }

    if ((isPopup && showEnquiryForm) || showOtp || showThankyou) {
      window.scrollTo(0, -1);
      document.documentElement.style.scrollBehavior = 'auto';
    } else if ((isPopup && !showEnquiryForm && !showOtp && !showThankyou) || (!showOtp && !showThankyou)) {
      window.scrollTo(0, scrollTo);
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEnquiryForm, showOtp, showThankyou]);

  const onHideEnquiryForm = () => {
    setShowEnquiryForm(false);
    timeout(() => setShow && setShow(false), 500);
    autoPopup && updateSessionStorage(AutoPopupForm.AutoPopupFormClosed, 'true');
  };

  const onHideOTP = () => {
    setShowOtp(!showOtp);
    setShowEnquiryForm(true);
    setDisableOTP(false);
  };

  const onHideThankYou = () => {
    setShowThankyou(!showThankyou);
    timeout(() => setShow && setShow(false), 500);
    setselectedPropertyType && setselectedPropertyType('');
    resetForm();
    updateSessionStorage(AutoPopupForm.FormSubmitted, 'true');
  };

  const onHideError = () => {
    setshowError(false);
    onHideEnquiryForm();
  };

  const resetForm = () => {
    const dataKeys = Object.keys(getValues());
    dataKeys.forEach((item) => (getValues(item) === true ? setValue(item, false) : setValue(item, null)));
    setselectedPropertyType && setselectedPropertyType('');
    setmobileNumber({ phoneNumber: '', countryCode: '+91' });
  };

  const handleThankYouClick = () => {
    resetForm && resetForm();
    setShowThankyou(!showThankyou);
    timeout(() => setShow && setShow(false), 500);
    setselectedPropertyType('');
    setmobileNumber(null);
    updateSessionStorage(AutoPopupForm.FormSubmitted, 'true');
  };

  const continueWithForm = () => {
    setShowCompletedProjectPopup(false);
  };

  const formEventHandler = (eventType: string, postData = postPayload, error = '') => {
    let eventVal = {};

    switch (true) {
      case brochureForm:
        eventVal = {
          event: eventType,
          category: 'realty',
          sub_category: enquireFormHeading || 'Download Brochure',
          project_type: postData?.type ? postData?.type : '',
          label: postData?.label ? postData?.label : '',
          page_type: pageUrl,
          click_text: 'Submit',
        };
        break;
      case autoPopup && error === 'form_load':
        eventVal = { ...postData };
        break;
      default:
        eventVal = {
          event: eventType,
          category: 'realty',
          sub_category: enquireFormHeading || 'Enquire Now',
          page_type: pageUrl,
          click_text: 'Submit',
          project_type: postData?.Type ? postData?.Type : '',
          property_type: postData?.ProjectType ? postData?.ProjectType : '',
          label: postData?.Configuration ? postData?.Configuration?.replaceAll(', ', '/') : '',
          purpose_type: postData?.Purpose ? postData?.Purpose : '',
          visit_time_slot: postData?.TimeSlot ? postData?.TimeSlot : '',
          visit_date: postData?.PlanVisitDate ? postData?.PlanVisitDate : '',
        };
        break;
    }

    if (error && error !== 'form_load') {
      eventVal = {
        ...eventVal,
        error: error,
      };
    }
    sendEvent(eventVal);
  };

  const getCurrentDate = () => {
    let date = new Date().toString();
    // Wed Jun 15 2022 12:12:18 GMT+0530 (India Standard Time)
    date = date.slice(8, 10) + 'th-' + date.slice(4, 7) + '-' + date.slice(11, 15);
    return date;
  };

  const getProjectType = (selectedLocation: any, clickedProperty: any) => {
    if (selectedLocation?.data?.projectName) {
      return selectedLocation?.data?.projectName;
    } else if (clickedProperty) {
      return clickedProperty?.projectName;
    } else {
      return '';
    }
  };

  const executeRecaptcha = async () => {
    const token = await new Promise((resolve) => {
      grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_APP_SITE_KEY || '', { action: 'submit' });
        resolve(token);
      });
    });

    return token;
  };

  const onSubmit = async (data: any) => {
    let selectedLocation: any;
    const pageName = window.location.pathname.replace('/realty/', '');
    if (data?.Property) {
      selectedLocation = locationData?.find((item: any) => {
        return (data?.Property.includes('-') ? item.data.propertyID : item.data.projectName) === data?.Property;
      });
    }
    let clickedProperty = null;
    if (propertyLocation) {
      const property = locationData?.find(
        (item: any) => item.data.projectName.toLowerCase() === propertyLocation.toLowerCase(),
      );
      clickedProperty = property?.data;
    }
    const propertyConfiguration: any[] = [];
    Object.keys(data).forEach((key: string) => {
      key.toLowerCase().includes('size') && getValues(key) && propertyConfiguration.push(getValues(key));
    });
    propertyConfiguration.sort((a, b) => {
      return parseInt(a.toLowerCase().replace('bhk', '')) - parseInt(b.toLowerCase().replace('bhk', ''));
    });

    let location = '';
    if (selectedLocation?.data?.propertyLocation) {
      location = selectedLocation?.data?.propertyLocation;
    } else if (clickedProperty) {
      location = clickedProperty?.propertyLocation;
    }
    let type = '';
    if (data?.PropertyType) {
      type = data?.PropertyType;
    } else if (clickedProperty) {
      type = clickedProperty?.propertyTypeFilter;
    }

    const postData = {
      Name:
        (data?.Name ? data?.Name : '') || (data?.FirstName && data?.LastName && `${data?.FirstName} ${data?.LastName}`),
      MobileNumber: data?.phoneNo ? `${data?.phoneNo?.countryCode}${data?.phoneNo?.phoneNumber}` : '',
      Email: data?.Email ? data?.Email : '',
      ProjectType: getProjectType(selectedLocation, clickedProperty),
      Configuration: propertyConfiguration?.length > 0 && propertyConfiguration?.join(', '),
      agreement: data?.ContactAdaniRealty,
      loanCheck: data?.loanCheckBox,
      Type: type,
      Location: location,
      Purpose: data?.Purpose?.value && `${data?.Purpose?.value}`,
      TimeSlot: data?.timeslot && timeslotData,
      PlanVisitDate: data?.PlanVisitDate ? data?.PlanVisitDate : getCurrentDate()?.replace('th', ''),
      PageInfo: pageName,
      FormType: enquireFormHeading || 'Enquire Now',
      Country: countryFlags.find((item: any) => item?.dialCode === data?.phoneNo?.countryCode)?.name,
      IsHomeLoanRequired: data?.loanCheckBox,
      IsPrequalificationLeads: isContactUs ? true : false,
      Comments: data?.Comments || '',
    };
    setPostPayload(postData);
    let otpData: IOtpData = {
      MobileNumber: data?.phoneNo && `${data?.phoneNo?.countryCode}${data?.phoneNo?.phoneNumber}`,
      Name:
        (data?.Name ? data?.Name : '') || (data?.FirstName && data?.LastName && `${data?.FirstName} ${data?.LastName}`),
      Email: data?.Email ? data?.Email : '',
    };

    if (__RECAPTCHA__) {
      const captchaResponse = await executeRecaptcha();
      otpData = {
        ...otpData,
        reResponse: captchaResponse,
      };
    }
    setloading(true);
    try {
      if (data?.phoneNo && data?.phoneNo?.countryCode === '+91') {
        const res = await postAPI(ENDPOINT.otpPostApi, otpData);
        res && setshowError(false);
        if (res?.status == '503') {
          setOtpErr(res?.message);
          setDisableOTP(true);
        } else {
          setOtpErr('');
          setTimer(30);
        }
        switch (true) {
          case res?.errorStatus?.toLowerCase()?.includes('name'):
            setError('Name', { type: 'string', message: res?.errormessage }, { shouldFocus: true });
            break;
          case res?.errorStatus?.toLowerCase()?.includes('email'):
            setError('Email', { type: 'string', message: res?.errormessage }, { shouldFocus: true });
            break;
          case res?.errorStatus?.toLowerCase()?.includes('mobile'):
            setError('phoneNo', { type: 'string', message: res?.errormessage }, { shouldFocus: true });
            break;
          default:
            break;
        }

        if (res?.errorStatus !== '') {
          setloading(false);
          return;
        }
      }

      switch (true) {
        case brochureForm:
          setThankyouData({
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.email}`]: postData?.Email,
            ['Project']: postData?.Location && postData?.ProjectType + ' ' + postData?.Location,
          });
          break;
        case !!postData?.Purpose:
          setThankyouData({
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.email}`]: postData?.Email,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.projectType}`]: postData?.Type,
            [`${enquireFormData?.configuration}`]: postData?.Configuration,
            ['Purpose']: postData?.Purpose,
          });
          break;
        case !!(postData?.TimeSlot && clickedProperty):
          setThankyouData({
            [`Property`]: clickedProperty?.projectName,
            [`Visiting Date & Time`]: postData?.PlanVisitDate + ' | ' + postData?.TimeSlot,
            [`Project Address`]: clickedProperty?.propertyLocation,
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.email}`]: postData?.Email,
          });
          break;
        case !!postData?.TimeSlot:
          setThankyouData({
            [`Visiting Date & Time`]: postData?.PlanVisitDate + ' | ' + postData?.TimeSlot,
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.email}`]: postData?.Email,
          });
          break;
        case !!postData?.Location:
          setThankyouData({
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.email}`]: postData?.Email,
            ['Location']: postData?.Location && postData?.ProjectType + '; ' + postData?.Location,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.projectType}`]: postData?.Type,
            [`${enquireFormData?.configuration}`]: postData?.Configuration,
          });
          break;
        default:
          setThankyouData({
            [`${enquireFormData?.name}`]: postData?.Name,
            [`${enquireFormData?.mobileLabel}`]: `${data?.phoneNo?.countryCode} ${data?.phoneNo?.phoneNumber}`,
            [`${enquireFormData?.email}`]: postData?.Email,
            [`${enquireFormData?.projectType}`]: postData?.Type,
          });
          break;
      }
      setmobileNumber({ countryCode: data?.phoneNo?.countryCode, phoneNumber: data?.phoneNo?.phoneNumber });
      setName(postData?.Name);
      setEmail(postData?.Email);
      if (data?.phoneNo && data?.phoneNo?.countryCode !== '+91') {
        setloading(false);
        onOTPSubmit('00000', postData);
      } else {
        setShowOtp(true);
        setloading(false);
      }
      setShowEnquiryForm(false);
      brochureForm &&
        formEventHandler('download_brochure_enquiry_start', {
          type: postData?.ProjectType,
          subCategory: 'brochure_enquiry',
          label: 'download_brochure',
        });
    } catch (error: any) {
      setshowError(true);
      setShowOtp(false);
      setloading(false);
      brochureForm &&
        formEventHandler(
          'download_brochure_enquiry_error',
          { type: postData?.ProjectType, subCategory: 'brochure_enquiry', label: 'download_brochure' },
          error?.message,
        );
    }
    !brochureForm && formEventHandler('form_submit_start', postData);
  };

  const onOTPSubmit = async (inputOtp: string, postData = postPayload) => {
    setloading(true);
    formEventHandler('form_otp_submit');
    try {
      const postOtpData = {
        ...postPayload,
        ...postData,
        ['OTP']: inputOtp,
      };
      const res = await postAPI(ENDPOINT.enquirePostApi, postOtpData);
      res && setshowError(false);
      if (res?.OTPStatus) {
        setShowOtp(false);
        setShowThankyou(!showThankyou);
        setOtpErr('');

        brochureForm
          ? formEventHandler('download_brochure_enquiry_otp_success', {
              subCategory: 'brochure_enquiry',
              type: postData?.ProjectType,
              label: 'download_brochure_enquiry_start',
            })
          : formEventHandler('form_otp_success');
        brochureForm && downloadBrochure();
        brochureForm
          ? formEventHandler('download_brochure_enquiry_success', {
              subCategory: 'brochure_enquiry_success_download',
              type: postData?.ProjectType,
              label: 'download_brochure_enquiry_otp_success',
            })
          : formEventHandler('form_submit');
      } else {
        if (inputOtp === '00000') {
          setshowError(true);
        } else {
          setOtpErr(res?.Message);
          res?.userblocked && setDisableOTP(true);
        }

        brochureForm
          ? formEventHandler(
              'download_brochure_enquiry_otp_error',
              {
                subCategory: 'brochure_enquiry',
                type: postPayload?.ProjectType,
                label: 'download_brochure_enquiry_start',
              },
              res?.Message,
            )
          : formEventHandler('form_otp_failure', postPayload, res?.Message);

        formEventHandler('form_submit_fail', postData, res?.Message);
      }
      setloading(false);
    } catch (error: any) {
      formEventHandler('form_submit_fail', postData, error?.Message || 'Network Error');
      setshowError(true);
      setloading(false);
    }
  };

  const resendOtp = async () => {
    setloading(true);

    brochureForm
      ? formEventHandler('download_brochure_enquiry_otp_resend', {
          subCategory: 'brochure_enquiry',
          type: postPayload?.ProjectType,
          label: 'download_brochure_enquiry_start',
        })
      : formEventHandler('form_otp_resend');
    try {
      let otpData: IOtpData = {
        MobileNumber: `${mobileNumber?.countryCode}${mobileNumber?.phoneNumber}`,
        Name: name,
        Email: email,
      };
      if (__RECAPTCHA__) {
        const captchaResponse = await executeRecaptcha();
        otpData = {
          ...otpData,
          reResponse: captchaResponse,
        };
      }
      const res = await postAPI(ENDPOINT.otpPostApi, otpData);
      res && setshowError(false);
      if (res?.status == '503') {
        setOtpErr(res?.message);
        setDisableOTP(true);
      } else {
        setOtpErr('');
        setTimer(30);
      }
      setloading(false);
    } catch (error) {
      setshowError(true);
      setloading(false);
    }
  };

  if (loading) {
    return isPopup ? (
      <ModalPopup
        className="enquireModal"
        show={loading}
        modalSize="md"
        modalTitle={''}
        modalBody={<Loader bg={'#000000'} />}
        closeButton={false}
      />
    ) : (
      <div className="pageLoader">
        <Loader bg={'#000000'} />
      </div>
    );
  }

  if (showError) {
    return (
      <>
        <ModalPopup
          className="enquireModal"
          show={showError}
          modalSize="md"
          modalTitle={''}
          onHide={onHideError}
          modalBody={<ErrorMessage enquireFormData={enquireFormData} />}
        />
      </>
    );
  }

  const showRequiredForm = () => {
    switch (true) {
      case showOtp && deviceType === 'desktop':
        return (
          <ModalPopup
            className="otpModal"
            modalTitle={enquireFormData.enterOTPLabel}
            modalSize="md"
            show={showOtp}
            onHide={onHideOTP}
            backdrop="static"
            modalBody={
              <OtpInput
                enquireFormData={enquireFormData}
                submit={onOTPSubmit}
                onHide={onHideOTP}
                mobileNumber={mobileNumber}
                resend={resendOtp}
                otpErr={otpErr}
                disableForm={disableOTP}
                timer={timer}
                setTimer={setTimer}
              />
            }
          />
        );
      case showOtp:
        return (
          <Offcanvas
            className={styles.otpOffcanvas}
            placement="bottom"
            show={showOtp}
            onHide={onHideOTP}
            backdrop="static"
          >
            <Offcanvas.Header closeButton>
              <OffcanvasHeading>{enquireFormData.enterOTPLabel}</OffcanvasHeading>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <OtpInput
                enquireFormData={enquireFormData}
                submit={onOTPSubmit}
                onHide={onHideOTP}
                mobileNumber={mobileNumber}
                resend={resendOtp}
                otpErr={otpErr}
                disableForm={disableOTP}
                timer={timer}
                setTimer={setTimer}
              />
            </Offcanvas.Body>
          </Offcanvas>
        );
      case showThankyou && deviceType === 'desktop':
        return (
          <ModalPopup
            className=""
            modalTitle=""
            modalSize="lg"
            show={showThankyou}
            onHide={onHideThankYou}
            modalBody={
              <ModalThankYou
                brochureForm={brochureForm}
                enquireFormData={enquireFormData}
                thankyouData={thankyouData}
                handleThankYouClick={handleThankYouClick}
              />
            }
          />
        );
      case showThankyou:
        return (
          <Offcanvas placement="bottom" show={showThankyou} onHide={onHideThankYou}>
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <ModalThankYou
                brochureForm={brochureForm}
                enquireFormData={enquireFormData}
                thankyouData={thankyouData}
                handleThankYouClick={handleThankYouClick}
              />
            </Offcanvas.Body>
          </Offcanvas>
        );
      case isPopup && deviceType === 'desktop':
        return (
          <ModalPopup
            className="enquireModal"
            modalSize={showCompletedProjectPopup ? 'md' : 'lg'}
            show={showEnquiryForm}
            onHide={onHideEnquiryForm}
            modalTitle={showCompletedProjectPopup ? '' : enquireFormHeading}
            modalBody={
              <PropertyEnquiryForm
                isPopup={isPopup}
                onSubmit={onSubmit}
                control={control}
                handleSubmit={handleSubmit}
                getValues={getValues}
                errors={errors}
                enquiryfield={enquiryfield}
                planvisit={planvisit}
                homeloancheck={homeloancheck}
                typeDropdown={typeDropdown}
                configuration={configuration}
                projectType={projectType}
                purpose={purpose}
                completeName={completeName}
                firstlastname={firstlastname}
                doubleColumn={doubleColumn}
                singleColumn={singleColumn}
                agreeToConnect={agreeToConnect}
                enquireFormData={enquireFormData}
                brochureForm={brochureForm}
                locationData={data?.LocationEnquiryForm.fields}
                setselectedPropertyType={setselectedPropertyType}
                selectedPropertyType={selectedPropertyType}
                setTimeSlotData={setTimeSlotData}
                timeslotData={timeslotData}
                countryFlags={countryFlags}
                setProjectNameValue={setProjectNameValue}
                projectNameValue={projectNameValue}
                setValue={setValue}
                key={showThankyou?.toString() || undefined}
                getCurrentDate={getCurrentDate}
                heading={enquireFormHeading}
                isContactUs={isContactUs}
                selectedTownship={selectedTownship}
                autoPopup={autoPopup}
                showCompletedProjectPopup={showCompletedProjectPopup}
                continueWithForm={continueWithForm}
                handleCancelOnCompletedProject={onHideEnquiryForm}
              />
            }
          />
        );
      case isPopup:
        return (
          <Offcanvas
            placement="bottom"
            className={showCompletedProjectPopup ? styles.completedProjectsCanvas : ''}
            show={showEnquiryForm}
            onHide={onHideEnquiryForm}
          >
            <Offcanvas.Header closeButton>
              <OffcanvasHeading>{showCompletedProjectPopup ? '' : enquireFormHeading}</OffcanvasHeading>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <PropertyEnquiryForm
                isPopup={isPopup}
                onSubmit={onSubmit}
                control={control}
                handleSubmit={handleSubmit}
                getValues={getValues}
                errors={errors}
                enquiryfield={enquiryfield}
                planvisit={planvisit}
                homeloancheck={homeloancheck}
                typeDropdown={typeDropdown}
                configuration={configuration}
                projectType={projectType}
                purpose={purpose}
                completeName={completeName}
                firstlastname={firstlastname}
                doubleColumn={doubleColumn}
                singleColumn={singleColumn}
                agreeToConnect={agreeToConnect}
                enquireFormData={enquireFormData}
                brochureForm={brochureForm}
                locationData={data?.LocationEnquiryForm.fields}
                setselectedPropertyType={setselectedPropertyType}
                selectedPropertyType={selectedPropertyType}
                setTimeSlotData={setTimeSlotData}
                timeslotData={timeslotData}
                countryFlags={countryFlags}
                setProjectNameValue={setProjectNameValue}
                projectNameValue={projectNameValue}
                setValue={setValue}
                key={showThankyou?.toString() || undefined}
                getCurrentDate={getCurrentDate}
                heading={enquireFormHeading}
                isContactUs={isContactUs}
                selectedTownship={selectedTownship}
                autoPopup={autoPopup}
                showCompletedProjectPopup={showCompletedProjectPopup}
                continueWithForm={continueWithForm}
                handleCancelOnCompletedProject={onHideEnquiryForm}
              />
            </Offcanvas.Body>
          </Offcanvas>
        );

      case !isPopup:
        return (
          <PropertyEnquiryForm
            isPopup={isPopup}
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            getValues={getValues}
            errors={errors}
            enquiryfield={enquiryfield}
            planvisit={planvisit}
            homeloancheck={homeloancheck}
            typeDropdown={typeDropdown}
            configuration={configuration}
            projectType={projectType}
            purpose={purpose}
            completeName={completeName}
            firstlastname={firstlastname}
            doubleColumn={doubleColumn}
            singleColumn={singleColumn}
            agreeToConnect={agreeToConnect}
            enquireFormData={enquireFormData}
            brochureForm={brochureForm}
            locationData={data?.LocationEnquiryForm.fields}
            setselectedPropertyType={setselectedPropertyType}
            selectedPropertyType={selectedPropertyType}
            setTimeSlotData={setTimeSlotData}
            timeslotData={timeslotData}
            countryFlags={countryFlags}
            setProjectNameValue={setProjectNameValue}
            projectNameValue={projectNameValue}
            setValue={setValue}
            key={showThankyou?.toString() || undefined}
            getCurrentDate={getCurrentDate}
            heading={enquireFormHeading}
            showHeading={true}
            isContactUs={isContactUs}
            selectedTownship={selectedTownship}
            autoPopup={autoPopup}
            showCompletedProjectPopup={showCompletedProjectPopup}
            continueWithForm={continueWithForm}
            handleCancelOnCompletedProject={onHideEnquiryForm}
          />
        );
      default:
        return <></>;
    }
  };
  return showRequiredForm();
};

export default EnquiryFormHelper;
