import { Button, SectionHeader, SelectDropdown } from '@components';
import { IContactUsForm } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styles from './EnquiryForms.module.scss';
import {
  CheckBoxWithLabelInput,
  MobileNumberInput,
  MultipleOptionMultipleInput,
  PropertyDropdown,
  TextArea,
  TextInput,
} from './FormFields';

const ContactUsForm = (props: IContactUsForm) => {
  const {
    showHeading = false,
    onSubmit,
    control,
    handleSubmit,
    getValues,
    errors,
    enquireFormData,
    countryFlags,
    heading = '',
    isPopup = false,
    locationData,
    setValue,
    setProjectNameValue,
    projectNameValue,
  } = props;

  const {
    contactAdaniRealty: ContactAdaniRealtyMsg,
    email: EmailMsg,
    name: NameMsg,
    purpose: PurposeMsg,
    projectName: ProjectNameMsg,
    configuration: ConfigurationMsg,
    messageError,
  } = enquireFormData.errorData;

  const [purposeData, setPurposeData] = useState<{ label: string; value: string; id: string }[]>();
  useState<{ isPassed: boolean; item: { value: string; id?: string } }[]>();

  const [configValue, setConfigValue] = useState<number>(0);
  const [configurationFilterData, setConfigurationFilterData] = useState<string[]>();
  const [purposeType, setPurposeType] = useState<string>('');

  useEffect(() => {
    const arr: { label: string; value: string; id: string }[] = [];
    enquireFormData?.purposeList?.map((items: { value: string; id: string }) => {
      const purposeobj = { label: items?.value, value: items?.value, id: items?.id };
      arr.push(purposeobj);
      setPurposeData([...arr]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!purposeType) {
      setPurposeType(getValues('Purpose')?.value?.split(' ')?.[0]?.toLowerCase() || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues('Purpose')]);

  const filterLocationData = (selectedPropertyFilterType: string) => {
    const filteredProperties = locationData?.filter(
      (i: any) => i?.data?.propertyTypeFilter?.toLowerCase()?.includes(selectedPropertyFilterType.toLowerCase()),
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

  const setDropdownSelected = (
    e: any,
    onChange: { (...event: any[]): void; (...event: any[]): void; (...event: any[]): void; (arg0: any): void },
  ) => {
    onChange(e);
    setConfigValue(0);
    resetConfigValues();
  };

  const resetConfigValues = () => {
    Object.keys(getValues()).forEach((item) => item.toLowerCase().includes('size') && setValue(item, null));
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

          <div className="mb-3">
            <Controller
              control={control}
              name={`Purpose`}
              rules={{
                required: PurposeMsg,
              }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <SelectDropdown
                    className={`${errors['Purpose']?.message ? styles.invalidInput : ''} ${styles.selectDropdown}`}
                    controlID={'Purpose'}
                    label={`Purpose`}
                    options={purposeData}
                    selected={value}
                    onBlur={onBlur}
                    onChange={(key: any) => {
                      onChange(key);
                      setPurposeType(key?.value?.split(' ')?.[0]?.toLowerCase() || '');
                      setValue('Property', undefined);
                      setValue('Comments', undefined);
                      if (key?.value?.toLowerCase()?.includes('other')) {
                        setConfigValue(0);
                        resetConfigValues();
                      }
                    }}
                    defaultValue={getValues('Purpose') || ''}
                    errorMessage={errors[`Purpose`]?.message}
                  />
                );
              }}
            />
            <div className={styles.invalidErrorText}>{errors[`Purpose`]?.message}</div>
          </div>
          {purposeType && !purposeType?.includes('other') && (
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
                      options={filterLocationData(purposeType)}
                      selected={getSelectedValue(value)}
                      setSelected={(e: any) => {
                        setDropdownSelected(e, onChange);
                      }}
                      errorMessage={errors[`Property`]?.message}
                      setProjectNameValue={setProjectNameValue}
                      currentValue={getValues('Property')}
                      setConfigurationFilterData={setConfigurationFilterData}
                      menuWidth="100%"
                    />
                  );
                }}
              />
            </div>
          )}
          {purposeType.toLowerCase().includes('residential') &&
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

          {purposeType?.includes('other') && (
            <div className="mb-3">
              <TextArea
                label={enquireFormData.messageLabel || 'Message'}
                control={control}
                errorMsg={messageError}
                errors={errors}
                controlName={'Comments'}
                allowedMaxLength={enquireFormData?.messageMaxLength}
              />
            </div>
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

export default ContactUsForm;
