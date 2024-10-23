import { FloatingInput } from '@components';
import { ITextInput } from '@interfaces';
import { Controller } from 'react-hook-form';

const TextInput = (props: ITextInput) => {
  const { control, errorMsg, validatorRegex, label, errors, controlName, allowedMaxLength = 50, getValues } = props;
  return (
    <Controller
      control={control}
      name={controlName}
      rules={{
        required: errorMsg,
        pattern: {
          value: validatorRegex,
          message: errorMsg,
        },
      }}
      render={({ field: { onChange, onBlur, ref } }) => (
        <>
          {ref}
          <FloatingInput
            label={label}
            controlId={controlName}
            className="mb-4"
            type="text"
            controlProps={{
              defaultValue: getValues(controlName) || '',
              value: getValues(controlName) || '',
              maxLength: allowedMaxLength,
            }}
            inputRef={ref}
            onBlur={onBlur}
            onChange={(e: any) => {
              onChange(e?.target?.value);
            }}
            onClear={() => {
              onChange('');
            }}
            placeholder={label}
            isInvalid={errors?.[controlName]}
            errorMsg={errors?.[controlName]?.message}
            isClear={true}
          />
        </>
      )}
    />
  );
};

export default TextInput;
