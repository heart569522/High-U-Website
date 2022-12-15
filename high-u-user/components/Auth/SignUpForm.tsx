import React, { useState } from 'react';
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Link,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#FFB900",
        },
        secondary: {
            main: "#303030"
        }
    },
});

export default function SignUpForm() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value);
    };

    const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

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

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        alert(username)
        alert(password)
    };

    return (

        <ThemeProvider theme={theme}>
            <Box
                className='colorBackgroundGold'
                sx={{
                    height: '100%',
                    width: '100%',
                    position: 'fixed',
                    backgroundSize: 'cover'
                }}
            >
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        className='dropShadow'
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'white',
                            padding: 5,
                            borderRadius: 1,
                        }}
                    >
                        <Typography component="h1" variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                            High U - Sign Up
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        value={firstname}
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onKeyPress={handleKeyPress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={lastname}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onKeyPress={handleKeyPress}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Username"
                                        value={username}
                                        id="username"
                                        name="username"
                                        onChange={handleUsernameChange}
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoComplete="username"
                                        autoFocus
                                        onKeyPress={handleKeyPress}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        value={email}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onKeyPress={handleKeyPress}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        name="password"
                                        label="Password"
                                        value={password}
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handlePasswordChange}
                                        variant="outlined"
                                        fullWidth
                                        onKeyPress={handleKeyPress}
                                    />
                                    <TextField
                                        required
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        value={confirmPassword}
                                        id="confirmPassword"
                                        onChange={handleConfirmPasswordChange}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        onKeyPress={handleKeyPress}
                                        fullWidth
                                        error={Boolean(error)}
                                        helperText={error}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, fontWeight: 'bold', }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/SignIn" variant="body2" color="secondary">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>


    );
}