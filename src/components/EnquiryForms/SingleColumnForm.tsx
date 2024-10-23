import { Button, SectionHeader } from '@components';
import { IProjectTypeOption, ISingleColumnForm } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
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

const SingleColumnForm = (props: ISingleColumnForm) => {
  const {
    showHeading = false,
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
    heading = '',
    isPopup = false,
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className={styles.CitySearch}>
          {showHeading && <SectionHeader heading={heading || enquireFormData?.enquireNow} />}
          <TextInput
            control={control}
            errorMsg={NameMsg}
            validatorRegex={nameValidatorRegex}
            label={enquireFormData.name}
            getValues={getValues}
            errors={errors}
            controlName={'Name'}
          />
          <div className={styles.inputGroup}>
            <MobileNumberInput
              getValues={getValues}
              errors={errors}
              enquireFormData={enquireFormData}
              countryFlags={countryFlags}
              control={control}
            />
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
                  required: ProjectNameMsg,
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
          <CheckBoxWithLabelInput
            control={control}
            controlName={'loanCheckBox'}
            id={isPopup ? 'loanCheckBox' : 'pageLoanCheckBox'}
            label={enquireFormData?.homeLoanInterested}
          />
          <CheckBoxWithLabelInput
            control={control}
            controlName={'ContactAdaniRealty'}
            id={isPopup ? 'ContactAdaniRealty' : 'pageContactAdaniRealty'}
            label={enquireFormData?.agreeToConnect}
            errors={errors}
            errorMsg={ContactAdaniRealtyMsg}
          />
          <div className="mt-2">
            <Button type="submit" variant="primary" className="w-100">
              {enquireFormData?.submitDetail}
            </Button>
          </div>

          <div
            className={`${styles.agreeTxt} text-center mt-4`}
            dangerouslySetInnerHTML={{ __html: enquireFormData?.overrideRegistry }}
          ></div>
        </div>
      </div>
    </Form>
  );
};

export default SingleColumnForm;
