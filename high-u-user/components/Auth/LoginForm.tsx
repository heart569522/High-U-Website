// import React, { useState } from 'react';
// import { Grid, TextField, Button, IconButton, Box } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// export default function FormLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(event.target.value);
//     };

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//     };

//     const handleLogin = () => {
//         // Send username and password to server
//         alert(username)
//         alert(password)
//     };

//     return (
//         <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             maxWidth="600"
//             bgcolor="white"
//             padding="20"
//             marginTop="30"
//         >
//             <Grid container direction="column" alignItems="center" spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Username"
//                         value={username}
//                         onChange={handleUsernameChange}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                         type={showPassword ? 'text' : 'password'}
//                         variant="outlined"
//                         fullWidth
//                         InputProps={{
//                             endAdornment: (
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                 >
//                                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                                 </IconButton>
//                             ),
//                         }}
//                     />
//                 </Grid>
//                 <Grid xs={12}>
//                     <Button variant="contained" color="primary" onClick={handleLogin}>
//                         Login
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }

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

const theme = createTheme();

export default function SignIn() {

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
                    position: 'fixed' 
                }}
            >
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
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
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                            {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
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