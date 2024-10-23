import { Button } from '@components';
import { IBrochureForm, IProjectTypeOption } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styles from './EnquiryForms.module.scss';
import {
  CheckBoxWithLabelInput,
  MobileNumberInput,
  MultipleOptionMultipleInput,
  PropertyDropdown,
  TextInput,
} from './FormFields';

const BrochureForm = (props: IBrochureForm) => {
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
    countryFlags,
    setProjectNameValue,
    projectNameValue,
    setValue,
    selectedTownship = '',
  } = props;

  const {
    configuration: ConfigurationMsg,
    contactAdaniRealty: ContactAdaniRealtyMsg,
    email: EmailMsg,
    name: NameMsg,
    projectName: ProjectNameMsg,
  } = enquireFormData.errorData;

  const [configurationFilterData, setConfigurationFilterData] = useState<string[]>();
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

  const setDropdownSelected = (
    e: any,
    onChange: { (...event: any[]): void; (...event: any[]): void; (...event: any[]): void; (arg0: any): void },
  ) => {
    onChange(e);
    setConfigValue(0);
    resetConfigValues();
  };

  const filterPropertiesAsPerTownship = (selectedTownship: string) => {
    const filteredProperties = locationData?.filter(
      (i: any) => i?.data?.township?.toLowerCase() === selectedTownship.toLowerCase(),
    );
    return filteredProperties;
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
      <p className={styles.subheading}>{enquireFormData?.brochureFormDescription}</p>
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
            </div>
          </Col>
          <Col className={styles.borderleft} sm={12} md={12} lg={6}>
            <div className={styles.forminner}>
              <TextInput
                control={control}
                errorMsg={EmailMsg}
                validatorRegex={emailValidatorRegex}
                label={enquireFormData.email}
                getValues={getValues}
                errors={errors}
                controlName={'Email'}
              />
              <div className="mb-4">
                <Controller
                  control={control}
                  name={`Property`}
                  rules={{
                    required: projectNameValue === '' ? ProjectNameMsg : false,
                  }}
                  render={({ field: { onChange, value, onBlur } }) => {
                    return selectedTownship ? (
                      <PropertyDropdown
                        label={enquireFormData?.propertyLabel}
                        onBlur={onBlur}
                        placeholder={enquireFormData?.selectProjectProperty}
                        options={filterPropertiesAsPerTownship(selectedTownship)}
                        selected={getSelectedValue(value)}
                        setSelected={(e: any) => {
                          setDropdownSelected(e, onChange);
                        }}
                        errorMessage={errors[`Property`]?.message}
                        setProjectNameValue={setProjectNameValue}
                        currentValue={getValues('Property')}
                        setConfigurationFilterData={setConfigurationFilterData}
                      />
                    ) : (
                      <PropertyDropdown
                        label={enquireFormData?.propertyLabel}
                        onBlur={onBlur}
                        placeholder={enquireFormData?.selectProjectProperty}
                        options={filterLocationData(selectedPropertyType)}
                        selected={getSelectedValue(value)}
                        errorMessage={errors[`Property`]?.message}
                        setProjectNameValue={setProjectNameValue}
                        currentValue={getValues('Property')}
                        disabled={true}
                        disabledStyle={true}
                        setConfigurationFilterData={setConfigurationFilterData}
                      />
                    );
                  }}
                />
              </div>
              {getValues('Property') && configurationFilterData && configurationFilterData?.length > 0 && (
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
        </Row>
      </Form>
    </div>
  );
};

export default BrochureForm;
