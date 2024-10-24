import { GRIMobileInput } from "@interfaces";
import { mobileNumberValidatorRegex } from "@utils";
import { useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Controller } from "react-hook-form";
import styles from "../form.module.scss";

const CountryInput = (props: any) => {
  const { control, controlName, getValues, defaultValue } = props;
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, onBlur, ref } }) => (
        <>
          {ref}
          <Form.Group className="w-25" controlId={controlName}>
            <Form.Select
              className={styles.selectInput}
              aria-label="Default select example"
              value={getValues(controlName) || ""}
              disabled={false}
              onChange={(e: any) => {
                onChange(e?.target?.value);
              }}
            >
              <option value="1">+91</option>
              <option value="2">+1</option>
              <option value="3">+441</option>
            </Form.Select>
          </Form.Group>
        </>
      )}
    />
  );
};

const MobileInput = (props: any) => {
  const {
    control,
    errorMsg,
    errors,
    controlName,
    placeholder,
    allowedMaxLength = 10,
    getValues,
  } = props;
  return (
    <Controller
      control={control}
      name={controlName}
      rules={{
        required: errorMsg,
        pattern: {
          value: mobileNumberValidatorRegex,
          message: errorMsg,
        },
      }}
      render={({ field: { onChange, onBlur, ref } }) => (
        <>
          {ref}
          <Form.Group
            className={`mb-3 w-75 ${styles.mobileInput}`}
            controlId={controlName}
          >
            <Form.Control
              type="tel"
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={(e: any) => {
                onChange(e?.target?.value);
              }}
              value={getValues(controlName) || ""}
              maxLength={allowedMaxLength}
              isInvalid={errors?.[controlName]}
              disabled={false}
              autoComplete="off"
              className={styles.textInput}
            />
            {errorMsg && (
              <FormControl.Feedback type={"invalid"}>
                {errorMsg}
              </FormControl.Feedback>
            )}
          </Form.Group>
        </>
      )}
    />
  );
};

const GriMobileInput = (props: GRIMobileInput) => {
  const {
    control,
    errorMsg,
    label,
    errors,
    controlNameCode,
    controlNamePhone,
    placeholder,
    defaultValue,
    getValues,
    setValue,
  } = props;

  useEffect(() => {
    if (defaultValue) {
      setValue(controlNameCode, defaultValue);
    }
  });

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex">
        <CountryInput
          control={control}
          controlName={controlNameCode}
          getValues={getValues}
          defaultValue={defaultValue}
        />
        <MobileInput
          control={control}
          errorMsg={errorMsg}
          errors={errors}
          controlName={controlNamePhone}
          placeholder={placeholder}
          allowedMaxLength={10}
          getValues={getValues}
        />
      </div>
    </>
  );
};

export default GriMobileInput;
