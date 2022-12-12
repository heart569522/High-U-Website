import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function FormLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        // Send username and password to server
        alert(username)
        alert(password)
    };

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        ),
                    }}
                />
            </Grid>
            <Grid xs={12}>
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Grid>
        </Grid>
    )
}