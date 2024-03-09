import React from "react";
import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

export default function Input({
  id,
  name,
  label,
  type,
  color,
  isValid,
  errorMessage,
  inputProps,
  icon,
  ph,
  defaultValue,
}) {
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
 
  function handleValidation(e) {
    const result = isValid(e.currentTarget);
    setInputValue(e.currentTarget.value);
    if (result) {
      setIsError(false);
    } else setIsError(true);
  }

  return (
    <FormControl fullWidth variant="filled">
      <TextField
        id={id}
        name={name}
        label={label}
        type={type}
        placeholder={ph}
        color={color}
        inputProps={inputProps}
        InputProps={icon}
        onChange={handleValidation}
        error={isError}
        required={true} 
        value={inputValue}
      />
      {isError && (
        <FormHelperText
          sx={{ marginLeft: "10px", textAlign: "right", color: "red" }}
          id="outlined-bDay"
          color="error"
        >
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
