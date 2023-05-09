import React, { useState, useCallback, ChangeEvent, FormEvent, KeyboardEventHandler, useRef } from 'react';
import { useRouter } from 'next/router'
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
    Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn, SignInResponse } from 'next-auth/react';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#F0CA83",
        },
        secondary: {
            main: "#303030"
        }
    },
});

export const SignIn = React.memo(() => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }, []);

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        try {
            const result: SignInResponse = await signIn('credentials', {
                redirect: false,
                username,
                password
              }) as SignInResponse;

            if (result.error) {
                throw new Error('Login failed. Please check your credentials and try again.');
            } else {
                router.push('./Dashboard');
            }
        } catch (e: any) {
            console.error(e);
            // alert(e.message);
            setErrorMessage("Username or Password is Wrong")
        }
    }, [username, password, router]);

    return (

        <ThemeProvider theme={theme}>
            <Box className="bg-[#e8e8e8] h-full w-full bg-cover fixed">
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Paper elevation={3} className="my-12 shadow-lg top-0 rounded-lg bg-white p-5" data-aos="fade-zoom-in">
                        <Typography variant="h5" color="black" className="font-bold text-center">
                            High U - Administrator
                        </Typography>
                        <form onSubmit={handleSubmit} className="mt-1">
                            <TextField
                                label="Username"
                                value={username}
                                id="username"
                                name="username"
                                onChange={handleUsernameChange}
                                onKeyPress={handleKeyPress}
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                name="password"
                                label="Password"
                                value={password}
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                                type='password'
                                variant="outlined"
                                fullWidth
                            />
                            {errorMessage ? <p className="text-red-500 font-bold">{errorMessage}</p> : null}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="bg-[#F0CA83] hover:bg-[#e3b560] text-white text-lg py-3 mt-3 mb-2 font-bold"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>

    );
}
)

SignIn.displayName = 'SignIn';
