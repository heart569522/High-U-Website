import React, { useState } from 'react';
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Link,
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
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (setState: (value: string) => void) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setState(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        if (value !== confirmPassword) {
            setError("The passwords do not match.");
        } else {
            setError(null);
        }

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

    // const handleClickShowConfirmPassword = () => {
    //   setShowConfirmPassword(!showConfirmPassword);
    // };

    // const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    const handleReset = () => {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(username)
        alert(password)
    };

    return (

        <ThemeProvider theme={theme}>
            <Box className="bg-[#948975] h-full w-full bg-cover fixed">
                <Box className="colorBackgroundGold h-full w-full bg-cover fixed" >
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <Box className="dropShadow mt-8 flex flex-col items-center bg-white p-5 rounded-sm" >
                            <Typography component="h1" variant="h5" color="primary" className="font-bold">
                                High U - Sign Up
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                            onChange={handleChange(setFirstname)}
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
                                            onChange={handleChange(setLastname)}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Username"
                                            value={username}
                                            id="username"
                                            name="username"
                                            onChange={handleChange(setUsername)}
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
                                            onChange={handleChange(setEmail)}
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
                                            // type={showConfirmPassword ? 'text' : 'password'}
                                            type={password}
                                            variant="outlined"
                                            onKeyPress={handleKeyPress}
                                            fullWidth
                                            error={Boolean(error)}
                                            helperText={error}
                                        // InputProps={{
                                        //     endAdornment: (
                                        //         <IconButton
                                        //             aria-label="toggle confirm password visibility"
                                        //             onClick={handleClickShowConfirmPassword}
                                        //             onMouseDown={handleMouseDownConfirmPassword}
                                        //         >
                                        //             {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        //         </IconButton>
                                        //     ),
                                        // }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className="bg-amber-400 mt-3 mb-2 font-bold"
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            type="reset"
                                            fullWidth
                                            variant="outlined"
                                            onClick={handleReset}
                                            className="text-red-500 border-red-500 hover:border-red-700 hover:text-red-700 mt-3 mb-2 font-bold"
                                        >
                                            Reset
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
            </Box>
        </ThemeProvider>


    );
}