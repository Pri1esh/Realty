import { GRIMobileInput } from "@interfaces";
import { mobileNumberValidatorRegex } from "@utils";
import { useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Controller } from "react-hook-form";
import styles from "../form.module.scss";

const CountryInput = (props: any) => {
  const { control, controlName, getValues, defaultValue } = props;

  const countryCodes = [
    { value: "+1", code: "+1", country: "United States" },
    { value: "+44", code: "+44", country: "United Kingdom" },
    { value: "+91", code: "+91", country: "India" },
    { value: "+61", code: "+61", country: "Australia" },
    { value: "+81", code: "+81", country: "Japan" },
    { value: "+49", code: "+49", country: "Germany" },
    { value: "+33", code: "+33", country: "France" },
    { value: "+86", code: "+86", country: "China" },
    { value: "+39", code: "+39", country: "Italy" },
    { value: "+55", code: "+55", country: "Brazil" },
    { value: "+7", code: "+7", country: "Russia" },
    { value: "+34", code: "+34", country: "Spain" },
    { value: "+1", code: "+1", country: "Canada" },
    { value: "+32", code: "+32", country: "Belgium" },
    { value: "+52", code: "+52", country: "Mexico" },
    { value: "+31", code: "+31", country: "Netherlands" },
    { value: "+82", code: "+82", country: "South Korea" },
    { value: "+47", code: "+47", country: "Norway" },
    { value: "+46", code: "+46", country: "Sweden" },
    { value: "+48", code: "+48", country: "Poland" },
    { value: "+41", code: "+41", country: "Switzerland" },
    { value: "+43", code: "+43", country: "Austria" },
    { value: "+61", code: "+61", country: "New Zealand" },
    { value: "+65", code: "+65", country: "Singapore" },
    { value: "+353", code: "+353", country: "Ireland" },
    { value: "+63", code: "+63", country: "Philippines" },
    { value: "+54", code: "+54", country: "Argentina" },
    { value: "+56", code: "+56", country: "Chile" },
    { value: "+20", code: "+20", country: "Egypt" },
    { value: "+27", code: "+27", country: "South Africa" },
    { value: "+966", code: "+966", country: "Saudi Arabia" },
    { value: "+971", code: "+971", country: "United Arab Emirates" },
    { value: "+92", code: "+92", country: "Pakistan" },
    { value: "+60", code: "+60", country: "Malaysia" },
    { value: "+90", code: "+90", country: "Turkey" },
    { value: "+66", code: "+66", country: "Thailand" },
    { value: "+84", code: "+84", country: "Vietnam" },
    { value: "+98", code: "+98", country: "Iran" },
    { value: "+880", code: "+880", country: "Bangladesh" },
    { value: "+64", code: "+64", country: "New Zealand" },
    { value: "+351", code: "+351", country: "Portugal" },
    { value: "+31", code: "+31", country: "Netherlands" },
    { value: "+372", code: "+372", country: "Estonia" },
    { value: "+234", code: "+234", country: "Nigeria" },
    { value: "+61", code: "+61", country: "Papua New Guinea" },
    { value: "+39", code: "+39", country: "Vatican City" },
    { value: "+1", code: "+1", country: "Jamaica" },
    { value: "+353", code: "+353", country: "Ireland" },
    { value: "+972", code: "+972", country: "Israel" },
    { value: "+359", code: "+359", country: "Bulgaria" },
    { value: "+965", code: "+965", country: "Kuwait" },
    { value: "+961", code: "+961", country: "Lebanon" },
    { value: "+964", code: "+964", country: "Iraq" },
    { value: "+962", code: "+962", country: "Jordan" },
    { value: "+216", code: "+216", country: "Tunisia" },
    {
      value: "+243",
      code: "+243",
      country: "Democratic Republic of the Congo",
    },
    { value: "+971", code: "+971", country: "United Arab Emirates" },
    { value: "+598", code: "+598", country: "Uruguay" },
    { value: "+258", code: "+258", country: "Mozambique" },
    { value: "+56", code: "+56", country: "Chile" },
    { value: "+51", code: "+51", country: "Peru" },
    { value: "+48", code: "+48", country: "Poland" },
    { value: "+420", code: "+420", country: "Czech Republic" },
    { value: "+971", code: "+971", country: "United Arab Emirates" },
  ];

  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, ref } }) => (
        <>
          {ref}
          <Form.Group className="w-25" controlId={controlName}>
            <Form.Select
              className={styles.selectInput}
              aria-label="Default select example"
              value={getValues(controlName) || defaultValue}
              disabled={false}
              onChange={(e: any) => {
                onChange(e?.target?.value);
              }}
            >
              {countryCodes &&
                countryCodes.map((country: any, index: number) => (
                  <option key={index} value={country?.value}>
                    {country?.code}
                  </option>
                ))}
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
