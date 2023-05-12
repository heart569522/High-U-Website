import React, { ChangeEvent, useState } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router'
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Link,
    TextField,
    Button,
    ButtonGroup,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    const router = useRouter()
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/high-u.appspot.com/o/default_images%2Fdefault-user-icon.jpg?alt=media&token=edd06ee7-020c-4436-80ae-2e175acc0584';

    const [image, setImage] = useState(defaultImage);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (setState: (value: string) => void) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    const handleFormValidation = () => {
        setIsFormValid(
            !!firstname.trim() &&
            !!lastname.trim() &&
            !!username.trim() &&
            !!email.trim() &&
            !!password.trim() &&
            !!confirmPassword.trim() &&
            password === confirmPassword
        );
    };

    const handleReset = () => {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
        setErrorMessage(null);
        setMessage(null);
        setIsFormValid(false);
    };

    const checkPasswordsMatch = (): boolean => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        if (!checkPasswordsMatch()) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const sanitizedImage = DOMPurify.sanitize(image);
            const sanitizedFirstname = DOMPurify.sanitize(firstname);
            const sanitizedLastname = DOMPurify.sanitize(lastname);
            const sanitizedEmail = DOMPurify.sanitize(email);
            const sanitizedUsername = DOMPurify.sanitize(username);
            const sanitizedPassword = DOMPurify.sanitize(password);

            const response = await fetch(`${process.env.API_URL}/api/auth/user_signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: sanitizedImage,
                    firstname: sanitizedFirstname,
                    lastname: sanitizedLastname,
                    email: sanitizedEmail,
                    username: sanitizedUsername,
                    password: sanitizedPassword,
                }),
            }); console.log(image, firstname, lastname, email, username, password)

            if (response.ok) {
                handleReset();
                setMessage("Sign Up Successfully!");
                // Navigate to sign in page after a delay
                setTimeout(() => {
                    window.location.href = '/SignIn';
                }, 1500);

            } else {
                throw new Error(await response.text());
            }
        } catch (error: any) {
            console.error(error);
            setErrorMessage("Sign Up Error, Try again later.");
        } finally {
            setLoading(false);
        }
    }

    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className="bg-[#948975] h-full w-full bg-cover fixed">
                <Box className="colorBackgroundGold h-full w-full bg-cover fixed" >
                    <Container component="main" maxWidth="sm">
                        {/* <CssBaseline /> */}
                        <Box className="dropShadow mt-8 flex flex-col items-center bg-white p-5 rounded-lg" data-aos="fade-zoom-in">
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                                <Typography>&nbsp;Loading...</Typography>
                            </Backdrop>
                            <Typography component="h1" variant="h5" color="primary" className="font-bold">
                                High U - Sign Up
                            </Typography>
                            {message ?
                                <Typography variant="subtitle1" className="font-bold text-green-700">
                                    {message}
                                </Typography>
                                : null}
                            {errorMessage ?
                                <Typography variant="subtitle1" className="font-bold text-red-500">
                                    {errorMessage}
                                </Typography>
                                : null}
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <input
                                            name="image"
                                            id='image'
                                            value={image}
                                            disabled
                                            type="hidden"
                                            onChange={handleChange(setImage)}
                                        />
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstname"
                                            value={firstname}
                                            required
                                            fullWidth
                                            id="firstname"
                                            label="First Name"
                                            autoFocus
                                            onChange={handleChange(setFirstname)}
                                            onBlur={handleFormValidation}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={lastname}
                                            id="lastname"
                                            label="Last Name"
                                            name="lastname"
                                            autoComplete="family-name"
                                            onChange={handleChange(setLastname)}
                                            onBlur={handleFormValidation}
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
                                            onBlur={handleFormValidation}
                                            required
                                            fullWidth
                                            autoComplete="username"
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={email}
                                            type="email"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            variant="outlined"
                                            onChange={handleChange(setEmail)}
                                            onBlur={handleFormValidation}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            name="password"
                                            label="Password"
                                            value={password}
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={handlePasswordChange}
                                            onBlur={handleFormValidation}
                                            variant="outlined"
                                            fullWidth
                                            onKeyPress={handleKeyPress}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            value={confirmPassword}
                                            id="confirmPassword"
                                            onChange={handleConfirmPasswordChange}
                                            onBlur={handleFormValidation}
                                            type="password"
                                            variant="outlined"
                                            onKeyPress={handleKeyPress}
                                            fullWidth
                                            error={Boolean(error)}
                                            helperText={error}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonGroup fullWidth className='flex flex-col'>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                className={`bg-amber-400 hover:bg-amber-500 mt-3 mb-2 font-bold text-white ${!isFormValid ? "opacity-50 bg-slate-500 cursor-not-allowed" : ""
                                                    }`}
                                                disabled={!isFormValid}
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
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link
                                            onClick={() => handleMenuItemClick('/SignIn')}
                                            className="cursor-pointer"
                                            variant="body2"
                                            color="secondary"
                                        >
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