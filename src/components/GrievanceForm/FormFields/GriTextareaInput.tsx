import { GRITextInput } from "@interfaces";
import { nameValidatorRegex } from "@utils";
import { Form, FormControl } from "react-bootstrap";
import { Controller } from "react-hook-form";
import styles from "../form.module.scss";

const GriTextareaInput = (props: GRITextInput) => {
  const {
    control,
    errorMsg,
    label,
    errors,
    controlName,
    placeholder,
    type,
    allowedMaxLength = 50,
    getValues,
  } = props;
  return (
    <Controller
      control={control}
      name={controlName}
      rules={{
        required: errorMsg,
        pattern: {
          value: nameValidatorRegex,
          message: errorMsg,
        },
      }}
      render={({ field: { onChange, onBlur, ref } }) => (
        <>
          {ref}
          <Form.Group className="mb-3" controlId={controlName}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
              as="textarea"
              rows={1}
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

export default GriTextareaInput;
