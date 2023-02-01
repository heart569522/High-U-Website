// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import clientPromise from '../../lib/mongodb';
// import {
//     Box,
//     Typography,
//     Toolbar,
//     Grid,
//     Hidden,
//     ButtonGroup,
//     Button,
//     TextField,
//     Skeleton,
//     Snackbar,
//     Alert,
//     AlertTitle
// } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// import DrawerBar from '../../components/Navigation/DrawerBar';
// import Loading from '../../components/Other/Loading';

// const drawerWidth = 240;
// const theme = createTheme({
//     typography: {
//         fontFamily: [
//             'Prompt, sans-serif'
//         ].join(','),
//     },
//     palette: {
//         primary: {
//             main: "#303030",
//         },
//         secondary: {
//             main: "#F0CA83"
//         }
//     },
// });

// const add = () => {

//     const [openAlert, setOpenAlert] = useState(false);

//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter()

//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [image, setImage] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg';

//     useEffect(() => {
//         if (!previewUrl) {
//             return;
//         }
//         return () => URL.revokeObjectURL(previewUrl);
//     }, [previewUrl]);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const image = e.target.files?.[0];
//         if (!image) {
//             setImage(null);
//             setPreviewUrl(null);
//             return;
//         }
//         setImage(e.target.files ? e.target.files[0] : null);
//         setPreviewUrl(URL.createObjectURL(image));
//     }

//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === " ") {
//             e.preventDefault();
//         }
//     };

//     const handleReset = () => {
//         setFirstname("");
//         setLastname("");
//         setEmail("");
//         setUsername("");
//         setPassword("");
//         setImage(null);
//         setPreviewUrl(null);
//         setError("");
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault()
//         if (firstname && lastname && email && username && password) {
//             try {
//                 let response = await fetch("http://localhost:3000/api/member/addMember", {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         image,
//                         firstname,
//                         lastname,
//                         email,
//                         username,
//                         password
//                     }),
//                     headers: {
//                         Accept: "application/json, text/plain, */*",
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 response = await response.json();
//                 handleReset();
//                 setMessage("Member Added Successfully!");
//                 setOpenAlert(true);
//             } catch (errorMessage: any) {
//                 setError(errorMessage);
//                 setOpenAlert(true);
//             }
//         } else {
//             return setError("All fields are required!");
//             setOpenAlert(true);
//         }
//     }

//     const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }

//         setOpenAlert(false);
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <DrawerBar />
//             <Box
//                 component="main"
//                 className="p-5 ml-[240px] max-[899px]:ml-0"
//                 sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
//             >
//                 <Toolbar />
//                 {message ?
//                     <Snackbar open={openAlert} autoHideDuration={3000}>
//                         <Alert icon={false} onClose={handleCloseAlert} className="bg-green-700 text-white text-lg">
//                             {message}
//                         </Alert>
//                     </Snackbar>
//                     : null}
//                 {error ?
//                     <Snackbar open={openAlert} autoHideDuration={3000}>
//                         <Alert icon={false} onClose={handleCloseAlert} className="bg-red-700 text-white text-lg">
//                             {error}
//                         </Alert>
//                     </Snackbar>
//                     : null}

//                 <Box className="bg-white w-full h-full rounded-xl pt-5 pb-5 px-5 shadow-md max-[899px]:pb-3">
//                     <Grid container>
//                         <Grid item xs={12}>

//                             <Box className='flex gap-3 items-center justify-between'>
//                                 <Typography className="text-[#303030] font-bold text-xl">
//                                     Add Member
//                                 </Typography>

//                             </Box>


//                         </Grid>
//                     </Grid>
//                     <form onSubmit={handleSubmit} onReset={handleReset} className="pt-3">
//                         <Grid container className="pt-3" spacing={3}>
//                             <Grid item xs={12} md={4}>

