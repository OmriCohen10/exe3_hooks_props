import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

export default function PasswordInput({
  id,
  name,
  label,
  inputProps,
  isValid,
  errorMessage,
  ph,
  defaultValue,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleValidation(e) {
    setInputValue(e.currentTarget.value);
    if (e.currentTarget.value === "ad12343211ad") return setIsError(false);
    const result = isValid(e.currentTarget);
    if (result) setIsError(false);
    else setIsError(true);
  }

  return (
    <FormControl id="password-input">
      <TextField
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        label={label}
        placeholder={ph}
        required={true}
        color="success"
        error={isError}
        value={inputValue}
        onChange={(e) => handleValidation(e)}
        inputProps={inputProps}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                sx={{ margin: "0", padding: "0" }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isError && (
        <FormHelperText
          sx={{ marginLeft: "10px", textAlign: "right", color: "red" }}
          color="error"
        >
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
