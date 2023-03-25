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

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';
import ChangePassword_Profile from '../components/Other/ChangePassword_Profile';


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

export default function Profile() {
  const [value, setValue] = useState('1');
  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('http://localhost:3000/api/user_data/getUserData');
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    }

    fetchUser();
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

  const handleChange = (setState: (value: string) => void) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let imageUrl = editImage || ""; // use existing image URL by default

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
            let response = await fetch("http://localhost:3000/api/user_data/updateUserProfile?id=" + user?._id, {
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
        let response = await fetch("http://localhost:3000/api/user_data/updateUserProfile?id=" + user?._id, {
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
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="text-[#F0CA83] font-bold pb-2">Firstname</Typography>
                      <TextField
                        type='text'
                        defaultValue={user?.firstname || ''}
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
                      <Avatar
                        src={previewUrl || user?.image}
                        className="w-24 h-24 ml-5 rounded-full max-sm:mx-auto"
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
                <ChangePassword_Profile />
              </TabPanel>
              <hr data-aos="fade-zoom-in" className="w-full h-[1px] rounded border-0 bg-[#886828] mt-3"></hr>
            </TabContext>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
