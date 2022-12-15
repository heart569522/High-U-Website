import React, { useState } from 'react';
import { TextField } from "@mui/material";

export default function test() {

const [password, setPassword] = useState<string>("");
const [confirmPassword, setConfirmPassword] = useState<string>("");
const [error, setError] = useState<string | null>(null);

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(event.target.value);
  setError(null); // Clear any previous errors
};

const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setConfirmPassword(value);

  if (value !== password) {
    setError("The passwords do not match.");
  } else {
    setError(null);
  }
};

const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === " ") {
    event.preventDefault();
  }
};

  return (
    <div>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        required={true}
        onKeyPress={handleKeyPress}
      />
      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={Boolean(error)}
        helperText={error}
        required={true}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}





