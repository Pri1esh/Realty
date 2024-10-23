import { Button } from '@components';
import { IDoubleColumnEnquiryForm, IProjectTypeOption } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styles from './EnquiryForms.module.scss';
import {
  CheckBoxWithLabelInput,
  MobileNumberInput,
  MultipleOptionMultipleInput,
  MultipleOptionSingleInput,
  PropertyDropdown,
  TextInput,
} from './FormFields';

const DoubleColumnEnquiryForm = (props: IDoubleColumnEnquiryForm) => {
  const {
    onSubmit,
    control,
    handleSubmit,
    getValues,
    errors,
    enquireFormData,
    locationData,
    selectedPropertyType,
    setselectedPropertyType,
    setProjectNameValue,
    projectNameValue,
    setValue,
    countryFlags,
    autoPopup = false,
  } = props;

  const {
    configuration: ConfigurationMsg,
    contactAdaniRealty: ContactAdaniRealtyMsg,
    email: EmailMsg,
    name: NameMsg,
    projectName: ProjectNameMsg,
    projectType: ProjectTypeMsg,
  } = enquireFormData.errorData;

  const [configurationFilterData, setConfigurationFilterData] = useState<string[]>();
  useState<{ isPassed: boolean; item: { value: string; id?: string } }[]>();
  const [configValue, setConfigValue] = useState<number>(0);

  useEffect(() => {
    selectedPropertyType !== '' &&
      enquireFormData?.projectTypeOptions.map((item: IProjectTypeOption) => {
        if (selectedPropertyType !== '' && item?.value.toLowerCase().includes(selectedPropertyType.toLowerCase())) {
          setValue('PropertyType', item?.value);
          setselectedPropertyType(item?.value);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.keys(getValues()).forEach((keys) => {
      if (keys.includes('size') && getValues(keys)) {
        setConfigValue((prev: number) => prev + 1);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetConfigValues = () => {
    Object.keys(getValues()).forEach((item) => item.toLowerCase().includes('size') && setValue(item, null));
  };

  const filterLocationData = (selectedPropertyFilterType: string) => {
    const filteredProperties = locationData?.filter(
      (i: any) => i?.data?.propertyTypeFilter?.toLowerCase() === selectedPropertyFilterType.toLowerCase(),
    );
    return filteredProperties;
  };

  const setDropdownSelected = (
    e: any,
    onChange: { (...event: any[]): void; (...event: any[]): void; (...event: any[]): void; (arg0: any): void },
  ) => {
    onChange(e);
    setConfigValue(0);
    resetConfigValues();
  };

  const onChangePropertyType = (onChange: (arg0: string) => void, value = '') => {
    if (selectedPropertyType !== '' && value.toLowerCase().includes(selectedPropertyType.toLowerCase())) {
      onChange('');
      setselectedPropertyType('');
    } else {
      onChange(value);
      setselectedPropertyType(value.toLowerCase());
      setProjectNameValue && setProjectNameValue('');
    }
    setValue('Property', undefined);
  };

  const onChangeConfiguration = (
    onChange: { (...event: any[]): void; (arg0: null): void },
    value: string,
    item: string,
  ) => {
    if (value) {
      if (configValue) {
        setConfigValue((prev: number) => prev - 1);
      }
      onChange(null);
    } else {
      setConfigValue((prev: number) => prev + 1);
      onChange(item);
    }
  };

  const getSelectedValue = (value: string) => {
    if (projectNameValue && projectNameValue?.length > 0) {
      return projectNameValue;
    } else if (value?.includes('-')) {
      return value;
    } else {
      return '';
    }
  };

  return (
    <div className={styles.enquirenow}>
      <p className={styles.subheading}>
        {autoPopup
          ? enquireFormData?.popupSubTitle || 'Let us know your details, and we will get back soon!'
          : enquireFormData?.shareContact}
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className={styles.formsData}>
          <Col sm={12} md={12} lg={6}>
            <div className={styles.forminner}>
              <TextInput
                control={control}
                errorMsg={NameMsg}
                validatorRegex={nameValidatorRegex}
                label={enquireFormData.name}
                errors={errors}
                controlName={'Name'}
                getValues={getValues}
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
                errors={errors}
                controlName={'Email'}
                getValues={getValues}
              />
            </div>
          </Col>
          <Col className={styles.borderleft} sm={12} md={12} lg={6}>
            <div className={styles.forminner}>
              <MultipleOptionSingleInput
                heading={enquireFormData?.projectType}
                control={control}
                errorMsg={ProjectTypeMsg}
                options={enquireFormData?.projectTypeOptions}
                onChangeOption={onChangePropertyType}
                selectedOption={selectedPropertyType}
                errors={errors}
                controlName={'PropertyType'}
              />
              {selectedPropertyType && (
                <div className="mb-4">
                  <Controller
                    control={control}
                    name={`Property`}
                    rules={{
                      required: projectNameValue === '' ? ProjectNameMsg : false,
                    }}
                    render={({ field: { onChange, value, onBlur } }) => {
                      return (
                        <PropertyDropdown
                          label={enquireFormData?.propertyLabel}
                          onBlur={onBlur}
                          placeholder={enquireFormData?.selectProjectProperty}
                          options={filterLocationData(selectedPropertyType)}
                          selected={getSelectedValue(value)}
                          setSelected={(e: any) => {
                            setDropdownSelected(e, onChange);
                          }}
                          errorMessage={errors[`Property`]?.message}
                          setProjectNameValue={setProjectNameValue}
                          currentValue={getValues('Property')}
                          setConfigurationFilterData={setConfigurationFilterData}
                        />
                      );
                    }}
                  />
                </div>
              )}
              {selectedPropertyType.toLowerCase().includes('residential') &&
                getValues('Property') &&
                configurationFilterData &&
                configurationFilterData?.length > 0 && (
                  <MultipleOptionMultipleInput
                    heading={enquireFormData?.configuration}
                    options={configurationFilterData}
                    control={control}
                    controlName={'size'}
                    errorMsg={!configValue ? ConfigurationMsg : false}
                    onChangeOption={onChangeConfiguration}
                    errors={errors}
                    showError={!configValue}
                  />
                )}
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

export default DoubleColumnEnquiryForm;