//                                 <center>
//                                     <input
//                                         accept="image/*"
//                                         style={{ display: "none", }}
//                                         id="upload-button"
//                                         type="file"
//                                         onChange={handleImageChange}
//                                     />
//                                     <img
//                                         src={previewUrl || defaultImageUrl}
//                                         className="rounded-lg object-top object-cover h-auto w-96"
//                                     />
//                                     <label htmlFor="upload-button">
//                                         <Button
//                                             variant='contained'
//                                             className="bg-[#F0CA83] text-[#303030] font-bold mb-2 hover:bg-[#f3b94d] mt-3"
//                                             component="span"
//                                             startIcon={<AddAPhotoIcon />}
//                                         >
//                                             Add Image
//                                         </Button>
//                                     </label>
//                                 </center>

//                             </Grid>
//                             <Grid item xs={12} md={8}>
//                                 <Grid item xs={12}>
//                                     <Typography className="text-[#303030] font-bold pb-2 text-lg">Firstname</Typography>
//                                     <TextField
//                                         type='text'
//                                         value={firstname}
//                                         fullWidth
//                                         name='firstname'
//                                         variant='outlined'
//                                         className="font-bold rounded pb-3"
//                                         onChange={(e) => setFirstname(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         inputProps={{ style: { color: "#303030" } }}
//                                         sx={{ color: '#303030' }}
//                                         required
//                                         focused
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography className="text-[#303030] font-bold pb-2 text-lg">Lastname</Typography>
//                                     <TextField
//                                         type='text'
//                                         value={lastname}
//                                         fullWidth
//                                         name='lastname'
//                                         variant='outlined'
//                                         className="font-bold rounded pb-3"
//                                         onChange={(e) => setLastname(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         inputProps={{ style: { color: "#303030" } }}
//                                         sx={{ color: '#303030' }}
//                                         required
//                                         focused
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography className="text-[#303030] font-bold pb-2 text-lg">Email</Typography>
//                                     <TextField
//                                         type="email"
//                                         value={email}
//                                         fullWidth
//                                         name='email'
//                                         variant='outlined'
//                                         className="font-bold rounded pb-3"
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         inputProps={{ style: { color: "#303030" } }}
//                                         sx={{ color: '#303030' }}
//                                         required
//                                         focused
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography className="text-[#303030] font-bold pb-2 text-lg">Username</Typography>
//                                     <TextField
//                                         type='text'
//                                         value={username}
//                                         fullWidth
//                                         name='username'
//                                         variant='outlined'
//                                         className="font-bold rounded pb-3"
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         inputProps={{ style: { color: "#303030" } }}
//                                         sx={{ color: '#303030' }}
//                                         required
//                                         focused
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography className="text-[#303030] font-bold pb-2 text-lg">Password</Typography>
//                                     <TextField
//                                         type='text'
//                                         value={password}
//                                         fullWidth
//                                         name='password'
//                                         variant='outlined'
//                                         className="font-bold rounded pb-3"
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         onKeyDown={handleKeyPress}
//                                         inputProps={{ style: { color: "#303030" } }}
//                                         sx={{ color: '#303030' }}
//                                         multiline
//                                         maxRows={5}
//                                         required
//                                         focused
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Hidden mdDown>
//                                         <ButtonGroup variant="contained" className="gap-1" sx={{ float: 'right' }} aria-label="contained button group">
//                                             <Button type='submit' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">OK</Button>
//                                             <Button type='reset' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">Reset</Button>
//                                         </ButtonGroup>
//                                     </Hidden>
//                                     <Hidden mdUp>
//                                         <ButtonGroup variant="contained" className="gap-1 my-2" fullWidth aria-label="contained button group">
//                                             <Button type='submit' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">OK</Button>
//                                             <Button type='reset' className="bg-[#303030] text-white hover:bg-[#5b5b5b]">Reset</Button>
//                                         </ButtonGroup>
//                                     </Hidden>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     )
// }

// export default add

import React, { useState } from 'react';
import axios from 'axios';

const AddMemberForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) {
            return setMessage('Image is required.');
        }

        const formData = new FormData();
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', image, image.name);

        try {
            await axios.post('http://localhost:3000/api/member/addMember', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Member added successfully.');
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(event) => setImage(event.target.files![0])}
                />
            </div>
            <button type="submit">Add Member</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default AddMemberForm;
