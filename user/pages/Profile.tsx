import React, { useEffect, useState } from 'react';
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
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Head from 'next/head';
import { storage } from './api/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image';
import { getSession, GetSessionParams } from 'next-auth/react';
import axios from 'axios';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';


interface User {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

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

const API_URL = "http://localhost:3000";

export default function Profile() {
  const [value, setValue] = useState('1');
  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user_data/getUserData`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const [editFirstname, setEditFirstname] = useState('');
  const [editLastname, setEditLastname] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editImage, setEditImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState<string | null>(null)

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
    e.preventDefault();

    try {
      let imageUrl = url || user?.image || ""; // use existing image URL by default

      if (editImage) {
        // Upload the new image
        const imgName = editImage.name
        const storageRef = ref(storage, `member_images/${imgName}`)
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
            let response = await fetch(`${API_URL}/api/user_data/updateUserProfile?id=` + user?._id, {
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
            console.log(response)
            // setMessage("Member Edited Successfully!");
            window.location.href = './Profile'
            // setOpenAlert(true);
            if (!response.ok) {
              Error('no response')
            }
          }
        )
      } else {
        // Update the member without changing the image URL
        let response = await fetch(`${API_URL}/api/user_data/updateUserProfile?id=` + user?._id, {
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
        console.log(response)
        // setMessage("Member Edited Successfully!");
        window.location.href = './Profile'
        // setOpenAlert(true);
        if (!response.ok) {
          Error('no response')
        }
      }
    } catch (error: any) {
      console.error(error)
      // setError("An error occurred while updating the member. Please try again later.");
      // setOpenAlert(true);
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
      const response = await fetch(`${API_URL}/api/user_data/updateUserPassword?id=` + user?._id, {
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
        // Password updated successfully
        console.log(data);
        // setMessage("Password updated successfully!");
        window.location.href = './Profile';
      } else {
        // Error updating password
        console.log(data);
        // setError(data.error);
      }
    } catch (error) {
      console.error(error);
      // setError("Error updating password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Head><title>Profile | High U</title></Head>
      <Paper className="bg-[#252525] h-screen max-[450px]:h-max">
        <Navbar />
        <Container maxWidth="xl" >
          <UserHeader />
          <Box className="w-full py-6" sx={{ typography: 'body1' }}>
            <TabContext value={value}>
              {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-16 bg-[#f0ca8350] rounded-md" />) : (
                <Box className="border-b border-[#886828]">
                  <TabList onChange={handleMenuChange} aria-label="Favorite Menu">
                    <Tab label="My Profile" className="text-[#F0CA83] font-bold" value="1" />
                    <Tab label="Edit Profile" className="text-[#F0CA83] font-bold" value="2" />
                    <Tab label="Change Password" className="text-[#F0CA83] font-bold" value="3" />
                  </TabList>
                </Box>
              )}
              <TabPanel value="1">
                {loading ? (<Skeleton animation="wave" variant="rectangular" className="w-full h-72 bg-[#f0ca8350] rounded-md" />) : (
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                      <TextField
                        type='text'
                        fullWidth
                        defaultValue={user?.firstname || ''} // Add a check for null values
                        name='firstname'
                        variant='outlined'
                        className="bg-[#F0ca83] font-bold rounded"
                        inputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Lastname</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.lastname || ''}
                        fullWidth
                        name='lastname'
                        variant='outlined'
                        className="bg-[#F0ca83] font-bold rounded"
                        inputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Username</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.username || ''}
                        fullWidth
                        name='username'
                        variant='outlined'
                        className="bg-[#F0ca83] font-bold rounded"
                        inputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Email Address</Typography>
                      <TextField
                        type='email'
                        defaultValue={user?.email || ''}
                        fullWidth
                        name='email'
                        variant='outlined'
                        className="bg-[#F0ca83] font-bold rounded"
                        inputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
              <TabPanel value="2" data-aos="fade-up">
                {/* <EditProfile_Profile /> */}
                <form onSubmit={handleUpdateProfile}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.firstname || ''}
                        // value={editFirstname}
                        fullWidth
                        name='editFirstname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={(e) => setEditFirstname(e.target.value)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Lastname</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.lastname || ''}
                        fullWidth
                        name='editLastname'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={(e) => setEditLastname(e.target.value)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Username</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.username || ''}
                        fullWidth
                        name='editUsername'
                        variant='outlined'
                        className="font-bold rounded"
                        focused
                        onChange={(e) => setEditUsername(e.target.value)}
                        inputProps={{ style: { color: "#F0CA83" } }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Email Address</Typography>
                      <TextField
                        type='email'
                        defaultValue={user?.email || ''}
                        fullWidth
                        name='email'
                        variant='outlined'
                        className="bg-[#F0ca83] font-bold rounded"
                        inputProps={{
                          readOnly: true,
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
                          className="bg-[#F0CA83] font-bold mb-2 hover:bg-[#f3b94d]"
                          component="span"
                          startIcon={<AddAPhotoIcon />}
                        >
                          Edit Image
                        </Button>
                      </label>
                      <Image
                        src={previewUrl || user?.image || ""}
                        width={96}
                        height={96}
                        alt={user?.username || ""}
                        className="w-24 h-24 ml-5 rounded-full object-cover max-sm:mx-auto"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className="flex items-center justify-end">
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        className="bg-[#F0CA83] font-bold mb-2 hover:bg-[#f3b94d] max-sm:w-full"
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
              <TabPanel value="3" data-aos="fade-up">
                {/* <ChangePassword_Profile /> */}
                <form onSubmit={handleUpdatePassword} onReset={handleReset}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Current Password</Typography>
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
                        error={Boolean(passwordError)}
                        helperText={passwordError}
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
                </form>
              </TabPanel>
              <hr data-aos="fade-zoom-in" className="w-full h-[1px] rounded border-0 bg-[#886828] mt-3"></hr>
            </TabContext>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

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
