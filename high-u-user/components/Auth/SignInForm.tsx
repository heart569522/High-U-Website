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

export default function SignInForm() {

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

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " " ) {
            event.preventDefault();
        }
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        alert(username)
        alert(password)
    };

    return (

        <ThemeProvider theme={theme}>
            <Box className="colorBackgroundGold h-full w-full bg-cover fixed" >
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box className="dropShadow mt-8 flex flex-col items-center bg-white p-5 rounded-sm" >
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="bg-amber-400 mt-3 mb-2 font-bold"
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/SignUp" variant="body2" color="secondary">
                                        {"Don't have an account? SignUp"}
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