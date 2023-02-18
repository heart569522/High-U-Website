import React, { useState, useCallback, ChangeEvent, FormEvent, KeyboardEventHandler, } from 'react';
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

const SignInForm = React.memo(() => {
    const router = useRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    }, []);

    const handleLogin = useCallback((event: FormEvent) => {
        event.preventDefault();
        alert(username);
        alert(password);
    }, [username, password]);

    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (

        <ThemeProvider theme={theme}>
            <Box className="bg-[#948975] h-full w-full bg-cover fixed">
                <Box className="colorBackgroundGold h-full w-full bg-cover fixed" >
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <Box className="dropShadow mt-8 flex flex-col items-center bg-white p-5 rounded-lg" data-aos="fade-zoom-in">
                            <Typography component="h1" variant="h5" color="primary" className="font-bold">
                                High U - Member
                            </Typography>
                            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="bg-amber-400 hover:bg-amber-500 mt-3 mb-2 font-bold"
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link onClick={() => handleMenuItemClick('/user/SignUp')} className="cursor-pointer" variant="body2" color="secondary">
                                            {"Don't have an account? SignUp"}
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
)

export default SignInForm;
