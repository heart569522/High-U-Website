import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// IMPORT COMPONENT
import { Box, Toolbar, Grid, Typography, Button, Tab, Container, Backdrop, CircularProgress, Snackbar, Alert, TextField } from '@mui/material';
import Link from 'next/link';
import {
    TabContext,
    TabList,
    TabPanel,
} from '@mui/lab';
import Image from 'next/image';
import { getSession, GetSessionParams } from 'next-auth/react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './api/firebaseConfig';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context)

    // If the user doesn't have an active session, redirect to the login page
    if (!session) {
        return {
            redirect: {
                destination: './',
                permanent: false,
            },
        }
    }

    // If the user has an active session, render the protected page
    return {
        props: { session },
    }
}

interface Admin {
    _id: string;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

const API_URL = "http://localhost:8000";
const drawerWidth = 240;
const theme = createTheme({
    typography: {
        fontFamily: [
            'Prompt, sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#303030",
        },
        secondary: {
            main: "#F0CA83"
        }
    },
});

export default function Profile() {
    const [value, setValue] = React.useState('1');
    const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [adminData, setAdminUser] = useState<Admin | null>(null);
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/admin/getAdminData`);
                setAdminUser(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAdminData();
    }, []);

    const [editFirstname, setEditFirstname] = useState('');
    const [editLastname, setEditLastname] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editImage, setEditImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState<string | null>(null)

    const [uploading, setUploading] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);

    const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertSuccess(false);
    };

    const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertError(false);
    };

    useEffect(() => {
        if (!previewUrl) {
            return;
        }
        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (!image) {
            setEditImage(null);
            setPreviewUrl(null);
            return;
        }
        setEditImage(e.target.files ? e.target.files[0] : null);
        setPreviewUrl(URL.createObjectURL(image));
    }

    const handleUpdateProfile = async (e: any) => {
        setAlertSuccess(false);
        setUploading(true);
        e.preventDefault();

        try {
            let imageUrl = url || adminData?.image || ""; // use existing image URL by default

            if (editImage) {
                // Upload the new image
                const imgName = editImage.name
                const storageRef = ref(storage, `admin_images/${imgName}`)
                const uploadTask = uploadBytesResumable(storageRef, editImage)

                uploadTask.on(
                    'state_changed',
                    (snapshot: any) => {
                        setProgress(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )
                    },
                    (error: any) => {
                        // setError(error)
                        console.log(error);

                    },
                    async () => {
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                        setUrl(imageUrl)

                        // Update the member with the new image URL
                        let response = await fetch(`${API_URL}/api/admin/updateAdminProfile?id=` + adminData?._id, {
                            method: 'POST',
                            headers: {
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                image: imageUrl,
                                firstname: editFirstname,
                                lastname: editLastname,
                                username: editUsername,
                            })
                        })

                        response = await response.json();
                        setAlertSuccess(true);
                        window.location.href = './Profile'
                        if (!response.ok) {
                            Error('no response')
                        }
                    }
                )
            } else {
                // Update the member without changing the image URL
                let response = await fetch(`${API_URL}/api/admin/updateAdminProfile?id=` + adminData?._id, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        image: imageUrl,
                        firstname: editFirstname,
                        lastname: editLastname,
                        username: editUsername,
                    })
                })

                response = await response.json();
                setAlertSuccess(true);
                window.location.href = './Profile'
                if (!response.ok) {
                    Error('no response')
                }
            }
        } catch (error: any) {
            console.error(error)
            setAlertError(true)
        } finally {
            setUploading(false);
        }
    }

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewPassword(value);

        if (value !== confirmPassword) {
            setPasswordError("The Passwords do not atch.");
        } else {
            setPasswordError(null);
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setConfirmPassword(value);

        if (value !== newPassword) {
            setPasswordError("The Passwords do not match.");
        } else {
            setPasswordError(null);
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
        setPasswordError(null);
    };

    const handleUpdatePassword = async (e: any) => {
        e.preventDefault();

        try {
            // Call the API to update the user's password
            const response = await fetch(`${API_URL}/api/admin/updateAdminPassword?id=` + adminData?._id, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                })
            });

            // Check the response from the server
            const data = await response.json();
            if (response.ok) {
                setAlertSuccess(true);
                window.location.href = './Profile';
            } else {
                setAlertError(true);
            }
        } catch (error) {
            console.error(error);
            setAlertError(true);
        } finally {
            setUploading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Head><title>Profile | High U Administrator</title></Head>
            <Container maxWidth="xl">
                <Box
                    component="main"
                    className="h-full p-5 ml-[240px] max-[899px]:ml-0"
                    sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={uploading}
                    >
                        <CircularProgress color="inherit" />
                        <Typography>&nbsp;Updating...</Typography>
                    </Backdrop>
                    <Snackbar open={alertSuccess} autoHideDuration={5000} onClose={handleCloseAlertSuccess}>
                        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
                            Update Profile Successfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError}>
                        <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
                            Update Profile Error!
                        </Alert>
                    </Snackbar>
                    <Box className="bg-white w-full h-full rounded-xl pt-5 px-5 shadow-md max-[899px]:pb-3">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="flex items-center justify-center">
                                <Typography variant='h3' className="text-[#303030] font-bold">
                                    Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} className="flex items-center justify-center">
                                <Box className="bg-slate-100 p-2 rounded-lg">
                                    {adminData?.image && (
                                        <Image
                                            src={adminData.image}
                                            width={176}
                                            height={176}
                                            className="w-44 h-44 object-cover rounded-lg"
                                            alt="profile-image"
                                            priority
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box className="w-full py-6" sx={{ typography: 'body1' }} data-aos="fade-zoom-in">
                                    <TabContext value={value}>
                                        <Box className="border-b border-[#6f6f6f]">
                                            <TabList onChange={handleMenuChange} aria-label="Profile Menu">
                                                <Tab label="My Profile" className="text-[#303030] font-bold" value="1" />
                                                <Tab label="Edit Profile" className="text-[#303030] font-bold" value="2" />
                                                <Tab label="Change Password" className="text-[#303030] font-bold" value="3" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography className="text-[#303030] font-bold pb-2">Firstname</Typography>
                                                    <TextField
                                                        type='text'
                                                        fullWidth
                                                        defaultValue={adminData?.firstname || ''} // Add a check for null values
                                                        name='firstname'
                                                        variant='outlined'
                                                        className="bg-[#303030] font-bold rounded"
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: { color: "#FFF" }
                                                        }}
                                                        focused
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography className="text-[#303030] font-bold pb-2">Lastname</Typography>
                                                    <TextField
                                                        type='text'
                                                        defaultValue={adminData?.lastname || ''}
                                                        fullWidth
                                                        name='lastname'
                                                        variant='outlined'
                                                        className="bg-[#303030] font-bold rounded"
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: { color: "#FFF" }
                                                        }}
                                                        focused
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography className="text-[#303030] font-bold pb-2">Username</Typography>
                                                    <TextField
                                                        type='text'
                                                        defaultValue={adminData?.username || ''}
                                                        fullWidth
                                                        name='username'
                                                        variant='outlined'
                                                        className="bg-[#303030] font-bold rounded"
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: { color: "#FFF" }
                                                        }}
                                                        focused
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography className="text-[#303030] font-bold pb-2">Email Address</Typography>
                                                    <TextField
                                                        type='email'
                                                        defaultValue={adminData?.email || ''}
                                                        fullWidth
                                                        name='email'
                                                        variant='outlined'
                                                        className="bg-[#303030] font-bold rounded"
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: { color: "#FFF" }
                                                        }}
                                                        focused
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <form onSubmit={handleUpdateProfile}>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Firstname</Typography>
                                                        <TextField
                                                            type='text'
                                                            defaultValue={adminData?.firstname || ''}
                                                            // value={editFirstname}
                                                            fullWidth
                                                            name='editFirstname'
                                                            variant='outlined'
                                                            className="font-bold rounded"
                                                            focused
                                                            onChange={(e) => setEditFirstname(e.target.value)}
                                                            inputProps={{ style: { color: "#303030" } }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Lastname</Typography>
                                                        <TextField
                                                            type='text'
                                                            defaultValue={adminData?.lastname || ''}
                                                            fullWidth
                                                            name='editLastname'
                                                            variant='outlined'
                                                            className="font-bold rounded"
                                                            focused
                                                            onChange={(e) => setEditLastname(e.target.value)}
                                                            inputProps={{ style: { color: "#303030" } }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Username</Typography>
                                                        <TextField
                                                            type='text'
                                                            defaultValue={adminData?.username || ''}
                                                            fullWidth
                                                            name='editUsername'
                                                            variant='outlined'
                                                            className="font-bold rounded"
                                                            focused
                                                            onChange={(e) => setEditUsername(e.target.value)}
                                                            inputProps={{ style: { color: "#303030" } }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Email Address</Typography>
                                                        <TextField
                                                            type='email'
                                                            defaultValue={adminData?.email || ''}
                                                            fullWidth
                                                            name='email'
                                                            variant='outlined'
                                                            className="bg-[#303030] font-bold rounded"
                                                            inputProps={{
                                                                readOnly: true,
                                                                style: { color: "#FFF" }
                                                            }}
                                                            focused
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <hr className="w-full h-[1px] rounded border-0 bg-[#886828] mt-1"></hr>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="flex items-center">
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: "none", }}
                                                            id="upload-button"
                                                            type="file"
                                                            onChange={handleImageChange}
                                                        />
                                                        <label htmlFor="upload-button">
                                                            <Button
                                                                variant='contained'
                                                                className="bg-[#4f4f4f] font-bold mb-2 hover:bg-[#303030]"
                                                                component="span"
                                                                startIcon={<AddAPhotoIcon />}
                                                            >
                                                                Edit Image
                                                            </Button>
                                                        </label>
                                                        <Image
                                                            src={previewUrl || adminData?.image || ""}
                                                            width={96}
                                                            height={96}
                                                            alt={adminData?.username || ""}
                                                            className="w-24 h-24 ml-5 rounded-full object-cover max-sm:mx-auto"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="flex items-center justify-end">
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            type="submit"
                                                            className="bg-[#4f4f4f] font-bold mb-2 hover:bg-[#303030] max-sm:w-full"
                                                            disabled={isUploading}
                                                        >
                                                            {isUploading ? (
                                                                <CircularProgress size={24} />
                                                            ) : (
                                                                "Update"
                                                            )}
                                                        </Button>
                                                    </Grid>

                                                </Grid>
                                            </form>
                                        </TabPanel>
                                        <TabPanel value="3">
                                            <form onSubmit={handleUpdatePassword} onReset={handleReset}>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Current Password</Typography>
                                                        <TextField
                                                            type='text'
                                                            fullWidth
                                                            name='current-password'
                                                            value={currentPassword}
                                                            variant='outlined'
                                                            className="font-bold rounded"
                                                            focused
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                            onKeyPress={handleKeyPress}
                                                            inputProps={{ style: { color: "#303030" } }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography className="text-[#303030] font-bold pb-2">New Password</Typography>
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
                                                            inputProps={{ style: { color: "#303030" } }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography className="text-[#303030] font-bold pb-2">Confirm Password</Typography>
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
                                                            error={Boolean(passwordError)}
                                                            helperText={passwordError}
                                                            inputProps={{
                                                                style: { color: "#303030" }
                                                            }}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} className="flex items-center justify-center">
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            type="submit"
                                                            className="bg-[#4f4f4f] font-bold mx-1 mb-2 hover:bg-[#303030] max-sm:w-full"
                                                            disabled={isUpdating}
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
                                                            className="border-[#4f4f4f] font-bold mx-1 mb-2 hover:border-[#303030] max-sm:w-full"
                                                        >
                                                            Reset
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </ThemeProvider>


    )
}
