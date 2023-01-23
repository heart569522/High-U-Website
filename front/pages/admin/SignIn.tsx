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
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const SignIn = React.memo(() => {
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

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        console.log(username);
        console.log(password);
    }, [username, password]);

    return (

        <ThemeProvider theme={theme}>
            <Box className="bg-[#e8e8e8] h-full w-full bg-cover fixed">
                {/* <Box className="colorBackgroundGold h-full w-full bg-cover fixed" > */}
                <Container component="main" maxWidth="sm">
                    <CssBaseline />

                    <Box className="my-12 shadow-lg top-0 rounded-lg bg-white p-5" data-aos="fade-zoom-in">
                        <Typography variant="h5" color="black" className="font-bold text-center">
                            High U - Administrator
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
                                // type={showPassword ? 'text' : 'password'}
                                type='password'
                                variant="outlined"
                                fullWidth
                            // InputProps={{
                            //     endAdornment: (
                            //         <IconButton
                            //             aria-label="toggle password visibility"
                            //             onClick={handleClickShowPassword}
                            //             onMouseDown={handleMouseDownPassword}
                            //         >
                            //             {showPassword ? <Visibility /> : <VisibilityOff />}
                            //         </IconButton>
                            //     ),
                            // }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="bg-[#F0CA83] hover:bg-[#e3b560] text-white text-lg py-3 mt-3 mb-2 font-bold"
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>

                </Container>
                {/* </Box> */}
            </Box>
        </ThemeProvider>

    );
}
)

export default SignIn;
