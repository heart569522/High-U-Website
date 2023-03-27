import React, { useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    CircularProgress,
    TextField,
    IconButton
} from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: "#F0CA83",
        },
        secondary: {
            main: "#F08383",
        },
    },
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },

});


export default function ChangePassword_Profile() {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (setState: (value: string) => void) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setState(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewPassword(value);

        if (value !== confirmPassword) {
            setError("The passwords do not match.");
        } else {
            setError(null);
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setConfirmPassword(value);

        if (value !== newPassword) {
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

    const handleReset = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
    };

    const handleUpdate = () => {
        // setIsUpdating(true);
        alert("currentPass = " + currentPassword);
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography className="text-[#F0CA83] font-bold pb-2">Current Password</Typography>
                    <TextField
                        type='text'
                        // defaultValue='Matther'
                        fullWidth
                        name='current-password'
                        value={currentPassword}
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleChange(setCurrentPassword)}
                        onKeyPress={handleKeyPress}
                        inputProps={{ style: { color: "#F0CA83" } }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography className="text-[#F0CA83] font-bold pb-2">New Password</Typography>
                    <TextField
                        type='text'
                        fullWidth
                        name='new-password'
                        value={newPassword}
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handlePasswordChange}
                        onKeyPress={handleKeyPress}
                        inputProps={{ style: { color: "#F0CA83" } }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography className="text-[#F0CA83] font-bold pb-2">Confirm Password</Typography>
                    <TextField
                        type='password'
                        fullWidth
                        name='confirm-password'
                        value={confirmPassword}
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={handleConfirmPasswordChange}
                        onKeyPress={handleKeyPress}
                        error={Boolean(error)}
                        helperText={error}
                        inputProps={{
                            style: { color: "#F0CA83" }
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center">
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        className="bg-[#F0CA83] font-bold mx-1 mb-2 hover:bg-[#f3b94d] max-sm:w-full"
                        disabled={isUpdating}
                        onClick={handleUpdate}
                    >
                        {isUpdating ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Update"
                        )}
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        type="reset"
                        onClick={handleReset}
                        className="border-[#F0CA83] font-bold mx-1 mb-2 hover:border-[#f3b94d] max-sm:w-full"
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}
