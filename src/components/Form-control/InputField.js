import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

export const InputField = ({ name, control, label, errors }) => {
  console.log(errors);
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          error={error}
          variant="outlined"
          label={label}
          fullWidth
          helperText={error ? error.message : null}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
